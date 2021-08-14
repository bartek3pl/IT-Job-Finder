import React, { FC } from 'react';
import styled from 'styled-components';

import color from '@styles/colors';
import { GLOBAL_PADDING } from '@utils/constants/constants';

interface BaseSideButtonProps {
  name?: string;
  handleClick?: () => void;
}

const StyledBaseSideButton = styled.button`
  display: block;
  position: absolute;
  top: ${GLOBAL_PADDING};
  left: ${GLOBAL_PADDING};
  border-radius: 23px;
  border: none;
  width: 85px;
  height: 85px;
  background-color: ${color.lightgray};
  z-index: 99;
  transition: transform 0.2s ease-out;

  &:active {
    transform: scale(0.9);
  }
`;

const BaseSideButton: FC<BaseSideButtonProps> = ({
  name,
  handleClick,
  children,
}) => {
  return (
    <StyledBaseSideButton name={name} onClick={handleClick}>
      {children}
    </StyledBaseSideButton>
  );
};

BaseSideButton.defaultProps = {
  name: '',
  handleClick: () => {},
};

export default BaseSideButton;
