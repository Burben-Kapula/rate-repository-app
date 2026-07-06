import { useContext } from 'react';

import AuthStorageContext from '../contexts/AuthStorageContext';
import AuthStorage from '../utils/authStorage';

const useAuthStorage = (): AuthStorage => {
  const authStorage = useContext(AuthStorageContext);

  if (!authStorage) {
    throw new Error('useAuthStorage must be used within AuthStorageContext');
  }

  return authStorage;
};

export default useAuthStorage;
