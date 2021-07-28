import React, {
  FC,
  ReactElement,
  cloneElement,
  isValidElement,
  useState,
  FormEvent,
} from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import color from '@styles/colors';
import { ICON_SIZE } from '@utils/constants/constants';

interface TextFieldProps {
  type?: string;
  alt?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  icon?: ReactElement;
  name?: string;
  handleChange?: (event: FormEvent<HTMLInputElement>) => void;
}

const StyledButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const StyledTextField = styled.input<TextFieldProps>`
  display: inline-block;
  width: 100%;
  height: 140px;
  padding: 21px 60px;
  border: none;
  border-radius: 45px;
  background-color: ${color.lightgray};
  font-size: 35px;
  color: ${color.primary};

  &::placeholder {
    color: ${color.inputPlaceholder};
    font-size: 36px;
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  top: 42px;
  right: 54px;
`;

const TextField: FC<TextFieldProps> = ({
  type,
  alt,
  disabled,
  placeholder,
  value,
  icon,
  name,
  handleChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [textFieldType, setTextFieldType] = useState(type);

  const togglePasswordVisibility = () => {
    if (type === 'password') {
      setIsPasswordVisible(!isPasswordVisible);
      setTextFieldType(textFieldType === 'password' ? 'text' : 'password');
    }
  };

  const getIconWithProps = (pureIcon?: ReactElement) => {
    if (isValidElement(pureIcon)) {
      return cloneElement(pureIcon, {
        size: ICON_SIZE,
        color: color.inputPlaceholder,
      });
    }
    return pureIcon;
  };

  const getPasswordIcon = () => {
    if (isPasswordVisible) {
      return <FiEye />;
    }
    return <FiEyeOff />;
  };

  const selectIcon = () => {
    let iconWithProps = getIconWithProps(icon);
    if (type === 'password') {
      const passwordIcon = getPasswordIcon();
      iconWithProps = getIconWithProps(passwordIcon);
    }
    return iconWithProps;
  };

  const renderIconComponent = () => {
    const selectedIcon = selectIcon();
    return (
      <IconWrapper onClick={togglePasswordVisibility}>
        {selectedIcon}
      </IconWrapper>
    );
  };

  return (
    <StyledButtonWrapper>
      <StyledTextField
        type={textFieldType}
        alt={alt}
        autoComplete="on"
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        name={name}
        aria-label={name}
        onChange={handleChange}
      />
      {renderIconComponent()}
    </StyledButtonWrapper>
  );
};

TextField.defaultProps = {
  type: 'text',
  alt: '',
  disabled: false,
  placeholder: '',
  value: '',
  icon: undefined,
  name: '',
  handleChange: () => {},
};

export default TextField;
