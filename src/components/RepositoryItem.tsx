import { Image, StyleSheet, View } from 'react-native';

import LanguageTag from './LanguageTag';
import RepositoryStats from './RepositoryStats';
import Text from './Text';
import { Repository } from '../types/repository';
import theme from '../theme';

interface RepositoryItemProps {
  repository: Repository;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 4,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    marginTop: 4,
    marginBottom: 8,
  },
});

const RepositoryItem = ({ repository }: RepositoryItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.headerContent}>
          <Text fontWeight="bold" fontSize="subheading">
            {repository.fullName}
          </Text>
        </View>
      </View>
      <Text color="textSecondary" style={styles.description}>
        {repository.description}
      </Text>
      <LanguageTag language={repository.language} />
      <RepositoryStats
        forksCount={repository.forksCount}
        stargazersCount={repository.stargazersCount}
        ratingAverage={repository.ratingAverage}
        reviewCount={repository.reviewCount}
      />
    </View>
  );
};

export default RepositoryItem;
