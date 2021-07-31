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
  iconSize?: number;
  color?: string;
  horizontalPadding?: number;
  verticalPadding?: number;
  flat?: boolean;
}

type StyledButtonProps = Pick<
  ButtonProps,
  'backgroundColor' | 'color' | 'flat' | 'disabled'
>;

const StyledButton = styled.button<StyledButtonProps>`
  display: block;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  width: 140px;
  height: 140px;
  border-radius: 45px;
  border: ${({ flat }) => (flat ? `2px ${color.lightgray} solid` : 'none')};
  padding: 10px;
  font-size: 20px;
  box-shadow: ${({ flat }) => (flat ? 'none' : shadow['shadow-2'])};
  opacity: ${({ disabled }) => (disabled ? '40%' : '100%')};
  transition: transform 0.2s ease-out;

  &:active {
    transform: ${({ disabled }) => (disabled ? '' : 'scale(0.9)')};
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
};

export default Button;
