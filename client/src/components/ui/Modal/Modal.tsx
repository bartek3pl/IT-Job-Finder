import React, { FC } from 'react';
import styled from 'styled-components';

import colors from '@styles/colors';
import shadows from '@styles/shadows';
import { GLOBAL_PADDING } from '@utils/constants/constants';

type AppearFrom = 'bottom' | 'top' | 'right' | 'left';

interface ModalProps {
  show?: boolean;
  appearFrom?: AppearFrom;
}

const getShowDirection = (show?: boolean, appearFrom?: AppearFrom) => {
  switch (appearFrom) {
    case 'bottom':
      return show ? 'translateY(0)' : 'translateY(100vh)';
    case 'top':
      return show ? 'translateY(0)' : 'translateY(-100vh)';
    case 'right':
      return show ? 'translateX(0)' : 'translateX(100vh)';
    case 'left':
      return show ? 'translateX(0)' : 'translateX(-100vw)';
    default:
      return show ? 'translateY(0)' : 'translateY(100vh)';
  }
};

const StyledModal = styled.div<ModalProps>`
  position: fixed;
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
  padding: ${GLOBAL_PADDING};
  background: ${colors.white};
  color: ${colors.primary};
  box-shadow: ${shadows['shadow-1']};
  z-index: 999;
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
  opacity: ${({ show }) => (show ? '100%' : '0%')};
  transform: ${({ show, appearFrom }) => getShowDirection(show, appearFrom)};
  transition: ${({ show }) =>
      show ? 'opacity 0.1s ease' : 'opacity 0.3s ease-in'},
    transform 0.3s ease;
`;

const Modal: FC<ModalProps> = ({ show, appearFrom, children }) => {
  return (
    <StyledModal show={show} appearFrom={appearFrom}>
      {children}
    </StyledModal>
  );
};

Modal.defaultProps = {
  show: false,
  appearFrom: 'bottom',
};

export default Modal;
