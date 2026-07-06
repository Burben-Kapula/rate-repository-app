import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import Button from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import Text from '../components/Text';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
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

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, loading: creating } = useCreateUser();
  const [signIn, { loading: signingIn }] = useSignIn();

  const onSubmit = async (values: typeof initialValues) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const loading = creating || signingIn;

  return (
    <View style={styles.container}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.title}>
        Sign up
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
      <FormTextInput
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
        error={formik.errors.passwordConfirmation}
        isTouched={formik.touched.passwordConfirmation}
        secureTextEntry
      />
      <Button
        label={loading ? 'Signing up...' : 'Sign up'}
        onPress={() => formik.handleSubmit()}
      />
    </View>
  );
};

export default SignUp;
