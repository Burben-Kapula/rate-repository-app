import { Pressable, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

interface AppBarActionProps {
  label: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

const AppBarAction = ({ label, onPress }: AppBarActionProps) => {
  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Text fontWeight="bold" style={{ color: theme.colors.white }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default AppBarAction;
