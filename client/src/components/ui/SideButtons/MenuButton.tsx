import React, { FC } from 'react';
import { CgMenuLeftAlt } from 'react-icons/cg';

import BaseSideButton from '@components/ui/SideButtons/BaseSideButton';
import color from '@styles/colors';

interface MenuButtonProps {
  handleClick?: () => void;
}

const MenuButton: FC<MenuButtonProps> = ({ handleClick }) => {
  return (
    <BaseSideButton name="menu" handleClick={handleClick}>
      <CgMenuLeftAlt size={60} color={color.primary} />
    </BaseSideButton>
  );
};

MenuButton.defaultProps = {
  handleClick: () => {},
};

export default MenuButton;
