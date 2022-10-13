import React from 'react';
import { Checkbox, CheckboxProps } from '@mantine/core';
import { useField } from 'formik';

function CheckboxComponent({
  name,
  label,
  mandatory,
  ...rest
}: { name: string; mandatory: boolean } & Omit<CheckboxProps, 'value' | 'checked'>) {
  const [{ value, checked }, , { setValue }] = useField(name);
  return (
    <Checkbox
      {...rest}
      checked={checked || value}
      onChange={(v) => setValue(v.target.checked)}
      label={label}
    />
  );
}

export default CheckboxComponent;
