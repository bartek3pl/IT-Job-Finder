import React, { FC } from 'react';
import { MdArrowForward, MdPersonOutline } from 'react-icons/md';
import styled from 'styled-components';

import color from '@styles/colors';
import { GLOBAL_PADDING } from '@utils/constants/constants';
import Button from '@components/forms/Button/Button';
import TextField from '@components/forms/TextField/TextField';
import Header from '@components/ui/Header/Header';
import Subheader from '@components/ui/Subheader/Subheader';
import BackButton from '@components/ui/BackButton/BackButton';

const StyledApp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: ${color.primary};
  padding: ${GLOBAL_PADDING};
`;

const App: FC = () => {
  return (
    <StyledApp>
      <BackButton />
      <Button>
        <MdArrowForward />
      </Button>
      <TextField
        placeholder="Full Name"
        value="ogryzek"
        icon={<MdPersonOutline />}
      />
      <TextField
        placeholder="Password"
        value="moje super haslo"
        type="password"
      />
      <Header>Register Account</Header>
      <Subheader>Fill your details or continue with social media</Subheader>
    </StyledApp>
  );
};

export default App;
