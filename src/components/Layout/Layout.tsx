import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MantineProvider } from '@mantine/core';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const data = useStaticQuery(graphql`
    query SettingsQuery {
      allGraphCmsSetting {
        nodes {
          theme {
            colorScheme
            colors {
              color {
                hex
              }
              name
            }
            primaryColor
          }
        }
      }
    }
  `);

  const { nodes } = data.allGraphCmsSetting;
  let theme = null;
  if (nodes && nodes.length > 0) {
    const themeColors = {};
    const {
      theme: { colors, colorScheme, primaryColor },
    } = nodes[0];
    colors.forEach((colorItems) => {
      const { name, color } = colorItems;
      themeColors[name] = color.map((colorItem) => colorItem.hex);
    });
    theme = {
      colorScheme,
      primaryColor,
      colors: themeColors,
    };
  }
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme || {}}>
      {children}
    </MantineProvider>
  );
}

export default Layout;
