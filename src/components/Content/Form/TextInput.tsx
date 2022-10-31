import React from 'react';
import { TextInput } from '@mantine/core';

interface TextInputProps {
  name: string,
  label: React.ReactNode,
  type: string,
  placeholder: string,
  withAsterisk: boolean,
  register: any,
  error?: {
    type: string,
    message: string,
  },
}

function TextInputComponent({
  name,
  label,
  type,
  placeholder,
  withAsterisk,
  register,
  error,
}: TextInputProps) {
  const errorMessage = error ? ' ' : '';
  const options = { required: false, pattern: { value: null } };
  if (withAsterisk) {
    options.required = true;
  }
  if (type === 'Email') {
    options.pattern = {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    };
  }
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      withAsterisk={withAsterisk}
      error={errorMessage}
      {...register(name, options)}
      pb="xs"
    />
  );
}

export default TextInputComponent;
