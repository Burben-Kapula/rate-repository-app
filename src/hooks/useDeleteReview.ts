import { useMutation } from '@apollo/client/react';

import { DELETE_REVIEW } from '../graphql/mutations';

interface DeleteReviewData {
  deleteReview: { id: string };
}

const useDeleteReview = () => {
  const [mutate, result] = useMutation<DeleteReviewData>(DELETE_REVIEW);

  const deleteReview = (id: string) => {
    return mutate({ variables: { id } });
  };

  return { deleteReview, ...result };
};

export default useDeleteReview;
