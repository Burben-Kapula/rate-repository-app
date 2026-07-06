import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import Button from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import Text from '../components/Text';
import useSignIn from '../hooks/useSignIn';
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
  error: {
    marginBottom: 12,
  },
});

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, { loading }] = useSignIn();

  const onSubmit = async (values: typeof initialValues) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });

      if (data?.authenticate.accessToken) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      />
    </View>
  );
};

export default SignIn;
