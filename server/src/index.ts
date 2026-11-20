import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "fs";
import path from "path";
import gql from "graphql-tag";
import { graphql } from "graphql";

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schema.graphql"), {
    encoding: "utf-8",
  }),
);

const mocks = {
  Query: () => ({
    tracksForHome: () => [...new Array(6)],
  }),
  Track: () => ({
    id: () => "track_01",
    title: () => "Astro Kitty, Space Explorer",
    author: () => ({
      name: "Grumpy Cat",
      photo: "https://res.cloudinary.com/apollographql/image/upload/v1730818804/odyssey/lift-off-api/catstrophysicist_bqfh9n_j0amow.jpg",
    }),
    thumbnail: () => "https://res.cloudinary.com/apollographql/image/upload/v1730818804/odyssey/lift-off-api/nebula_cat_djkt9r_nzifdj.jpg",
    length: () => 1210,
    modulesCount: () => 6,
  }),
};

async function startApolloServer() {
  const schema = makeExecutableSchema({ typeDefs });
  const mockedSchema = addMocksToSchema({
    schema,
    mocks,
  });

  const server = new ApolloServer({
    schema: mockedSchema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`
      🚀  Server is running
      📭  Query at ${url}
    `);
}

startApolloServer();