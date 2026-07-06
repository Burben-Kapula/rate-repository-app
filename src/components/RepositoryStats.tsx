import { StyleSheet, View } from 'react-native';

import Text from './Text';
import formatCount from '../utils/formatCount';

interface RepositoryStatsProps {
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <View>
    <Text fontWeight="bold">{value}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryStats = ({
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
}: RepositoryStatsProps) => {
  return (
    <View style={styles.container}>
      <StatItem label="Stars" value={formatCount(stargazersCount)} />
      <StatItem label="Forks" value={formatCount(forksCount)} />
      <StatItem label="Reviews" value={String(reviewCount)} />
      <StatItem label="Rating" value={String(ratingAverage)} />
    </View>
  );
};

export default RepositoryStats;
