import React from 'react';
import { Textarea, TextareaProps } from '@mantine/core';
import { useField } from 'formik';

function TextareaComponent({
  name,
  onChange,
  ...rest
}: { name: string } & Omit<TextareaProps, 'value' | 'error'>) {
  const [{ value }, { error, touched }, { setValue }] = useField(name);
  const errorMessage = touched && error ? error : '';
  return (
    <Textarea
      {...rest}
      value={value}
      error={errorMessage}
      onChange={(v) => {
        setValue(v.target.value);
      }}
    />
  );
}

export default TextareaComponent;
