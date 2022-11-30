import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Group, Box } from '@mantine/core';
import { useForm } from 'react-hook-form';
import TextInputComponent from './TextInput';
import TextareaComponent from './Textarea';
import ButtonComponent from './Button';
import CheckboxComponent from './Checkbox';
import SelectComponent from './Select';

function FormComponent({ block, slug }) {
  const { formName, formFields, formSubmit, formSuccess } = block;
  const [data, setData] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  function onSubmit(values: any) {
    const url = '/api/submit';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formName, slug, ...values }),
    })
    .then(() => {
      setData(values);
      reset();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      {data ? (
        <ReactMarkdown>{formSuccess.markdown}</ReactMarkdown>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {formFields.map((field) => {
            const {
              id: fieldId,
              formFieldName,
              formFieldLabel,
              formFieldPlaceholder,
              formFieldMandatory,
              formFieldType,
              formFieldSelect,
            } = field;
            switch (formFieldType) {
              case 'Text':
              case 'Phone':
              case 'Email':
                return (
                  <TextInputComponent
                    key={fieldId}
                    name={formFieldName}
                    label={formFieldLabel}
                    placeholder={formFieldPlaceholder}
                    type={formFieldType}
                    withAsterisk={formFieldMandatory}
                    error={errors[formFieldName]}
                    register={register}
                  />
                );
              case 'Checkbox':
                return (
                  <CheckboxComponent
                    key={fieldId}
                    name={formFieldName}
                    label={formFieldLabel}
                    withAsterisk={formFieldMandatory}
                    error={errors[formFieldName]}
                    register={register}
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
                    error={errors[formFieldName]}
                    register={register}
                  />
                );
              case 'Select':
                return (
                  <SelectComponent
                    key={fieldId}
                    name={formFieldName}
                    label={formFieldLabel}
                    placeholder={formFieldPlaceholder}
                    withAsterisk={formFieldMandatory}
                    data={JSON.parse(formFieldSelect)}
                    error={errors[formFieldName]}
                    register={register}
                    setValue={setValue}
                  />
                );
              default:
                return null;
            }
          })}
          <Group position="right" mt="md">
            <ButtonComponent>{formSubmit}</ButtonComponent>
          </Group>
        </form>
      )}

    </Box>
  );
}

export default FormComponent;
