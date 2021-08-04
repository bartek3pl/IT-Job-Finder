import React, { FC } from 'react';
import { FiSliders } from 'react-icons/fi';

import BaseButton from '@components/ui/Buttons/BaseButton';

interface SliderButtonProps {
  handleClick?: () => void;
}

const SliderButton: FC<SliderButtonProps> = ({ handleClick }) => (
  <BaseButton flat width={160} handleClick={handleClick}>
    <FiSliders />
  </BaseButton>
);

SliderButton.defaultProps = {
  handleClick: () => {},
};

export default SliderButton;
