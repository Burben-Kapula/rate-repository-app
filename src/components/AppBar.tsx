import Constants from 'expo-constants';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppBarAction from './AppBarAction';
import AppBarTab from './AppBarTab';
import useCurrentUser from '../hooks/useCurrentUser';
import useSignOut from '../hooks/useSignOut';
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
  const { user } = useCurrentUser();
  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab to="/" label="Repositories" />
        {user ? (
          <>
            <AppBarTab to="/create-review" label="Create a review" />
            <AppBarTab to="/my-reviews" label="My reviews" />
            <AppBarAction label="Sign out" onPress={signOut} />
          </>
        ) : (
          <>
            <AppBarTab to="/signin" label="Sign in" />
            <AppBarTab to="/signup" label="Sign up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
