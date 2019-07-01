import {makeExecutableSchema} from 'graphql-tools'; // eslint-disable-line import/no-extraneous-dependencies
import typeDefs from 'src/typeDefs';
import resolvers from 'src/resolvers';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
