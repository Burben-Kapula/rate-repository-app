import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra as
  { apolloUri?: string; apiUri?: string } | undefined;

export const apolloUri = extra?.apolloUri ?? 'http://localhost:4000/graphql';

export const apiUri = extra?.apiUri ?? 'http://localhost:5000/api';
