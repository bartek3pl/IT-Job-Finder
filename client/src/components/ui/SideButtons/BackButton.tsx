import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import BaseSideButton from '@components/ui/SideButtons/BaseSideButton';
import color from '@styles/colors';

const BackButton: FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <BaseSideButton handleClick={handleClick}>
      <FiArrowLeft size={60} color={color.primary} />
    </BaseSideButton>
  );
};

export default BackButton;
