import React, { FC } from 'react';
import styled from 'styled-components';

import colors from '@styles/colors';
import shadows from '@styles/shadows';
import { GLOBAL_PADDING } from '@utils/constants/constants';

interface ModalProps {
  show?: boolean;
}

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
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(100vh)')};
  transition: ${({ show }) =>
      show ? 'opacity 0.1s ease' : 'opacity 0.3s ease-in'},
    transform 0.3s ease;
`;

const Modal: FC<ModalProps> = ({ show, children }) => {
  return <StyledModal show={show}>{children}</StyledModal>;
};

Modal.defaultProps = {
  show: false,
};

export default Modal;
