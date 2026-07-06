export interface ReviewUser {
  id: string;
  username: string;
}

export interface Review {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  repositoryId: string;
  user: ReviewUser;
}
