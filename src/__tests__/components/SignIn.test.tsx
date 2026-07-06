import { render, waitFor, userEvent } from '@testing-library/react-native';

import SignInContainer from '../../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const user = userEvent.setup();
      const { getByPlaceholderText, getByTestId } = await render(
        <SignInContainer onSubmit={onSubmit} />,
      );

      await user.type(getByPlaceholderText('Username'), 'kalle');
      await user.type(getByPlaceholderText('Password'), 'password');
      await user.press(getByTestId('signInSubmit'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
