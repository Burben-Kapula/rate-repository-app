import { useApolloClient } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';

import useAuthStorage from './useAuthStorage';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    // Token must be removed before resetStore so the me query returns null.
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return signOut;
};

export default useSignOut;
