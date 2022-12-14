import React from 'react';
import { Checkbox } from '@mantine/core';

interface CheckboxProps {
  name: string,
  label: React.ReactNode,
  withAsterisk: boolean,
  register: any,
  error?: {
    type: string,
    message: string,
  },
}

function CheckboxComponent({
  name,
  label,
  withAsterisk,
  register,
  error,
}: CheckboxProps) {
  const errorMessage = error ? ' ' : '';
  const options = { required: false };
  let text = label;
  if (withAsterisk) {
    options.required = true;
    text = (
      <>
        {label}
        {' '}
        <span style={{ color: 'red' }}>*</span>
      </>
    );
  }
  return (
    <Checkbox
      label={text}
      error={errorMessage}
      {...register(name, options)}
      pb="xs"
    />
  );
}

export default CheckboxComponent;
