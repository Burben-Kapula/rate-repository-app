import { FlatList, StyleSheet, View } from 'react-native';

import ErrorView from './ErrorView';
import LoadingView from './LoadingView';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    padding: 16,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error, refetch } = useRepositories();

  if (loading && repositories.length === 0) {
    return <LoadingView message="Fetching repositories..." />;
  }

  if (error) {
    return (
      <ErrorView
        message="Failed to load repositories. Is the API server running?"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <FlatList
      data={repositories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.list}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default RepositoryList;
