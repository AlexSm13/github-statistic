import gql from "graphql-tag";

export const userInfoQuery = gql`
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
    }
  }
`;

export const getOthersRepositoriesWithoutToken = gql`
  query($login: String!, $cursor: String) {
    user(login: $login) {
      repositories(
        first: 15
        after: $cursor
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
        nodes {
          updatedAt
          createdAt
          name
          url
          sshUrl
          description
          stargazerCount
          owner {
            login
          }
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
              number
              title
              closedAt
              createdAt
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                  nodes {
                    committedDate
                    message
                    author {
                      user {
                        login
                      }
                    }
                  }
                }
              }
            }
          }
          issues(last: 50) {
            totalCount
            nodes {
              author {
                login
              }
              number
              title
              closedAt
              createdAt
            }
          }
        }
      }
    }
  }
`;

export const getOthersRepositories = gql`
  query($login: String!, $cursor: String) {
    user(login: $login) {
      repositories(first: 100, after: $cursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
        nodes {
          updatedAt
          createdAt
          name
          collaborators {
            edges {
              node {
                login
                name
                avatarUrl
              }
            }
          }
          url
          sshUrl
          description
          stargazerCount
          owner {
            login
          }
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
              number
              title
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
              number
              title
              closedAt
              createdAt
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                  nodes {
                    committedDate
                    message
                    author {
                      user {
                        login
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
