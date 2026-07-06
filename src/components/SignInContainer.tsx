import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Button from './Button';
import FormTextInput from './FormTextInput';
import Text from './Text';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.white,
  },
  title: {
    marginBottom: 16,
  },
});

interface SignInContainerProps {
  onSubmit: (values: typeof initialValues) => void | Promise<void>;
  loading?: boolean;
}

const SignInContainer = ({
  onSubmit,
  loading = false,
}: SignInContainerProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.title}>
        Sign in
      </Text>
      <FormTextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        error={formik.errors.username}
        isTouched={formik.touched.username}
        autoCapitalize="none"
      />
      <FormTextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        error={formik.errors.password}
        isTouched={formik.touched.password}
        secureTextEntry
      />
      <Button
        label={loading ? 'Signing in...' : 'Sign in'}
        onPress={() => formik.handleSubmit()}
        testID="signInSubmit"
      />
    </View>
  );
};

export default SignInContainer;
