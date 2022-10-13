import React from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { useField } from 'formik';

function TextInputComponent({
  name,
  onChange,
  ...rest
}: { name: string } & Omit<TextInputProps, 'value' | 'error'>) {
  const [{ value }, { touched, error }, { setValue }] = useField(name);
  const errorMessage = touched && error ? error : '';
  return (
    <TextInput
      {...rest}
      error={errorMessage}
      value={value}
      onChange={(v) => {
        setValue(v.target.value);
      }}
    />
  );
}

export default TextInputComponent;
