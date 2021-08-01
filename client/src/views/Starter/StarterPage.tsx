import React, { FC } from 'react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { GLOBAL_PADDING } from '@utils/constants/constants';
import starterImage from '@assets/images/starter.svg';
import shadow from '@styles/shadows';
import colors from '@styles/colors';
import routes from '@components/routing/routesStrings';
import Header from '@components/ui/Header/Header';
import Subheader from '@components/ui/Subheader/Subheader';
import TextButton from '@components/ui/TextButton/TextButton';

const StyledStarterPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: ${colors.lightgray};
`;

const StarterImage = styled.img`
  width: 100%;
  margin-top: 10%;
`;

const SubheaderWrapper = styled.div`
  margin-top: 25px;
`;

const StarterInfoWrapper = styled.div`
  background-color: ${colors.white};
  border-top-left-radius: 90px;
  border-top-right-radius: 90px;
  padding: 125px ${GLOBAL_PADDING};
  box-shadow: ${shadow['shadow-1']};
`;

const TextButtonWrapper = styled.div`
  margin-top: 80px;
`;

const StarterPage: FC = () => (
  <StyledStarterPage>
    <StarterImage src={starterImage} alt="starter image" />

    <StarterInfoWrapper>
      <Header>Find a perfect job match</Header>
      <SubheaderWrapper>
        <Subheader>
          Finding your dream job is now much easier and faster like never before
        </Subheader>
      </SubheaderWrapper>
      <TextButtonWrapper>
        <Link to={routes.registration}>
          <TextButton
            name="let's get started"
            size={40}
            icon={<FiArrowRight />}
            fullWidth
          >
            Let's Get Started
          </TextButton>
        </Link>
      </TextButtonWrapper>
    </StarterInfoWrapper>
  </StyledStarterPage>
);

export default StarterPage;
