import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';
import { Repository } from '../types/repository';
import { RepositoriesConnection } from '../types/api';

interface RepositoriesData {
  repositories: RepositoriesConnection;
}

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery<RepositoriesData>(
    GET_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  const repositories: Repository[] = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return { repositories, loading, error, refetch };
};

export default useRepositories;
