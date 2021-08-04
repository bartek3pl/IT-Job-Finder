import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import {
  ADD_JOB_OFFER_TO_USER_FAVOURITE,
  DELETE_JOB_OFFER_FROM_USER_FAVOURITE,
  CHECK_JOB_OFFER_USER_FAVOURITE,
} from '@api/jobOffers/mutations';
import color from '@styles/colors';
import shadow from '@styles/shadows';
import Image from '@components/ui/Image/Image';
import Text from '@components/ui/Text/Text';
import colors from '@styles/colors';
import AuthenticationService from '@services/authenticationService';

interface SquareCardProps {
  company: string;
  jobTitle: string;
  salary?: string;
  location?: string;
  logo?: string | null;
  jobOfferId?: string;
  disabled?: boolean;
  handleClick?: () => void;
  backgroundColor?: string;
  color?: string;
  flat?: boolean;
  isFocused?: boolean;
}

type StyledSquareCardProps = Pick<
  SquareCardProps,
  'backgroundColor' | 'color' | 'flat' | 'disabled' | 'isFocused'
>;

const StyledSquareCard = styled.button<StyledSquareCardProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow-wrap: break-word;
  border: ${({ flat }) => (flat ? `2px ${color.lightgray} solid` : 'none')};
  box-shadow: ${({ flat }) => (flat ? 'none' : shadow['shadow-1'])};
  opacity: ${({ disabled }) => (disabled ? '40%' : '100%')};
  width: 556px;
  min-height: 434px;
  border-radius: 60px;
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

const HeartWrapper = styled.a`
  position: absolute;
  top: 50px;
  right: 60px;
  border: none;
  background: transparent;
`;

const CompanyWrapper = styled.div`
  margin-top: 25px;
`;

const JobWrapper = styled.div`
  margin-top: 20px;
`;

const SalaryLocationWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 5px;
`;

const SquareCard: FC<SquareCardProps> = ({
  company,
  jobTitle,
  salary,
  location,
  logo,
  jobOfferId,
  backgroundColor,
  color,
  flat,
  disabled,
  handleClick,
}) => {
  const [isJobOfferUserFavourite, setIsJobOfferUserFavourite] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [checkJobUserFavourite] = useMutation(CHECK_JOB_OFFER_USER_FAVOURITE);
  const [addJobToUserFavourite] = useMutation(ADD_JOB_OFFER_TO_USER_FAVOURITE);
  const [deleteJobFromUserFavourite] = useMutation(
    DELETE_JOB_OFFER_FROM_USER_FAVOURITE
  );

  useEffect(() => {
    checkJobFavourite();
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getUserId = () => {
    const authenticationService = new AuthenticationService();
    const user = authenticationService.getUser();
    const userId = user?._id;
    return userId;
  };

  const checkJobFavourite = async () => {
    const userId = getUserId();
    try {
      const { data } = await checkJobUserFavourite({
        variables: { userId, jobOfferId },
      });
      const isJobOfferFavourite =
        !!data?.checkJobOfferUserFavourite?.isFavourite;
      if (isJobOfferFavourite) {
        setIsJobOfferUserFavourite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addJobToFavourite = async () => {
    const userId = getUserId();
    try {
      const { data } = await addJobToUserFavourite({
        variables: { userId, jobOfferId },
      });
      const isSuccess = !!data?.addJobOfferToUserFavourite?.success;
      if (isSuccess) {
        setIsJobOfferUserFavourite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteJobFromFavourite = async () => {
    const userId = getUserId();
    try {
      const { data } = await deleteJobFromUserFavourite({
        variables: { userId, jobOfferId },
      });
      const isSuccess = !!data?.deleteJobOfferFromUserFavourite?.success;
      if (isSuccess) {
        setIsJobOfferUserFavourite(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavourite = () => {
    setIsFocused(false);

    if (!isJobOfferUserFavourite) {
      addJobToFavourite();
    } else {
      deleteJobFromFavourite();
    }
  };

  return (
    <StyledSquareCard
      disabled={disabled}
      onClick={handleClick}
      backgroundColor={backgroundColor}
      color={color}
      flat={flat}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <HeartWrapper onClick={toggleFavourite}>
        {isJobOfferUserFavourite ? (
          <AiFillHeart size={50} color={colors.contrast} />
        ) : (
          <AiOutlineHeart size={50} color={colors.contrast} />
        )}
      </HeartWrapper>
      <Image
        backgroundColor={colors.lightgray}
        color={color}
        width={120}
        height={120}
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
    </StyledSquareCard>
  );
};

SquareCard.defaultProps = {
  company: '',
  jobTitle: '',
  salary: '',
  location: '',
  logo: '',
  jobOfferId: '',
  disabled: false,
  handleClick: () => {},
  backgroundColor: color.white,
  color: color.primary,
  flat: false,
};

export default SquareCard;
