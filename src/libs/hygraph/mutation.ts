const { gql } = require('graphql-request');

export const connectFormSubmission = async () =>
  gql`
    mutation ConnectFormSubmission(
      $name: String
      $email: String
      $formName: String
      $formData: Json
      $formSubmissionDate: DateTime
      $slug: String
      $sha1: String
    ) {
      upsertAttendee(
        where: { email: $email }
        upsert: {
          create: {
            formSubmissions: {
              create: {
                formData: $formData
                formName: $formName
                formSubmissionDate: $formSubmissionDate
                sha1: $sha1
                pages: { connect: { slug: $slug } }
              }
            }
            email: $email
            name: $name
          }
          update: {
            email: $email
            name: $name
            formSubmissions: {
              upsert: {
                where: { sha1: $sha1 }
                data: {
                  create: {
                    formData: $formData
                    formName: $formName
                    formSubmissionDate: $formSubmissionDate
                    sha1: $sha1
                    pages: { connect: { slug: $slug } }
                  }
                  update: {
                    formData: $formData
                    formName: $formName
                    formSubmissionDate: $formSubmissionDate
                    sha1: $sha1
                  }
                }
              }
            }
          }
        }
      ) {
        id
      }
    }
  `;
