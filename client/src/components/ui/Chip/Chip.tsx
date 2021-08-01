import colors from '@styles/colors';
import React, { FC } from 'react';
import styled from 'styled-components';

import Text from '@components/ui/Text/Text';

interface ChipProps {
  size?: number;
}

const StyledChip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 50px;
  border: 2px solid ${colors.neutral};
  border-radius: 45px;
`;

const Chip: FC<ChipProps> = ({ size, children }) => {
  return (
    <StyledChip>
      <Text size={size} color={colors.secondary}>
        {children}
      </Text>
    </StyledChip>
  );
};

Chip.defaultProps = {
  size: 30,
};

export default Chip;
