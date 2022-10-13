const { GraphQLClient } = require('graphql-request');
const crypto = require('crypto');

const { connectFormSubmission } = require('../libs/hygraph/mutation');

const url = process.env.HYGRAPH_API_URL;
const token = process.env.HYGRAPH_API_TOKEN;
const hygraph = new GraphQLClient(url, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

interface Request {
  body: {
    data: DataProps;
  };
}

interface DataProps {
  formName: string;
}

const createSubmission = async (data: any) => {
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
  return hygraph.request(mutation, mutationVariables);
};

export default async function handler(req: Request, res: any) {
  const { body } = req;
  await createSubmission(body);
  res.status(200).json({
    message: 'Ok',
  });
}
