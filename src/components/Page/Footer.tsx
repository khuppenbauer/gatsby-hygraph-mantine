import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { createStyles, Container, Group, Image, Text, ActionIcon } from '@mantine/core';
import SVG from 'react-inlinesvg';
import Link from '../Link/Link';

const assetBaseUrl = process.env.GATSBY_ASSET_BASE_URL;
const svgBaseUrl = 'https://raw.githubusercontent.com/tabler/tabler-icons/master/icons/';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

const PageFooter = () => {
  const {
    settings: { nodes },
  } = useStaticQuery(
    graphql`
      query {
        settings: allGraphCmsSetting {
          nodes {
            author
            footer {
              logo {
                handle
              }
              text
              socialMedia {
                id
                socialMediaIcon
                socialMediaLink
              }
              links {
                id
                title
                links {
                  ... on GraphCMS_ExternalLink {
                    id
                    label
                    url
                  }
                  ... on GraphCMS_InternalLink {
                    id
                    label
                    page {
                      slug
                    }
                  }
                }
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
  const { author, footer } = nodes[0];
  if (!footer) {
    return null;
  }
  const { logo, text, links, socialMedia } = footer;
  const { classes, cx } = useStyles();

  const socialMediaIcons = socialMedia.map((socialMediaItem) => {
    const { id: socialMediaId, socialMediaLink, socialMediaIcon } = socialMediaItem;
    const svg = `${svgBaseUrl}brand-${socialMediaIcon.toLowerCase()}.svg`;
    return (
      <a href={socialMediaLink} key={socialMediaId} target="_blank" rel="noreferrer">
        <ActionIcon size="lg">
          <SVG src={svg} width={18} strokeWidth={1.5} title={socialMediaIcon} />
        </ActionIcon>
      </a>
    );
  });

  let footerLinks;
  if (links && links.length === 1) {
    const linkItems = links[0].links.map((link) => {
      const { id, label, url, page } = link;
      const to = url || `/${page.slug}`;
      return (
        <Link to={to} key={id} className={cx(classes.link)}>
          {label}
        </Link>
      );
    });
    footerLinks = <Group className={classes.links}>{linkItems}</Group>;
  }
  if (links && links.length > 1) {
    const linkItems = links.map((linkGroup) => {
      const linkGroupItems = linkGroup.links.map((link) => {
        const { id, label, url, page } = link;
        const to = url || `/${page.slug}`;
        return (
          <Link to={to} key={id} className={cx(classes.link)}>
            {label}
          </Link>
        );
      });
      return (
        <div className={classes.wrapper} key={linkGroup.id}>
          <Text className={classes.title}>{linkGroup.title}</Text>
          {linkGroupItems}
        </div>
      );
    });
    footerLinks = <div className={classes.groups}>{linkItems}</div>;
  }

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          {logo && (
            <Image width={200} height={40} src={`${assetBaseUrl}/${logo.handle}`} fit="contain" />
          )}
          {text && (
            <Text size="xs" color="dimmed" className={classes.description}>
              {text}
            </Text>
          )}
        </div>
        {links && links.length > 0 && footerLinks}
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © {new Date().getFullYear()} {author}
        </Text>
        {socialMedia && socialMedia.length > 0 && (
          <Group spacing={0} className={classes.social} position="right" noWrap>
            {socialMediaIcons}
          </Group>
        )}
      </Container>
    </footer>
  );
};

export default PageFooter;
