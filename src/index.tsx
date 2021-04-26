import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import { App } from "./App";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";

function setAccessToken(userToken?: string) {
  // @ts-ignore
  if (userToken) client.link.options.headers.authorization = `Bearer ${t1}`;
}

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
