import React, { FC } from 'react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';

import starterImage from '@assets/starter.svg';
import { GLOBAL_PADDING } from '@utils/constants/constants';
import colors from '@styles/colors';
import Header from '@components/ui/Header/Header';
import Subheader from '@components/ui/Subheader/Subheader';
import TextButton from '@components/ui/TextButton/TextButton';

const StyledStarterPage = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${colors.lightgray};
`;

const StarterInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  background-color: ${colors.white};
  border-top-left-radius: 90px;
  border-top-right-radius: 90px;
  padding: 125px ${GLOBAL_PADDING};
  gap: 30px;
`;

const TextButtonWrapper = styled.div`
  margin-top: 65px;
`;

const StarterPage: FC = () => (
  <StyledStarterPage>
    <img src={starterImage} alt="starter image" />

    <StarterInfoWrapper>
      <Header>Find a perfect job match</Header>
      <Subheader>
        Finding your dream job is now much easier and faster like never before
      </Subheader>
      <TextButtonWrapper>
        <TextButton
          name="let's get started"
          size={40}
          icon={<FiArrowRight />}
          fullWidth
        >
          Let's Get Started
        </TextButton>
      </TextButtonWrapper>
    </StarterInfoWrapper>
  </StyledStarterPage>
);

export default StarterPage;
