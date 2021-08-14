import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';

import color from '@styles/colors';
import shadow from '@styles/shadows';
import Image from '@components/ui/Image/Image';
import Text from '@components/ui/Text/Text';
import colors from '@styles/colors';

interface ListElementProps {
  name?: string;
  jobTitle?: string;
  salary?: string;
  details?: string;
  logo?: string;
  disabled?: boolean;
  handleClick?: () => void;
  backgroundColor?: string;
  iconSize?: number;
  color?: string;
  horizontalPadding?: number;
  verticalPadding?: number;
  flat?: boolean;
  isFocused?: boolean;
}

type StyledListElementProps = Pick<
  ListElementProps,
  'backgroundColor' | 'color' | 'flat' | 'disabled' | 'isFocused'
>;

const StyledListElement = styled.button<StyledListElementProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  gap: 10px;
  border: ${({ flat }) => (flat ? `2px ${color.lightgray} solid` : 'none')};
  box-shadow: ${({ flat }) => (flat ? 'none' : shadow['shadow-1'])};
  opacity: ${({ disabled }) => (disabled ? '40%' : '100%')};
  width: 100%;
  min-height: 200px;
  border-radius: 55px;
  padding: 50px 60px;
  transition: transform 0.2s ease-out, background-color 0.2s ease,
    box-shadow 0.2s ease;
  transform: ${({ disabled, isFocused }) =>
    disabled || !isFocused ? '' : 'scale(0.97)'};
  background-color: ${({ backgroundColor, isFocused }) =>
    isFocused ? colors.primary : backgroundColor};
  box-shadow: ${({ flat, isFocused }) =>
    flat || isFocused ? 'none' : shadow['shadow-1']};
  color: ${({ color, isFocused }) => (isFocused ? colors.white : color)};
`;

const LogoJobWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
`;

const JobTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SalaryWrapper = styled.div`
  flex-basis: 30%;
`;

const ListElement: FC<ListElementProps> = ({
  name,
  jobTitle,
  salary,
  details,
  logo,
  backgroundColor,
  color,
  flat,
  disabled,
  handleClick,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    return () => {
      setIsFocused(false);
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <StyledListElement
      name={name}
      disabled={disabled}
      onClick={handleClick}
      backgroundColor={backgroundColor}
      color={color}
      flat={flat}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <LogoJobWrapper>
        <Image
          backgroundColor={colors.lightgray}
          color={color}
          width={100}
          height={100}
          image={logo}
          borderRadius={30}
          flat
        />
        <JobTitleWrapper>
          <Text
            size={34}
            weight={600}
            color={isFocused ? colors.lightgray : colors.primary}
          >
            {jobTitle}
          </Text>
          <Text
            size={28}
            weight={500}
            color={isFocused ? colors.lightgray : colors.secondary}
          >
            {details}
          </Text>
        </JobTitleWrapper>
      </LogoJobWrapper>
      <SalaryWrapper>
        {salary ? (
          <Text
            size={30}
            weight={600}
            color={isFocused ? colors.lightgray : colors.primary}
          >
            {salary}
          </Text>
        ) : null}
      </SalaryWrapper>
    </StyledListElement>
  );
};

ListElement.defaultProps = {
  name: '',
  jobTitle: '',
  details: '',
  logo: '',
  disabled: false,
  handleClick: () => {},
  backgroundColor: color.white,
  color: color.primary,
  flat: false,
};

export default ListElement;
