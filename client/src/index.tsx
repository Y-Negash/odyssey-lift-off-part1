import React from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styles";
import Pages from "./pages";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000", //tells client to send operations over this network
  }),
  cache: new InMemoryCache(), // every instance uses in memory cache to store and reuse results
});

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <GlobalStyles />
    <Pages />
  </ApolloProvider>
  </React.StrictMode>,
);
