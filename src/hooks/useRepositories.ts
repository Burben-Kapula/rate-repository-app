import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';
import { OrderDirection, RepositoryOrderBy } from '../types/repository';
import { RepositoriesConnection } from '../types/api';

interface RepositoriesData {
  repositories: RepositoriesConnection;
}

export interface RepositoryQueryVariables {
  orderBy?: RepositoryOrderBy;
  orderDirection?: OrderDirection;
  searchKeyword?: string;
  first?: number;
  after?: string;
}

const useRepositories = (variables: RepositoryQueryVariables = {}) => {
  const { data, loading, error, refetch, fetchMore } =
    useQuery<RepositoriesData>(GET_REPOSITORIES, {
      variables: {
        first: 8,
        ...variables,
      },
      fetchPolicy: 'cache-and-network',
    });

  // Load the next page when the user scrolls to the end of the list.
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo?.hasNextPage;

    if (!canFetchMore || !data?.repositories.pageInfo?.endCursor) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
        first: variables.first ?? 8,
      },
    });
  };

  return {
    repositories: data?.repositories,
    loading,
    error,
    refetch,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;
