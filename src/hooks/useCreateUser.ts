import { useMutation } from '@apollo/client/react';

import { CREATE_USER } from '../graphql/mutations';

interface CreateUserInput {
  username: string;
  password: string;
}

interface CreateUserData {
  createUser: { id: string; username: string };
}

const useCreateUser = () => {
  const [mutate, result] = useMutation<CreateUserData>(CREATE_USER);

  const createUser = (user: CreateUserInput) => {
    return mutate({ variables: { user } });
  };

  return { createUser, ...result };
};

export default useCreateUser;
