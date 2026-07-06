import { FlatList, StyleSheet, View } from 'react-native';

import RepositoryItem from './RepositoryItem';
import { repositories } from '../data/repositories';

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
  return (
    <FlatList
      data={repositories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.list}
    />
  );
};

export default RepositoryList;
