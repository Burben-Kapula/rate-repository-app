import { Repository } from './repository';

export interface RepositoryEdge {
  node: Repository;
}

export interface RepositoriesConnection {
  edges: RepositoryEdge[];
}

export interface RestRepositoriesResponse {
  edges: RepositoryEdge[];
}
