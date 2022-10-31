import React from 'react';
import { Textarea } from '@mantine/core';

interface TextareaProps {
  name: string,
  label: React.ReactNode,
  placeholder: string,
  withAsterisk: boolean,
  register: any,
  error?: {
    type: string,
    message: string,
  },
}

function TextareaComponent({
  name,
  label,
  placeholder,
  withAsterisk,
  register,
  error,
}: TextareaProps) {
  const errorMessage = error ? ' ' : '';
  const options = { required: false };
  if (withAsterisk) {
    options.required = true;
  }
  return (
    <Textarea
      label={label}
      placeholder={placeholder}
      withAsterisk={withAsterisk}
      error={errorMessage}
      {...register(name, options)}
      pb="xs"
    />
  );
}

export default TextareaComponent;
