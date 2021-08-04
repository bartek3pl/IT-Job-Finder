import React, { FC } from 'react';
import styled from 'styled-components';

import colors from '@styles/colors';
import shadows from '@styles/shadows';
import { GLOBAL_PADDING } from '@utils/constants/constants';

interface ModalProps {
  show?: boolean;
}

const StyledModal = styled.div`
  position: fixed;
  width: 100%;
  height: calc(100vh - 200px);
  margin-top: 200px;
  padding: ${GLOBAL_PADDING};
  border-top-left-radius: 70px;
  border-top-right-radius: 70px;
  background: ${colors.neutral};
  color: ${colors.primary};
  box-shadow: ${shadows['shadow-1']};
  z-index: 999;
`;

const Modal: FC<ModalProps> = ({ show, children }) => {
  return <>{show ? <StyledModal>{children}</StyledModal> : null}</>;
};

Modal.defaultProps = {
  show: false,
};

export default Modal;
