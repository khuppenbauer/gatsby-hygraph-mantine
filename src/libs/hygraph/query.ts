const { gql } = require('graphql-request');

export const getForm = async () =>
  gql`
    query getForm($id: ID!) {
      form(where: { id: $id }) {
        formIntegrationWebhook
        formIntegrationEmail
        formConfirmationEmail
      }
    }
  `;
