import React, { FC, FormEvent, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { FiArrowRight, FiUser } from 'react-icons/fi';
import styled from 'styled-components';

import { LOGIN as USER_LOGIN } from '@api/user/mutations';
import { REGISTRATION } from '@utils/constants/constants';
import { validateLogin, validatePassword } from '@utils/helpers/validators';
import AuthenticationService from '@services/authenticationService/authenticationService';
import routes from '@components/routing/routesStrings';
import Button from '@components/forms/Button/Button';
import TextField from '@components/forms/TextField/TextField';
import Spinner from '@components/ui/Spinner/Spinner';

const TextFieldsWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ButtonWrapper = styled.div`
  position: relative;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm: FC = () => {
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [userLogin, { data, loading, error }] = useMutation(USER_LOGIN);

  useEffect(() => {
    if (data && !loading && !error) {
      const { login: userLogin } = data || {};
      if (userLogin?.success) {
        const { accessToken, refreshToken, user } = userLogin || {};
        const { _id: userId } = user || {};
        authenticate(accessToken, refreshToken, userId);
        history.push(routes.jobOffers);
      }
    }
  }, [data]);

  const authenticate = (
    accessToken: string,
    refreshToken: string,
    userId: string
  ) => {
    const authenticationService = new AuthenticationService();
    authenticationService.login(accessToken, refreshToken, userId);
  };

  const handleLogin = (event: FormEvent<HTMLInputElement>) => {
    setLogin(event.currentTarget.value);
  };

  const handlePassword = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await userLogin({
        variables: { input: { login, password } },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isFormValid = () => validateLogin(login) && validatePassword(password);

  const showLoginError = () =>
    login !== '' && !validateLogin(login) ? REGISTRATION.LOGIN_VALIDATION : '';

  const showPasswordError = () =>
    password !== '' && !validatePassword(password)
      ? REGISTRATION.PASSWORD_VALIDATION
      : '';

  const isButtonDisabled = !isFormValid() || loading;

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="on">
      <TextFieldsWrapper>
        <TextField
          type="text"
          alt="login"
          name="login"
          placeholder="Login"
          icon={<FiUser />}
          value={login}
          handleChange={handleLogin}
          error={showLoginError()}
        />
        <TextField
          type="password"
          alt="password"
          name="password"
          placeholder="Password"
          value={password}
          handleChange={handlePassword}
          error={showPasswordError()}
        />
      </TextFieldsWrapper>
      <ButtonWrapper>
        <Button type="submit" disabled={isButtonDisabled}>
          <FiArrowRight />
        </Button>
        {loading && <Spinner loading={loading} />}
      </ButtonWrapper>
    </form>
  );
};

export default LoginForm;
