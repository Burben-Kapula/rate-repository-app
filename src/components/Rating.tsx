import { StyleSheet, View } from 'react-native';

import Text from './Text';
import theme from '../theme';

interface RatingProps {
  rating: number;
}

const SIZE = 48;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
  },
});

const Rating = ({ rating }: RatingProps) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" style={styles.text}>
        {rating}
      </Text>
    </View>
  );
};

export default Rating;
