import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import Text from './Text';
import theme from '../theme';

interface FormTextInputProps extends TextInputProps {
  error?: string;
  isTouched?: boolean;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 12,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    backgroundColor: theme.colors.white,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    marginTop: 4,
  },
});

const FormTextInput = ({
  error,
  isTouched,
  style,
  ...props
}: FormTextInputProps) => {
  const hasError = Boolean(isTouched && error);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
      {hasError && (
        <Text color="error" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default FormTextInput;
