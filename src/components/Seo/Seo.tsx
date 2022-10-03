import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SeoProps {
  title: string;
  seo?: {
    title?: string;
    description?: string;
    author?: string;
    keywords?: [string];
    image?: {
      handle: string;
    };
    noIndex?: boolean;
  };
}

const assetBaseUrl = process.env.GATSBY_ASSET_BASE_URL;

function Seo({ title, seo }: SeoProps) {
  const { settings } = useStaticQuery(
    graphql`
      query {
        settings: allGraphCmsSetting {
          nodes {
            author
            title
            description
          }
        }
      }
    `
  );
  const { title: seoTitle, description, keywords, image, noIndex } = seo || {};
  let pageTitle = seoTitle || title;
  let metaDescription = description;
  let metaAuthor: string = null;
  const { nodes } = settings;
  if (nodes && nodes.length > 0) {
    const { title: settingsTitle, description: settingsDescription, author } = nodes[0];
    if (settingsTitle) {
      pageTitle = `${settingsTitle} - ${pageTitle}`;
    }
    metaDescription = description || settingsDescription;
    metaAuthor = author;
  }
  const imageHandle = image ? image.handle : null;
  return (
    <Helmet>
      <title>{pageTitle}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(',')} />}
      {imageHandle && <meta property="image" content={`${assetBaseUrl}/${imageHandle}`} />}
      {metaAuthor && <meta name="author" content={metaAuthor} />}
      {noIndex && (
        <meta name="robots" content="noindex, nofollow, noimageindex" data-no-index="true" />
      )}

      <meta name="og:type" content="website" />
      <meta name="og:title" content={pageTitle} />
      {metaDescription && <meta name="og:description" content={metaDescription} />}
      {imageHandle && <meta property="og:image" content={`${assetBaseUrl}/${imageHandle}`} />}
      {metaAuthor && <meta name="og:author" content={metaAuthor} />}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      {metaDescription && <meta name="twitter:description" content={metaDescription} />}
      {imageHandle && <meta property="twitter:image" content={`${assetBaseUrl}/${imageHandle}`} />}
      {metaAuthor && <meta name="twitter:author" content={metaAuthor} />}
    </Helmet>
  );
}

export default Seo;
