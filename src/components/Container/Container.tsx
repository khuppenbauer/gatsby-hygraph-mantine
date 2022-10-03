import React from 'react';
import { Container } from '@mantine/core';

interface ContainerProps {
  children: React.ReactNode;
}

const ContainerComponent = ({ children }: ContainerProps) => <Container>{children}</Container>;

export default ContainerComponent;
