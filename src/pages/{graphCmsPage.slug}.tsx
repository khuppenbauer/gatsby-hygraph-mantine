import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Seo from '../components/Seo/Seo';
import Container from '../components/Container/Container';
import Header from '../components/Content/Header/Header';

function GraphCmsPage({ data: { page } }) {
  const { title, headline, description, seo } = page;
  return (
    <Layout>
      <Seo title={title} seo={seo} />
      <main>
        <Container>
          <Header headline={headline} description={description} />
        </Container>
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query PagePageQuery($slug: String!) {
    page: graphCmsPage(slug: { eq: $slug }) {
      title
      headline
      description {
        html
      }
      seo {
        title
        description
        keywords
        image {
          handle
        }
        noIndex
      }
    }
  }
`;

export default GraphCmsPage;
