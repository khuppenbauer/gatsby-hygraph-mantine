const { GraphQLClient } = require('graphql-request');
const axios = require('axios');
const crypto = require('crypto');
const nodemailer = require("nodemailer");

const { connectFormSubmission } = require('../libs/hygraph/mutation');
const { getForm } = require('../libs/hygraph/query');

const hygraphUrl = process.env.HYGRAPH_API_URL;
const hygraphToken = process.env.HYGRAPH_API_TOKEN;
const mailTransport = process.env.MAIL_TRANSPORT;
const mailjetPublic = process.env.MAILJET_PUBLIC;
const mailjetPrivate = process.env.MAILJET_PRIVATE;
const mailjetUrl = process.env.MAILJET_URL;
const mailjetEmailFrom = process.env.MAILJET_EMAIL_FROM;
const smtpHost = process.env.MAIL_SMTP_HOST;
const smtpPort = process.env.MAIL_SMTP_PORT;
const smtpSecure = process.env.MAIL_SMTP_SECURE;
const smtpUser = process.env.MAIL_SMTP_USER;
const smtpPass = process.env.MAIL_SMTP_PASS;


const hygraph = new GraphQLClient(hygraphUrl, {
  headers: {
    authorization: `Bearer ${hygraphToken}`,
  },
});

interface Request {
  body: {
    data: DataProps;
  };
  method: string;
}

interface DataProps {
  formName: string;
}

const sendMailjetMail = async (to: string, data: any, content: any) => {
  const message = {
    From: {
      Email: mailjetEmailFrom,
    },
    To: [{ Email: to }],
    Subject: data.formName,
    TextPart: content.join('\n'),
    HtmlPart: content.join('<br />'),
  };
  const encodedBase64Token = Buffer.from(`${mailjetPublic}:${mailjetPrivate}`).toString('base64');
  const authorization = `Basic ${encodedBase64Token}`;
  await axios({
    method: 'post',
    url: mailjetUrl,
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ Messages: [message] }),
  });
}

const sendSmtpMail = async (to: string, data: any, content: any) => {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
  await transporter.sendMail({
    from: smtpUser,
    to,
    subject: data.formName,
    text: content.join('\n'),
    html: content.join('<br />'),
  });
}

const sendMail = async (to: string, data: any) => {
  const content = [];
  Object.entries(data).forEach(([key, value]) => {
    content.push(`${key}: ${value}`);
  });
  if (mailTransport === 'smtp') {
    await sendSmtpMail(to, data, content);
  } else {
    await sendMailjetMail(to, data, content);
  }
}

const sendWebhook = async (formIntegrationWebhook: string, data: any) => {
  await axios({
    method: 'post',
    url: formIntegrationWebhook,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  });
}

const saveSubmission = async (data: any) => {
  const { formName, name, email, slug } = data;  
  const sha1 = crypto.createHash('sha1').update(JSON.stringify({ slug, email })).digest('hex');
  const mutation = await connectFormSubmission();
  const mutationVariables = {
    formName,
    formData: data,
    formSubmissionDate: new Date(),
    name,
    email,
    slug,
    sha1,
  };
  await hygraph.request(mutation, mutationVariables);
}

const getHygraphForm = async (id: string) => {
  const query = await getForm();
  const queryVariables = {
    id,
  };
  const { form } = await hygraph.request(query, queryVariables);
  return form;
};

const createSubmission = async (data: any) => {
  const { formId } = data;  
  const { formIntegrationWebhook, formIntegrationEmail, formConfirmationEmail } = await getHygraphForm(formId);
  await saveSubmission(data);
  if (formIntegrationWebhook) {
    await sendWebhook(formIntegrationWebhook, data);
  }
  if (formIntegrationEmail) {
    await sendMail(formIntegrationEmail, data);
  }
  if (formConfirmationEmail) {
    await sendMail(data.email, data);
  }
};

export default async function handler(req: Request, res: any) {
  const { method, body } = req;
  if (method === 'POST') {
    await createSubmission(body);
  }
  res.setHeader("Access-Control-Allow-Origin", ["*"]);
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).json({
    message: 'Ok',
  });
}
