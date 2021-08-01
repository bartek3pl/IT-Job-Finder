import React, {
  FC,
  useState,
  useEffect,
  cloneElement,
  Children,
  isValidElement,
} from 'react';
import styled from 'styled-components';

import color from '@styles/colors';
import shadow from '@styles/shadows';
import { ICON_SIZE } from '@utils/constants/constants';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  name?: string;
  type?: ButtonType;
  disabled?: boolean;
  handleClick?: () => void;
  backgroundColor?: string;
  image?: string | null;
  iconSize?: number;
  color?: string;
  horizontalPadding?: number;
  verticalPadding?: number;
  flat?: boolean;
  width?: number;
  height?: number;
  clickable?: boolean;
  borderRadius?: number;
}

type StyledButtonProps = Pick<
  ButtonProps,
  | 'backgroundColor'
  | 'image'
  | 'color'
  | 'flat'
  | 'disabled'
  | 'width'
  | 'height'
  | 'clickable'
  | 'borderRadius'
>;

const StyledButton = styled.button<StyledButtonProps>`
  display: block;
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: ${({ color }) => color};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  box-shadow: ${({ flat }) => (flat ? 'none' : shadow['shadow-2'])};
  opacity: ${({ disabled }) => (disabled ? '40%' : '100%')};
  border: ${({ flat }) => (flat ? `2px ${color.lightgray} solid` : 'none')};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  padding: 10px;
  font-size: 20px;
  transition: transform 0.2s ease-out;

  &:active {
    transform: ${({ clickable, disabled }) =>
      disabled || !clickable ? '' : 'scale(0.9)'};
  }
`;

const Button: FC<ButtonProps> = ({
  name,
  type,
  disabled,
  handleClick,
  backgroundColor,
  color,
  flat,
  width,
  height,
  clickable,
  image,
  borderRadius,
  children,
}) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(
    () => () => {
      setIsButtonClicked(false);
    },
    []
  );

  const handleClickAndSetButton = () => {
    setIsButtonClicked(true);
    if (handleClick) {
      handleClick();
    }
  };

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { size: ICON_SIZE });
    }
    return child;
  });

  return (
    <StyledButton
      type={type}
      name={name}
      disabled={disabled}
      onClick={handleClickAndSetButton}
      aria-pressed={isButtonClicked}
      backgroundColor={backgroundColor}
      color={color}
      flat={flat}
      width={width}
      height={height}
      clickable={clickable}
      image={image}
      borderRadius={borderRadius}
    >
      {childrenWithProps}
    </StyledButton>
  );
};

Button.defaultProps = {
  name: '',
  type: 'button',
  disabled: false,
  handleClick: () => {},
  backgroundColor: color.contrast,
  color: color.white,
  flat: false,
  width: 140,
  height: 140,
  clickable: true,
  image: '',
  borderRadius: 45,
};

export default Button;
