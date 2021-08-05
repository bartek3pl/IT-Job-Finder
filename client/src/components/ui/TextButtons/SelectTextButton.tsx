import React, { FC, useState } from 'react';
import styled from 'styled-components';

import colors from '@styles/colors';
import Text from '@components/ui/Text/Text';

interface SelectTextButtonProps {
  name?: string;
  disabled?: boolean;
  size?: number;
  horizontalPadding?: number;
  verticalPadding?: number;
  checked?: boolean;
  borderRadius?: number;
  border?: boolean;
  handleClick?: Function;
}

type StyledSelectTextButtonProps = Pick<
  SelectTextButtonProps,
  | 'horizontalPadding'
  | 'verticalPadding'
  | 'disabled'
  | 'checked'
  | 'borderRadius'
  | 'border'
>;

const StyledSelectTextButton = styled.button<StyledSelectTextButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  border: ${({ border }) => (border ? `2px ${colors.neutral} solid` : 'none')};
  background-color: ${({ checked }) =>
    checked ? colors.primary : colors.lightgray};
  padding: ${({ verticalPadding, horizontalPadding }) =>
    `${verticalPadding}px ${horizontalPadding}px`};
  opacity: ${({ disabled }) => (disabled ? '40%' : '100%')};
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
`;

const SelectTextButton: FC<SelectTextButtonProps> = ({
  name,
  disabled,
  size,
  horizontalPadding,
  verticalPadding,
  checked,
  borderRadius,
  border,
  handleClick,
  children,
}) => {
  const [isButtonClicked, setIsButtonClicked] = useState(checked);

  const handleClickAndSetButton = () => {
    setIsButtonClicked(true);
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <StyledSelectTextButton
      type="button"
      name={name}
      disabled={disabled}
      horizontalPadding={horizontalPadding}
      verticalPadding={verticalPadding}
      checked={checked}
      borderRadius={borderRadius}
      border={border}
      onClick={handleClickAndSetButton}
      aria-pressed={isButtonClicked}
    >
      <Text size={size} color={checked ? colors.neutral : colors.secondary}>
        {children}
      </Text>
    </StyledSelectTextButton>
  );
};

SelectTextButton.defaultProps = {
  name: '',
  disabled: false,
  size: 40,
  horizontalPadding: 60,
  verticalPadding: 10,
  checked: false,
  borderRadius: 45,
  border: false,
  handleClick: () => {},
};

export default SelectTextButton;
