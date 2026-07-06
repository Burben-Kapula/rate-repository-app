import { Pressable, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  testID?: string;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  label: {
    color: theme.colors.white,
  },
});

const Button = ({ label, onPress, testID }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button} testID={testID}>
      <Text fontWeight="bold" style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;
