import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import ErrorView from './ErrorView';
import LoadingView from './LoadingView';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';
import useRepositories from '../hooks/useRepositories';
import { REPOSITORY_ORDER_OPTIONS } from '../constants/repositoryOrder';
import { RepositoriesConnection } from '../types/api';
import { RepositoryOrderOption } from '../types/repository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    padding: 16,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export interface RepositoryListContainerProps {
  repositories: RepositoriesConnection | undefined;
  onEndReach: () => void;
  order: RepositoryOrderOption;
  onOrderChange: (order: RepositoryOrderOption) => void;
  search: string;
  onSearchChange: (text: string) => void;
  onRepositoryPress: (id: string) => void;
}

// Class component keeps the search header mounted so the TextInput keeps focus.
export class RepositoryListContainer extends React.Component<RepositoryListContainerProps> {
  renderHeader = () => {
    return (
      <RepositoryListHeader
        order={this.props.order}
        onOrderChange={this.props.onOrderChange}
        search={this.props.search}
        onSearchChange={this.props.onSearchChange}
      />
    );
  };

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => this.props.onRepositoryPress(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.list}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<RepositoryOrderOption>(
    REPOSITORY_ORDER_OPTIONS[0],
  );
  const [search, setSearch] = useState('');
  // Debounce avoids firing a GraphQL request on every keystroke.
  const [debouncedSearch] = useDebounce(search, 500);

  const { repositories, loading, error, refetch, fetchMore } = useRepositories({
    orderBy: order.orderBy,
    orderDirection: order.orderDirection,
    searchKeyword: debouncedSearch || undefined,
    first: 8,
  });

  if (loading && !repositories) {
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
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={fetchMore}
      order={order}
      onOrderChange={setOrder}
      search={search}
      onSearchChange={setSearch}
      onRepositoryPress={(id) => navigate(`/repository/${id}`)}
    />
  );
};

export default RepositoryList;
