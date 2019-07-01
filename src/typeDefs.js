import gql from 'graphql-tag';

const typeDefs = gql`
  type Mutation {
    setLocale(locale: String): String,
  }

  type Query {
    locale: String,
  }
`;

export default typeDefs;
