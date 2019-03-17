import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { graphql, buildSchema } from "graphql";

const schema = buildSchema(
/* GraphQL */ `
type Message {
  text: String
}

type Query {
  message: Message
}
`);
const resolvers = {
  message: () => ({ text: `Hello world` })
};

export const query: APIGatewayProxyHandler = async ({ body: request }, _context) => {
  const { data: result } = await graphql(schema, request, resolvers);

  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2)
  }
}
