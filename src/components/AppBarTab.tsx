import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';
import theme from '../theme';

interface AppBarTabProps {
  to: string;
  label: string;
}

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

const AppBarTab = ({ to, label }: AppBarTabProps) => {
  return (
    <Link to={to} style={styles.tab} underlayColor="transparent">
      <Text fontWeight="bold" style={{ color: theme.colors.white }}>
        {label}
      </Text>
    </Link>
  );
};

export default AppBarTab;
