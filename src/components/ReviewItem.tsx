import { Alert, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';

import Button from './Button';
import Rating from './Rating';
import Text from './Text';
import useDeleteReview from '../hooks/useDeleteReview';
import { Review } from '../types/review';
import formatDate from '../utils/formatDate';
import theme from '../theme';

interface ReviewItemProps {
  review: Review;
  showActions?: boolean;
  onDeleted?: () => void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  meta: {
    marginTop: 4,
    marginBottom: 8,
  },
  actions: {
    marginTop: 8,
    gap: 8,
  },
});

const ReviewItem = ({
  review,
  showActions = false,
  onDeleted,
}: ReviewItemProps) => {
  const navigate = useNavigate();
  const { deleteReview } = useDeleteReview();

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteReview(review.id);
            onDeleted?.();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container} testID="reviewItem">
      <Rating rating={review.rating} />
      <View style={styles.content}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary" style={styles.meta}>
          {formatDate(review.createdAt)}
        </Text>
        <Text>{review.text}</Text>
        {showActions && (
          <View style={styles.actions}>
            <Button
              label="Show repository"
              onPress={() => navigate(`/repository/${review.repositoryId}`)}
            />
            <Button label="Delete" onPress={handleDelete} />
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;
