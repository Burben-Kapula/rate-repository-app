import { StyleSheet, View } from 'react-native';

import Button from './Button';
import Text from './Text';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    textAlign: 'center',
    marginBottom: 16,
  },
});

const ErrorView = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <View style={styles.container}>
      <Text color="error" style={styles.message}>
        {message}
      </Text>
      {onRetry && <Button label="Try again" onPress={onRetry} />}
    </View>
  );
};

export default ErrorView;
