import React, { FC } from 'react';
import { CgMenuLeftAlt } from 'react-icons/cg';

import BaseSideButton from '@components/ui/SideButtons/BaseSideButton';
import color from '@styles/colors';

const MenuButton: FC = () => {
  const handleClick = () => {
    // showMenu
  };

  return (
    <BaseSideButton handleClick={handleClick}>
      <CgMenuLeftAlt size={60} color={color.primary} />
    </BaseSideButton>
  );
};

export default MenuButton;
