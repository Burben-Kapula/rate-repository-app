import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Text from './Text';
import theme from '../theme';

interface LoadingViewProps {
  message?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

const LoadingView = ({ message = 'Loading...' }: LoadingViewProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text color="textSecondary" style={{ marginTop: 12 }}>
        {message}
      </Text>
    </View>
  );
};

export default LoadingView;
