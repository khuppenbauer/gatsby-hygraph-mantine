import React from 'react';
import { Select } from '@mantine/core';

interface SelectProps {
  name: string,
  label: React.ReactNode,
  placeholder: string,
  withAsterisk: boolean,
  data: string[],
  register: any,
  error?: {
    type: string,
    message: string,
  },
  setValue: any,
}

function SelectComponent({
  name,
  label,
  placeholder,
  withAsterisk,
  data,
  error,
  register,
  setValue,
}: SelectProps) {
  const errorMessage = error ? ' ' : '';
  const options = { required: false };
  if (withAsterisk) {
    options.required = true;
  }
  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      withAsterisk={withAsterisk}
      error={errorMessage}
      {...register(name, options)}
      onChange={(event) => {
        setValue(name, event);
      }}
      pb="xs"
    />
  );
}

export default SelectComponent;
