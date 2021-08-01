import React, { FC } from 'react';
import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';

import color from '@styles/colors';
import { GLOBAL_PADDING } from '@utils/constants/constants';

interface AvatarButtonProps {
  avatar?: string;
  handleClick?: () => void;
}

type StyledAvatarButtonProps = Pick<AvatarButtonProps, 'avatar'>;

const StyledAvatarButton = styled.button<StyledAvatarButtonProps>`
  display: block;
  position: absolute;
  top: ${GLOBAL_PADDING};
  right: ${GLOBAL_PADDING};
  border-radius: 23px;
  border: none;
  width: 100px;
  height: 100px;
  background-color: ${color.lightgray};
  background-image: ${({ avatar }) => `url(${avatar})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 999;
  transition: transform 0.2s ease-out;

  &:active {
    transform: scale(0.9);
  }
`;

const AvatarButton: FC<AvatarButtonProps> = ({ avatar, handleClick }) => {
  return (
    <StyledAvatarButton onClick={handleClick} avatar={avatar}>
      {avatar ? null : <FiUser size={60} />}
    </StyledAvatarButton>
  );
};

AvatarButton.defaultProps = {
  avatar: '',
  handleClick: () => {},
};

export default AvatarButton;
