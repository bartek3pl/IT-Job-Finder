import React, {
  FC,
  useState,
  useEffect,
  ReactElement,
  isValidElement,
  cloneElement,
} from 'react';
import styled from 'styled-components';

import { ICON_SIZE } from '@utils/constants/constants';
import colors from '@styles/colors';
import shadow from '@styles/shadows';
import Text from '@components/ui/Text/Text';

interface TextButtonProps {
  name?: string;
  disabled?: boolean;
  handleClick?: () => void;
  backgroundColor?: string;
  color?: string;
  size?: number;
  horizontalPadding?: number;
  verticalPadding?: number;
  fullWidth?: boolean;
  icon?: ReactElement;
  flat?: boolean;
}

type StyledTextButtonProps = Pick<
  TextButtonProps,
  | 'backgroundColor'
  | 'color'
  | 'horizontalPadding'
  | 'verticalPadding'
  | 'fullWidth'
  | 'disabled'
  | 'flat'
>;

const StyledTextButton = styled.button<StyledTextButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: 140px;
  border-radius: 45px;
  border: none;
  padding: ${({ verticalPadding, horizontalPadding }) =>
    `${verticalPadding}px ${horizontalPadding}px`};
  box-shadow: ${({ flat }) => (flat ? 'none' : shadow['shadow-2'])};
  opacity: ${({ disabled }) => (disabled ? '40%' : '100%')};
  transition: transform 0.2s ease-out;

  &:active {
    transform: ${({ disabled }) => (disabled ? '' : 'scale(0.95)')};
  }
`;

const TextButton: FC<TextButtonProps> = ({
  name,
  disabled,
  handleClick,
  backgroundColor,
  color,
  size,
  horizontalPadding,
  verticalPadding,
  fullWidth,
  icon,
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

  const getIconWithProps = () => {
    if (isValidElement(icon)) {
      return cloneElement(icon, {
        size: ICON_SIZE,
        color: colors.white,
      });
    }
    return icon;
  };

  const iconWithProps = getIconWithProps();

  return (
    <StyledTextButton
      type="button"
      name={name}
      disabled={disabled}
      onClick={handleClickAndSetButton}
      aria-pressed={isButtonClicked}
      backgroundColor={backgroundColor}
      color={color}
      horizontalPadding={horizontalPadding}
      verticalPadding={verticalPadding}
      fullWidth={fullWidth}
      flat={flat}
    >
      <Text size={size} color={color}>
        {children}
      </Text>
      {iconWithProps}
    </StyledTextButton>
  );
};

TextButton.defaultProps = {
  name: '',
  disabled: false,
  handleClick: () => {},
  backgroundColor: colors.contrast,
  color: colors.white,
  size: 40,
  horizontalPadding: 60,
  verticalPadding: 10,
  fullWidth: false,
  icon: undefined,
  flat: false,
};

export default TextButton;
