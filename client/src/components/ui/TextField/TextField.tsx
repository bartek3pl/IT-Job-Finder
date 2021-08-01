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
  error?: string;
  handleChange?: (event: FormEvent<HTMLInputElement>) => void;
}

type StyledTextFieldProps = Pick<TextFieldProps, 'disabled' | 'error'>;

const StyledButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const StyledTextField = styled.input<StyledTextFieldProps>`
  display: inline-block;
  width: 100%;
  height: 140px;
  padding: 21px 60px;
  border: ${({ error }) => (error ? '2px red solid' : 'none')};
  border-radius: 45px;
  background-color: ${color.lightgray};
  font-size: 35px;
  color: ${({ error }) => (error ? color.error : color.primary)};
  opacity: ${({ disabled }) => (disabled ? '40%' : '100%')};

  &::placeholder {
    color: ${({ error }) => (error ? color.error : color.inputPlaceholder)};
    font-size: 36px;
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  top: 42px;
  right: 54px;
`;

const ErrorMessage = styled.p`
  color: ${color.error};
  font-size: 30px;
  padding-left: 60px;
`;

const TextField: FC<TextFieldProps> = ({
  type,
  alt,
  disabled,
  placeholder,
  value,
  icon,
  name,
  error,
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
        color: error ? color.error : color.inputPlaceholder,
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
        error={error}
        onChange={handleChange}
      />
      {renderIconComponent()}
      <ErrorMessage>{error}</ErrorMessage>
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
  error: '',
  handleChange: () => {},
};

export default TextField;