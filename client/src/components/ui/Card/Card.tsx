import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';

import color from '@styles/colors';
import shadow from '@styles/shadows';
import Button from '@components/ui/Button/Button';
import Text from '@components/ui/Text/Text';
import colors from '@styles/colors';

interface CardProps {
  company: string;
  jobTitle: string;
  salary?: string;
  location?: string;
  logo?: string;
  disabled?: boolean;
  handleClick?: () => void;
  backgroundColor?: string;
  color?: string;
  flat?: boolean;
  isFocused?: boolean;
}

type StyledCardProps = Pick<
  CardProps,
  'backgroundColor' | 'color' | 'flat' | 'disabled' | 'isFocused'
>;

const StyledCard = styled.button<StyledCardProps>`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow-wrap: break-word;
  border: ${({ flat }) => (flat ? `2px ${color.lightgray} solid` : 'none')};
  box-shadow: ${({ flat }) => (flat ? 'none' : shadow['shadow-1'])};
  opacity: ${({ disabled }) => (disabled ? '40%' : '100%')};
  width: 556px;
  min-height: 395px;
  border-radius: 45px;
  padding: 50px 60px;
  font-size: 20px;
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

const CompanyWrapper = styled.div`
  margin-top: 25px;
`;

const JobWrapper = styled.div`
  margin-top: 15px;
`;

const SalaryLocationWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 5px;
`;

const Card: FC<CardProps> = ({
  company,
  jobTitle,
  salary,
  location,
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
    <StyledCard
      disabled={disabled}
      onClick={handleClick}
      backgroundColor={backgroundColor}
      color={color}
      flat={flat}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Button
        backgroundColor={colors.lightgray}
        color={color}
        width={120}
        height={120}
        clickable={false}
        image={logo}
        borderRadius={35}
        flat
      />
      <CompanyWrapper>
        <Text
          size={30}
          weight={500}
          color={isFocused ? colors.neutral : colors.secondary}
        >
          {company}
        </Text>
      </CompanyWrapper>
      <JobWrapper>
        <Text
          size={40}
          weight={600}
          color={isFocused ? colors.lightgray : colors.primary}
        >
          {jobTitle}
        </Text>
      </JobWrapper>
      <SalaryLocationWrapper>
        {salary ? (
          <Text
            size={30}
            weight={600}
            color={isFocused ? colors.lightgray : colors.primary}
          >
            {salary} {location ? '-' : ''}
          </Text>
        ) : null}

        {location ? (
          <Text
            size={28}
            weight={400}
            color={isFocused ? colors.neutral : colors.secondary}
          >
            {location}
          </Text>
        ) : null}
      </SalaryLocationWrapper>
    </StyledCard>
  );
};

Card.defaultProps = {
  company: '',
  jobTitle: '',
  salary: '',
  location: '',
  logo: '',
  disabled: false,
  handleClick: () => {},
  backgroundColor: color.contrast,
  color: color.white,
  flat: false,
};

export default Card;
