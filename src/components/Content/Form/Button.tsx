import React from 'react';
import { Button, ButtonProps } from '@mantine/core';

function ButtonComponent({ ...props }: ButtonProps) {
  return <Button type="submit" {...props} />;
}

export default ButtonComponent;
