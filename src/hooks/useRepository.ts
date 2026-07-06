import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORY } from '../graphql/queries';
import { Repository } from '../types/repository';
import { ReviewsConnection } from '../types/api';

interface RepositoryData {
  repository: Repository & { reviews: ReviewsConnection };
}

interface UseRepositoryOptions {
  id: string;
  first?: number;
}

const useRepository = ({ id, first = 3 }: UseRepositoryOptions) => {
  const { data, loading, error, refetch, fetchMore } = useQuery<RepositoryData>(
    GET_REPOSITORY,
    {
      variables: { id, first },
      fetchPolicy: 'cache-and-network',
      skip: !id,
    },
  );

  const handleFetchMore = () => {
    const reviews = data?.repository.reviews;
    const canFetchMore = !loading && reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore || !reviews?.pageInfo?.endCursor) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first,
        after: reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: data?.repository,
    reviews: data?.repository.reviews,
    loading,
    error,
    refetch,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;
