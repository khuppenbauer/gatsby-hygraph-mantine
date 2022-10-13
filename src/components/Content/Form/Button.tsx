import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { useFormikContext } from 'formik';

function ButtonComponent({ ...props }: ButtonProps) {
  const ctx = useFormikContext();
  return <Button type="button" {...props} onClick={() => ctx.submitForm()} />;
}

export default ButtonComponent;
