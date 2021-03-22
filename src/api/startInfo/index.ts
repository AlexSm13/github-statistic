import gql from 'graphql-tag';

const userInfoQuery = gql`
    query($login: String!){
      user(login: $login) {
        login,
        name,
        avatarUrl,
        company,
        location,
        url,
        websiteUrl,
        organization(login: $login) {
          name
        },
        email,
        bio,
        repositories(last: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
          totalCount,
          nodes {
            updatedAt
            createdAt,
            name,
            description,
            stargazerCount,
            forkCount,
            isFork,
            languages(last: 10) {
              totalSize,
              totalCount,
              edges {
                size,
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
`

export { userInfoQuery };
