import { gql } from '@apollo/client';

import { REPOSITORY_FIELDS, REVIEW_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  query Repositories(
    $orderBy: RepositoryOrder
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
        startCursor
      }
      edges {
        node {
          ...RepositoryFields
        }
        cursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryFields
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
          startCursor
        }
        edges {
          node {
            ...ReviewFields
          }
          cursor
        }
      }
    }
  }
`;

export const GET_ME = gql`
  ${REVIEW_FIELDS}
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
          }
        }
      }
    }
  }
`;
