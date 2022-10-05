import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from '../Link/Link';

const assetBaseUrl = process.env.GATSBY_ASSET_BASE_URL;
const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

const PageHeader = () => {
  const {
    settings: { nodes },
  } = useStaticQuery(
    graphql`
      query {
        settings: allGraphCmsSetting {
          nodes {
            header {
              links {
                id
                label
                url
              }
              logo {
                handle
              }
            }
          }
        }
      }
    `
  );
  if (!nodes || nodes.length === 0) {
    return null;
  }
  const { header } = nodes[0];
  if (!header) {
    return null;
  }
  const { links, logo } = header;
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const items = links.map((link) => (
    <Link
      to={link.url}
      key={link.id}
      className={cx(classes.link)}
      activeClassName={cx(classes.linkActive)}
      partiallyActive
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        {logo && (
          <Image width={200} height={40} src={`${assetBaseUrl}/${logo.handle}`} fit="contain" />
        )}
        {items && (
          <>
            <Group spacing={5} className={classes.links}>
              {items}
            </Group>
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

            <Transition transition="pop-top-right" duration={200} mounted={opened}>
              {(styles) => (
                <Paper className={classes.dropdown} withBorder style={styles}>
                  {items}
                </Paper>
              )}
            </Transition>
          </>
        )}
      </Container>
    </Header>
  );
};

export default PageHeader;
