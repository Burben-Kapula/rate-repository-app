export interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
  url?: string;
}

export type RepositoryOrderBy = 'CREATED_AT' | 'RATING_AVERAGE';
export type OrderDirection = 'ASC' | 'DESC';

export interface RepositoryOrderOption {
  label: string;
  orderBy: RepositoryOrderBy;
  orderDirection: OrderDirection;
}
