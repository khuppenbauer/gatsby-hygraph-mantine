import React from 'react';
import { TypographyStylesProvider, Title, Text } from '@mantine/core';

interface HeaderProps {
  headline?: string;
  description?: {
    html: string;
  };
}

const HeaderComponent = ({ headline, description: { html } }: HeaderProps) => (
  <>
    {headline && <Title sx={(theme) => ({ color: theme.fn.primaryColor() })}>{headline}</Title>}
    {html && (
      <TypographyStylesProvider>
        <Text dangerouslySetInnerHTML={{ __html: html }} />
      </TypographyStylesProvider>
    )}
  </>
);

export default HeaderComponent;
