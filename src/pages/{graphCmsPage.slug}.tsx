import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Seo from '../components/Seo/Seo';
import PageFooter from '../components/Page/Footer';
import PageHeader from '../components/Page/Header';
import Container from '../components/Container/Container';
import Header from '../components/Content/Header/Header';
import Form from '../components/Content/Form/Form';

const components = {
  Form,
};
function GraphCmsPage({ data: { page } }) {
  const { title, headline, slug, description, seo, blocks } = page;
  return (
    <Layout>
      <Seo title={title} seo={seo} />
      <PageHeader />
      <main>
        <Container>
          <Header headline={headline} description={description} />
          {blocks.map((block) => {
            const { id, remoteTypeName } = block;
            if (!components[remoteTypeName]) {
              return null;
            }
            const BlockComponent = components[remoteTypeName];
            return <BlockComponent key={id} block={block} title={title} slug={slug} />;
          })}
        </Container>
      </main>
      <PageFooter />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PagePageQuery($slug: String!) {
    page: graphCmsPage(slug: { eq: $slug }) {
      title
      headline
      slug
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
      blocks {
        ... on GraphCMS_Form {
          id
          remoteTypeName
          formFields {
            ... on GraphCMS_FormField {
              id
              formFieldLabel
              formFieldMandatory
              formFieldName
              formFieldPlaceholder
              formFieldType
              formFieldSelect
            }
          }
          formName
          formSubmit
          formSuccess {
            markdown
          }
        }
      }
    }
  }
`;

export default GraphCmsPage;
