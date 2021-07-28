import React, { FC } from 'react';
import styled from 'styled-components';

import color from '@styles/colors';
import RegistrationPage from '@views/Registration/RegistrationPage/RegistrationPage';
import StarterPage from '@views/Starter/StarterPage';

const StyledApp = styled.div`
  height: 100%;
  width: 100%;
  color: ${color.primary};
`;

const App: FC = () => (
    <StyledApp>
      <StarterPage />
    </StyledApp>
  );

export default App;
