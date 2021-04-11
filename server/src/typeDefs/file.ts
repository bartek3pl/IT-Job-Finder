import { gql } from 'apollo-server-express';

const typeDefs = gql`
  "File to be uploaded (e.g. image)"
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

export default typeDefs;
