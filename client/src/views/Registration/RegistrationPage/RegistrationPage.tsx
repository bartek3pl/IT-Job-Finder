import React, { FC } from 'react';
import styled from 'styled-components';

import { GLOBAL_PADDING } from '@utils/constants/constants';
import colors from '@styles/colors';
import Header from '@components/ui/Header/Header';
import Subheader from '@components/ui/Subheader/Subheader';
import BackButton from '@components/ui/BackButton/BackButton';
import Text from '@components/ui/Text/Text';
import Dot from '@components/ui/Dot/Dot';
import RegistrationForm from '@views/Registration/RegistrationForm/RegistrationForm';
import TextButton from '@components/ui/TextButton/TextButton';

const StyledRegistrationPage = styled.div`
  margin-top: 160px;
  padding: ${GLOBAL_PADDING};
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

const TermsAndConditionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 90px;
  text-align: center;
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
        <Text size={32}>Or go to the login page</Text>
        <Dot />
      </GoToLoginPageWrapper>
      <TextButtonWrapper>
        <TextButton
          name="login"
          backgroundColor={colors.primary}
          size={40}
          horizontalPadding={90}
        >
          Login
        </TextButton>
      </TextButtonWrapper>
      <TermsAndConditionsWrapper>
        <Text size={30}>
          By continuing you confirm that you agree with our{' '}
          <Text size={30} weight={600}>
            Terms and Conditions
          </Text>
        </Text>
      </TermsAndConditionsWrapper>
    </StyledRegistrationPage>
  );

export default RegistrationPage;
