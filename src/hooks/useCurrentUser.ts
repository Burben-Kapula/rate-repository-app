import { useQuery } from '@apollo/client/react';

import { GET_ME } from '../graphql/queries';
import { User } from '../types/auth';

interface MeData {
  me: User | null;
}

const useCurrentUser = () => {
  const { data, loading } = useQuery<MeData>(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  return { user: data?.me ?? null, loading };
};

export default useCurrentUser;
