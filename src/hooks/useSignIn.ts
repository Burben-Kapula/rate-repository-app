import { useMutation, useApolloClient } from '@apollo/client/react';
import { FetchResult } from '@apollo/client';

import { AUTHENTICATE } from '../graphql/mutations';
import { AuthenticateInput, AuthenticateResult } from '../types/auth';
import useAuthStorage from './useAuthStorage';

interface AuthenticateData {
  authenticate: AuthenticateResult;
}

type SignInResult = FetchResult<AuthenticateData>;

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation<AuthenticateData>(AUTHENTICATE);

  const signIn = async (
    credentials: AuthenticateInput,
  ): Promise<SignInResult> => {
    const response = await mutate({ variables: { credentials } });
    const accessToken = response.data?.authenticate.accessToken;

    if (accessToken) {
      // Store token first, then reset cache so authenticated queries re-run.
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();
    }

    return response;
  };

  return [signIn, result] as const;
};

export default useSignIn;
