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

interface TextFieldProps {
  name?: string;
  disabled?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  iconSize?: number;
  color?: string;
}

type StyledTextFieldProps = Pick<TextFieldProps, 'backgroundColor' | 'color'>;

const StyledTextField = styled.button<StyledTextFieldProps>``;

const TextField: FC<TextFieldProps> = ({
  name,
  disabled,
  onClick,
  backgroundColor,
  color,
  iconSize,
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

  const isAllowedKeyPressed = (pressedKey: string) => {
    const allowedKeys = ['Enter', 'Space'];
    return allowedKeys.includes(pressedKey);
  };

  const handleKeyDown = (event: { key: string }) => {
    console.log('dupa');
    const pressedKey = event.key;
    const allowedKeyPressed = isAllowedKeyPressed(pressedKey);
    if (allowedKeyPressed) {
      handleClick();
    }
  };

  return (
    <StyledTextField
      type="button"
      name={name}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-pressed={isButtonClicked}
      backgroundColor={backgroundColor}
      color={color}
    >
      {children}
    </StyledTextField>
  );
};

TextField.defaultProps = {
  name: '',
  disabled: false,
  onClick: () => {},
  backgroundColor: color.contrast,
  color: color.white,
  iconSize: BUTTON_ICON_SIZE,
};

export default TextField;
