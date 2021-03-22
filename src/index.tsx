import React from 'react';
import ReactDOM from 'react-dom';
import "./index.sass";
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { token } from "./environment";

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${token}`
  },
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
    document.getElementById('root')
);
