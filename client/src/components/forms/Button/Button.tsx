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

interface ButtonProps {
  name?: string;
  disabled?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  iconSize?: number;
  color?: string;
  flat?: boolean;
}

type StyledButtonProps = Pick<
  ButtonProps,
  'backgroundColor' | 'color' | 'flat'
>;

const StyledButton = styled.button<StyledButtonProps>`
  display: block;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  width: 140px;
  height: 140px;
  border-radius: 24%;
  border: ${({ flat }) => (flat ? `2px ${color.lightgray} solid` : 'none')};
  padding: 10px;
  font-size: 20px;
  box-shadow: ${({ flat }) => (flat ? 'none' : shadow['shadow-2'])};
  transition: transform 0.2s ease-out;

  &:active {
    transform: scale(0.9);
  }
`;

const BUTTON_ICON_SIZE = 78;

const Button: FC<ButtonProps> = ({
  name,
  disabled,
  onClick,
  backgroundColor,
  color,
  iconSize,
  flat,
  children,
}) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    return () => {
      setIsButtonClicked(false);
    };
  }, []);

  const handleClick = () => {
    setIsButtonClicked(true);
    if (onClick) {
      onClick();
    }
  };

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { size: iconSize });
    }
    return child;
  });

  return (
    <StyledButton
      type="button"
      name={name}
      disabled={disabled}
      onClick={handleClick}
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
  disabled: false,
  onClick: () => {},
  backgroundColor: color.contrast,
  color: color.white,
  iconSize: BUTTON_ICON_SIZE,
  flat: false,
};

export default Button;
