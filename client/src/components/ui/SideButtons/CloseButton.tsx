import React, { FC } from 'react';
import { CgMenuLeftAlt } from 'react-icons/cg';
import { MdClose } from 'react-icons/md';

import BaseSideButton from '@components/ui/SideButtons/BaseSideButton';
import color from '@styles/colors';

interface CloseButtonProps {
  handleClick?: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({ handleClick }) => {
  return (
    <BaseSideButton handleClick={handleClick}>
      <MdClose size={60} color={color.primary} />
    </BaseSideButton>
  );
};

export default CloseButton;
