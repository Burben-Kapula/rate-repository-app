import { useMutation } from '@apollo/client/react';

import { CREATE_REVIEW } from '../graphql/mutations';

export interface ReviewInput {
  ownerName: string;
  repositoryName: string;
  rating: number;
  text?: string;
}

interface CreateReviewData {
  createReview: { repositoryId: string };
}

const useCreateReview = () => {
  const [mutate, result] = useMutation<CreateReviewData>(CREATE_REVIEW);

  const createReview = (review: ReviewInput) => {
    return mutate({ variables: { review } });
  };

  return { createReview, ...result };
};

export default useCreateReview;
