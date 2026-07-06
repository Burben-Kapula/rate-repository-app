import * as Linking from 'expo-linking';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';

import ErrorView from '../components/ErrorView';
import LoadingView from '../components/LoadingView';
import RepositoryItem from '../components/RepositoryItem';
import ReviewItem from '../components/ReviewItem';
import useRepository from '../hooks/useRepository';
import { Review } from '../types/review';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    padding: 16,
    backgroundColor: theme.colors.mainBackground,
  },
  header: {
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
  const { id } = useParams<{ id: string }>();
  const { repository, reviews, loading, error, refetch, fetchMore } =
    useRepository({ id: id ?? '', first: 3 });

  if (loading && !repository) {
    return <LoadingView message="Loading repository..." />;
  }

  if (error || !repository) {
    return (
      <ErrorView
        message="Failed to load repository."
        onRetry={() => refetch()}
      />
    );
  }

  const reviewNodes: Review[] = reviews
    ? reviews.edges.map((edge) => edge.node)
    : [];

  const openInGithub = () => {
    if (repository.url) {
      Linking.openURL(repository.url);
    }
  };

  return (
    <FlatList
      data={reviewNodes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.list}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <RepositoryItem
            repository={repository}
            showGithubButton
            onGithubPress={openInGithub}
          />
        </View>
      )}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Repository;
