import React, { FC, FormEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { FiArrowRight, FiUser } from 'react-icons/fi';
import styled from 'styled-components';

import { ContractType, Level, User as UserType } from '@typings/graphql';
import { LOGIN as USER_LOGIN } from '@api/user/mutations';
import {
  MAX_SALARY,
  MIN_SALARY,
  REGISTRATION,
} from '@utils/constants/constants';
import { validateLogin, validatePassword } from '@utils/helpers/validators';
import AuthenticationService from '@services/authenticationService';
import routes from '@components/routing/routesStrings';
import Button from '@components/ui/Buttons/BaseButton';
import TextField from '@components/ui/TextField/TextField';
import Spinner from '@components/ui/Spinner/Spinner';
import { saveFilters } from '../../../store/filter/actions';

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
  const dispatch = useDispatch();
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [userLogin, { data, loading, error }] = useMutation(USER_LOGIN);

  useEffect(() => {
    if (data && !loading && !error) {
      const { login: userLogin } = data || {};
      if (userLogin?.success) {
        const { accessToken, refreshToken, user } = userLogin || {};
        authenticate(accessToken, refreshToken, user);
        history.push(routes.jobOffers);
      }
    }
  }, [data]);

  const authenticate = (
    accessToken: string,
    refreshToken: string,
    user: UserType
  ) => {
    const authenticationService = new AuthenticationService();
    authenticationService.login(accessToken, refreshToken, user);
  };

  const handleLogin = (event: FormEvent<HTMLInputElement>) => {
    setLogin(event.currentTarget.value);
  };

  const handlePassword = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const getFilters = (user: UserType) => {
    return {
      title: '',
      employer: {
        name: '',
        address: {
          country: user.address?.country || '',
          city: user.address?.city || '',
        },
      },
      minSalary: user.minSalary || MIN_SALARY,
      maxSalary: user.maxSalary || MAX_SALARY,
      skills: (user?.skills || []) as Array<string>,
      levels: (user.levels || []) as Array<Level>,
      contractTypes: (user.contractTypes || []) as Array<ContractType>,
    };
  };

  const setInitialFilters = (user: UserType) => {
    const filters = getFilters(user);
    dispatch(saveFilters(filters));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await userLogin({
        variables: { input: { login, password } },
      });
      const isSuccess = data?.login?.success;
      if (isSuccess) {
        const user = data?.login?.user;
        setInitialFilters(user);
      }
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
