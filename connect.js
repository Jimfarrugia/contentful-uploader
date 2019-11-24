const contentful = require("contentful-management");

const contentfulClient = contentful.createClient({
  // from Contentful settings > API keys > content management tokens > content-management-import
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

module.exports = contentfulClient;