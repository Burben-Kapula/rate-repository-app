import { StyleSheet, View } from 'react-native';

import Text from './Text';
import theme from '../theme';

interface LanguageTagProps {
  language: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  text: {
    color: theme.colors.white,
  },
});

const LanguageTag = ({ language }: LanguageTagProps) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" style={styles.text}>
        {language}
      </Text>
    </View>
  );
};

export default LanguageTag;
