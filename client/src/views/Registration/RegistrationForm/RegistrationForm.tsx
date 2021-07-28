import React, { FC, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { FiArrowRight, FiUser, FiMail } from 'react-icons/fi';

import { validateLogin, validatePassword } from '@utils/helpers/validators';
import Button from '@components/forms/Button/Button';
import TextField from '@components/forms/TextField/TextField';

const TextFieldsWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ButtonWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
`;

const RegistrationPage: FC = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: FormEvent<HTMLInputElement>) => {
    setLogin(event.currentTarget.value);
  };

  const handleEmail = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePassword = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const isFormValid = () => validateLogin(login) && validatePassword(password);

  const showLoginError = () => login !== '' && !validateLogin(login);

  const showPasswordError = () =>
    password !== '' && !validatePassword(password);

  return (
    <>
      <TextFieldsWrapper>
        <TextField
          type="text"
          alt="login"
          name="login"
          placeholder="Login"
          icon={<FiUser />}
          value={login}
          handleChange={handleLogin}
        />
        <TextField
          type="email"
          alt="email"
          name="email"
          placeholder="Email Address"
          icon={<FiMail />}
          value={email}
          handleChange={handleEmail}
        />
        <TextField
          type="password"
          alt="password"
          name="password"
          placeholder="Password"
          value={password}
          handleChange={handlePassword}
        />
      </TextFieldsWrapper>
      <ButtonWrapper>
        <Button>
          <FiArrowRight />
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default RegistrationPage;
