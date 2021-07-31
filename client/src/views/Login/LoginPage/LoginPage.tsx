import React, { FC } from 'react';
import styled from 'styled-components';

import { GLOBAL_PADDING } from '@utils/constants/constants';
import colors from '@styles/colors';
import Header from '@components/ui/Header/Header';
import Subheader from '@components/ui/Subheader/Subheader';
import BackButton from '@components/ui/BackButton/BackButton';
import Text from '@components/ui/Text/Text';
import Dot from '@components/ui/Dot/Dot';
import TextButton from '@components/ui/TextButton/TextButton';

const StyledLoginPage = styled.div`
  padding: ${GLOBAL_PADDING};
  background-color: ${colors.white};
`;

const LoginPage: FC = () => <StyledLoginPage>LOGIN PAGE</StyledLoginPage>;

export default LoginPage;
