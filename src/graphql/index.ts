import { ApolloClient, createHttpLink,InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `bearer ${import.meta.env.VITE_GIT_HUB_TOKEN}`,
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

