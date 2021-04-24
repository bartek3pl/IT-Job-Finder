import { gql } from 'apollo-server-express';

const typeDefs = gql`
  input FileInput {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  "File to be uploaded (e.g. image)"
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

export default typeDefs;
