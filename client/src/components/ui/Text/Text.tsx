import React, { FC } from 'react';
import styled from 'styled-components';

interface TextProps {
  size?: number;
  weight?: number;
}

type StyledText = Pick<TextProps, 'size' | 'weight'>;

const StyledText = styled.span<StyledText>`
  font-size: ${({ size }) => `${size}px`};
  font-weight: ${({ weight }) => weight};
`;

const Text: FC<TextProps> = ({ size, weight, children }) => {
  return (
    <StyledText size={size} weight={weight}>
      {children}
    </StyledText>
  );
};

Text.defaultProps = {
  size: 16,
  weight: 400,
};

export default Text;
