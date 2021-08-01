import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { GLOBAL_PADDING } from '@utils/constants/constants';
import colors from '@styles/colors';
import routes from '@components/routing/routesStrings';
import Header from '@components/ui/Header/Header';
import Subheader from '@components/ui/Subheader/Subheader';
import BackButton from '@components/ui/SideButtons/BackButton';
import Text from '@components/ui/Text/Text';
import Dot from '@components/ui/Dot/Dot';
import TextButton from '@components/ui/TextButton/TextButton';
import RegistrationForm from '@views/Registration/RegistrationForm/RegistrationForm';

const StyledRegistrationPage = styled.div`
  padding: ${GLOBAL_PADDING};
  padding-top: 200px;
  background-color: ${colors.white};
`;

const SubheaderWrapper = styled.div`
  margin-top: 25px;
`;

const GoToLoginPageWrapper = styled.div`
  position: relative;
  margin-top: 65px;
  display: flex;
  justify-content: center;
`;

const TextButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 45px;
`;

const RegistrationPage: FC = () => (
  <StyledRegistrationPage>
    <BackButton />
    <Header>Register Account</Header>
    <SubheaderWrapper>
      <Subheader>Fill your details or continue with social media</Subheader>
    </SubheaderWrapper>

    <RegistrationForm />

    <GoToLoginPageWrapper>
      <Dot />
      <Text size={32} weight={500} color={colors.secondary}>
        Or go to the login page
      </Text>
      <Dot />
    </GoToLoginPageWrapper>
    <TextButtonWrapper>
      <Link to={routes.login}>
        <TextButton
          name="login"
          backgroundColor={colors.primary}
          size={40}
          horizontalPadding={90}
        >
          Login
        </TextButton>
      </Link>
    </TextButtonWrapper>
  </StyledRegistrationPage>
);

export default RegistrationPage;
