import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import { App } from "./App";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";

let accessToken = "";
let accessSecondToken = "";
function setAccessToken(t1?: string) {
  // @ts-ignore
  if (t1) client.link.options.headers.authorization = `Bearer ${t1}`;
}

function clientFactory(token: string) {}

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_KEY}`,
  },
  cache: new InMemoryCache(),
});
//console.log()

ReactDOM.render(
  <ApolloProvider client={client}>
    <App setAccessToken={setAccessToken} />
  </ApolloProvider>,
  document.getElementById("root")
);
