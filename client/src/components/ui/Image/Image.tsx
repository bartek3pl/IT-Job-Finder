import React, { FC, cloneElement, Children, isValidElement } from 'react';
import styled from 'styled-components';

import color from '@styles/colors';
import shadow from '@styles/shadows';
import { ICON_SIZE } from '@utils/constants/constants';

interface ImageProps {
  name?: string;
  backgroundColor?: string;
  image?: string | null;
  iconSize?: number;
  color?: string;
  horizontalPadding?: number;
  verticalPadding?: number;
  flat?: boolean;
  width?: number;
  height?: number;
  borderRadius?: number;
}

type StyledImageProps = Pick<
  ImageProps,
  | 'backgroundColor'
  | 'image'
  | 'color'
  | 'flat'
  | 'width'
  | 'height'
  | 'borderRadius'
>;

const StyledImage = styled.div<StyledImageProps>`
  display: block;
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-image: ${({ image }) => `url(${image})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  color: ${({ color }) => color};
  min-width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  box-shadow: ${({ flat }) => (flat ? 'none' : shadow['shadow-2'])};
  border: ${({ flat }) => (flat ? `2px ${color.lightgray} solid` : 'none')};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  padding: 10px;
  font-size: 20px;
`;

const Image: FC<ImageProps> = ({
  name,
  backgroundColor,
  color,
  flat,
  width,
  height,
  image,
  borderRadius,
  children,
}) => {
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { size: ICON_SIZE });
    }
    return child;
  });

  return (
    <StyledImage
      backgroundColor={backgroundColor}
      color={color}
      flat={flat}
      width={width}
      height={height}
      image={image}
      borderRadius={borderRadius}
      aria-label={name}
    >
      {childrenWithProps}
    </StyledImage>
  );
};

Image.defaultProps = {
  name: '',
  backgroundColor: color.contrast,
  color: color.white,
  flat: false,
  width: 140,
  height: 140,
  image: '',
  borderRadius: 45,
};

export default Image;
