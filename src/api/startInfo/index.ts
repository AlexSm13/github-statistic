import gql from "graphql-tag";

const userInfoQuery = gql`
  query($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl
      company
      location
      url
      websiteUrl
      organization(login: $login) {
        name
      }
      email
      bio
      repositories(last: 100, orderBy: { field: UPDATED_AT, direction: ASC }) {
        totalCount
        nodes {
          updatedAt
          createdAt
          name
          url
          sshUrl
          description
          stargazerCount
          forkCount
          forks(last: 60) {
            totalCount
            nodes {
              name
            }
          }
          isFork
          languages(last: 10) {
            totalSize
            totalCount
            edges {
              size
              node {
                name
              }
            }
          }
          pullRequests(last: 50) {
            totalCount
            nodes {
              author {
                login
              }
              closedAt
              createdAt
            }
          }
          issues(last: 50) {
            totalCount
            nodes {
              author {
                login
              }
              closedAt
              createdAt
            }
          }
        }
      }
    }
  }
`;

export { userInfoQuery };
