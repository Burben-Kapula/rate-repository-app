import { Repository } from './repository';
import { Review } from './review';

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
  startCursor: string | null;
}

export interface RepositoryEdge {
  node: Repository;
  cursor?: string;
}

export interface ReviewEdge {
  node: Review;
  cursor?: string;
}

export interface RepositoriesConnection {
  totalCount?: number;
  pageInfo?: PageInfo;
  edges: RepositoryEdge[];
}

export interface ReviewsConnection {
  totalCount?: number;
  pageInfo?: PageInfo;
  edges: ReviewEdge[];
}

export interface RestRepositoriesResponse {
  edges: RepositoryEdge[];
}
