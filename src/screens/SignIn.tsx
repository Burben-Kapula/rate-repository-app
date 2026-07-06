import { useNavigate } from 'react-router-native';

import SignInContainer from '../components/SignInContainer';
import useSignIn from '../hooks/useSignIn';

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, { loading }] = useSignIn();

  const onSubmit = async (values: { username: string; password: string }) => {
    try {
      const { data } = await signIn(values);

      if (data?.authenticate.accessToken) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <SignInContainer onSubmit={onSubmit} loading={loading} />;
};

export default SignIn;
