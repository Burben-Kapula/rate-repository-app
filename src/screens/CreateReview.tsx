import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import Button from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import Text from '../components/Text';
import useCreateReview from '../hooks/useCreateReview';
import theme from '../theme';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
  text: yup.string(),
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

const CreateReview = () => {
  const navigate = useNavigate();
  const { createReview, loading } = useCreateReview();

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const { data } = await createReview({
        ownerName: values.ownerName,
        repositoryName: values.repositoryName,
        rating: Number(values.rating),
        text: values.text || undefined,
      });

      const repositoryId = data?.createReview.repositoryId;
      if (repositoryId) {
        navigate(`/repository/${repositoryId}`);
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
        Create a review
      </Text>
      <FormTextInput
        placeholder="Repository owner"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
        error={formik.errors.ownerName}
        isTouched={formik.touched.ownerName}
        autoCapitalize="none"
      />
      <FormTextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
        error={formik.errors.repositoryName}
        isTouched={formik.touched.repositoryName}
        autoCapitalize="none"
      />
      <FormTextInput
        placeholder="Rating (0-100)"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        error={formik.errors.rating}
        isTouched={formik.touched.rating}
        keyboardType="numeric"
      />
      <FormTextInput
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        error={formik.errors.text}
        isTouched={formik.touched.text}
        multiline
      />
      <Button
        label={loading ? 'Submitting...' : 'Create review'}
        onPress={() => formik.handleSubmit()}
      />
    </View>
  );
};

export default CreateReview;
