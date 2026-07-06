import { Repository } from '../types/repository';
import { RestRepositoriesResponse } from '../types/api';
import httpClient from './httpClient';

export const fetchRepositories = async (): Promise<Repository[]> => {
  const response =
    await httpClient.get<RestRepositoriesResponse>('/repositories');

  return response.data.edges.map((edge) => edge.node);
};
