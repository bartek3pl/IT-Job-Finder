import React, { FC, FormEvent, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { FiArrowRight, FiUser, FiMail } from 'react-icons/fi';
import styled from 'styled-components';

import { CREATE_USER } from '@api/user/mutations';
import { REGISTRATION } from '@utils/constants/constants';
import {
  validateLogin,
  validateEmail,
  validatePassword,
} from '@utils/helpers/validators';
import routes from '@components/routing/routesStrings';
import Button from '@components/ui/Button/Button';
import TextField from '@components/ui/TextField/TextField';
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

const RegistrationForm: FC = () => {
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  useEffect(() => {
    if (data && !loading && !error) {
      const { createUser } = data || {};
      if (createUser?.success) {
        history.push(routes.login);
      }
    }
  }, [data]);

  const handleLogin = (event: FormEvent<HTMLInputElement>) => {
    setLogin(event.currentTarget.value);
  };

  const handleEmail = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePassword = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleConfirmPassword = (event: FormEvent<HTMLInputElement>) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await createUser({
        variables: { input: { login, email, password } },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isFormValid = () =>
    validateLogin(login) &&
    validateEmail(email) &&
    validatePassword(password) &&
    password === confirmPassword;

  const showLoginError = () =>
    login !== '' && !validateLogin(login) ? REGISTRATION.LOGIN_VALIDATION : '';

  const showEmailError = () =>
    email !== '' && !validateEmail(email) ? REGISTRATION.EMAIL_VALIDATION : '';

  const showPasswordError = () =>
    password !== '' && !validatePassword(password)
      ? REGISTRATION.PASSWORD_VALIDATION
      : '';

  const showConfirmPasswordError = () =>
    password !== confirmPassword && confirmPassword !== ''
      ? REGISTRATION.CONFIRM_PASSWORD_VALIDATION
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
          type="email"
          alt="email"
          name="email"
          placeholder="Email Address"
          icon={<FiMail />}
          value={email}
          handleChange={handleEmail}
          error={showEmailError()}
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
        <TextField
          type="password"
          alt="confirm password"
          name="confirm password"
          placeholder="Confirm Password"
          value={confirmPassword}
          handleChange={handleConfirmPassword}
          error={showConfirmPasswordError()}
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

export default RegistrationForm;
