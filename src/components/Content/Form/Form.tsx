import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Group, Box } from '@mantine/core';
import { Formik, Form } from 'formik';
import TextInputComponent from './TextInput';
import TextareaComponent from './Textarea';
import ButtonComponent from './Button';
import CheckboxComponent from './Checkbox';

function FormComponent({ block, slug }) {
  const { id, formName, formFields, formSubmit, formSuccess } = block;
  const initialValues = formFields.reduce((acc, field) => {
    const { formFieldType, formFieldName } = field;
    if (formFieldType === 'Checkbox') {
      acc[formFieldName] = false;
    } else {
      acc[formFieldName] = '';
    }
    return acc;
  }, {});

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Formik
        key={`formik-${id}`}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const url = '/api/submit';
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formName, slug, ...values }),
          })
            .then(() => {
              actions.resetForm();
              actions.setStatus({
                sent: true,
                values,
              });
            })
            .catch((error) => {
              actions.setStatus({
                sent: false,
                error,
              });
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
        validate={(values) => {
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          const errors = {};
          formFields.map((field) => {
            const { formFieldName, formFieldType, formFieldMandatory } = field;
            if (formFieldMandatory && !values[formFieldName]) {
              errors[formFieldName] = 'ist ein Pflichtfeld';
            }
            if (formFieldType === 'Email' && values.email && !emailRegex.test(values.email)) {
              errors.email = 'ist keine gültige E-Mail Adresse';
            }
            return null;
          });
          return errors;
        }}
      >
        {({ status }) => {
          if (status && status.sent === true) {
            return (
              <>
                <ReactMarkdown>{formSuccess.markdown}</ReactMarkdown>
                <div>
                  <table>
                    <tbody>
                      {formFields.map((field) => {
                        const { id: fieldId, formFieldName, formFieldLabel } = field;
                        const value = status.values[formFieldName];
                        if (value) {
                          return (
                            <tr key={fieldId}>
                              <td>{formFieldLabel}</td>
                              <td>{value}</td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            );
          }
          return (
            <Form name={formName} key={`form-${id}`}>
              {formFields.map((field) => {
                const {
                  id: fieldId,
                  formFieldName,
                  formFieldLabel,
                  formFieldPlaceholder,
                  formFieldMandatory,
                  formFieldType,
                } = field;
                switch (formFieldType) {
                  case 'Text':
                  case 'Email':
                    return (
                      <TextInputComponent
                        key={fieldId}
                        name={formFieldName}
                        label={formFieldLabel}
                        placeholder={formFieldPlaceholder}
                        withAsterisk={formFieldMandatory}
                      />
                    );
                  case 'Checkbox':
                    return (
                      <CheckboxComponent
                        key={fieldId}
                        name={formFieldName}
                        label={formFieldLabel}
                        mandatory={formFieldMandatory}
                      />
                    );
                  case 'Textarea':
                    return (
                      <TextareaComponent
                        key={fieldId}
                        name={formFieldName}
                        label={formFieldLabel}
                        placeholder={formFieldPlaceholder}
                        withAsterisk={formFieldMandatory}
                      />
                    );
                  default:
                    return null;
                }
              })}
              <Group position="right" mt="md">
                <ButtonComponent>{formSubmit}</ButtonComponent>
              </Group>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}

export default FormComponent;
