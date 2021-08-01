import colors from '@styles/colors';
import React, { FC } from 'react';
import styled from 'styled-components';

interface TextProps {
  size?: number;
  weight?: number;
  color?: string;
}

type StyledText = Pick<TextProps, 'size' | 'weight' | 'color'>;

const StyledText = styled.span<StyledText>`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-wrap: break-word;
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
`;

const Text: FC<TextProps> = ({ size, weight, color, children }) => {
  return (
    <StyledText size={size} weight={weight} color={color}>
      {children}
    </StyledText>
  );
};

Text.defaultProps = {
  size: 16,
  weight: 400,
  color: colors.primary,
};

export default Text;
