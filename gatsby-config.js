require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.HYGRAPH_API_URL,
        token: process.env.HYGRAPH_API_TOKEN,
        locales: ['de', 'en'],
        stages: ['PUBLISHED'],
        queryConcurrency: 5,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-mantine',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
};
