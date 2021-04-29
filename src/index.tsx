import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import { App } from "./App";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";

const setAccessToken = (userToken?: string) => {
  let token = process.env.REACT_APP_KEY;
  if (userToken) {
    token = userToken;
  }
  if (!userToken) return;
  // @ts-ignore
  client.link.options.headers.authorization = `Bearer ${token}`;
};

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_KEY}`,
  },
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App setAccessToken={setAccessToken} />
  </ApolloProvider>,
  document.getElementById("root")
);
