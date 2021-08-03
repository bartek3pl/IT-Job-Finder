import React from 'react';
import { FiSliders } from 'react-icons/fi';

import BaseButton from '@components/ui/Buttons/BaseButton';

const SliderButton = () => (
  <BaseButton flat width={160}>
    <FiSliders />
  </BaseButton>
);

export default SliderButton;
