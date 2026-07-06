import Constants from 'expo-constants';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab to="/" label="Repositories" />
        <AppBarTab to="/signin" label="Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
