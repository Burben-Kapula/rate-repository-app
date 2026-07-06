import { FlatList, StyleSheet, View } from 'react-native';

import ErrorView from '../components/ErrorView';
import LoadingView from '../components/LoadingView';
import ReviewItem from '../components/ReviewItem';
import useCurrentUser from '../hooks/useCurrentUser';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    padding: 16,
    backgroundColor: theme.colors.mainBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { reviews, loading, refetch } = useCurrentUser({
    includeReviews: true,
  });

  if (loading && reviews.length === 0) {
    return <LoadingView message="Loading your reviews..." />;
  }

  if (reviews.length === 0) {
    return <ErrorView message="You have not submitted any reviews yet." />;
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem review={item} showActions onDeleted={() => refetch()} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.list}
    />
  );
};

export default MyReviews;
