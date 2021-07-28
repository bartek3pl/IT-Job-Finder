import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import styled from 'styled-components';

import color from '@styles/colors';
import { GLOBAL_PADDING } from '@utils/constants/constants';

const StyledBackButton = styled.button`
  display: block;
  position: absolute;
  top: ${GLOBAL_PADDING};
  left: ${GLOBAL_PADDING};
  border-radius: 23px;
  border: none;
  width: 90px;
  height: 90px;
  background-color: ${color.lightgray};
  z-index: 999;
  transition: transform 0.2s ease-out;

  &:active {
    transform: scale(0.9);
  }
`;

const BackButton: FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <StyledBackButton onClick={handleClick}>
      <FiArrowLeft size={60} color={color.primary} />
    </StyledBackButton>
  );
};

export default BackButton;
