import { RepositoryOrderOption } from '../types/repository';

export const REPOSITORY_ORDER_OPTIONS: RepositoryOrderOption[] = [
  {
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
];
