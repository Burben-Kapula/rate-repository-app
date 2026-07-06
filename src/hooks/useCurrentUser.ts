import { useQuery } from '@apollo/client/react';

import { GET_ME } from '../graphql/queries';
import { User } from '../types/auth';
import { Review } from '../types/review';

interface MeData {
  me: (User & { reviews?: { edges: { node: Review }[] } }) | null;
}

interface UseCurrentUserOptions {
  includeReviews?: boolean;
}

const useCurrentUser = ({
  includeReviews = false,
}: UseCurrentUserOptions = {}) => {
  const { data, loading, refetch } = useQuery<MeData>(GET_ME, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return {
    user: data?.me ?? null,
    reviews,
    loading,
    refetch,
  };
};

export default useCurrentUser;
