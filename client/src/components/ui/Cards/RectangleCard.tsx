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
import JobOfferFormattingService from '@services/jobOfferFormattingService';

interface RectangleCardProps {
  company?: string;
  jobTitle?: string;
  salary?: string;
  location?: string;
  logo?: string | null;
  jobOfferId?: string;
  updatedTime?: string;
  disabled?: boolean;
  handleClick?: () => void;
  backgroundColor?: string;
  color?: string;
  flat?: boolean;
  isFocused?: boolean;
}

type StyledRectangleCardProps = Pick<
  RectangleCardProps,
  'backgroundColor' | 'color' | 'flat' | 'disabled' | 'isFocused'
>;

const StyledRectangleCard = styled.button<StyledRectangleCardProps>`
  display: flex;
  justify-content: space-between;
  text-align: left;
  overflow-wrap: break-word;
  border: ${({ flat }) => (flat ? `2px ${color.lightgray} solid` : 'none')};
  box-shadow: ${({ flat }) => (flat ? 'none' : shadow['shadow-1'])};
  opacity: ${({ disabled }) => (disabled ? '40%' : '100%')};
  width: 100%;
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

const ImageAndMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

const MainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SalaryLocationWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const TimeAndHeartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const HeartWrapper = styled.a`
  border: none;
  background: transparent;
`;

const RectangleCard: FC<RectangleCardProps> = ({
  company,
  jobTitle,
  salary,
  location,
  logo,
  updatedTime,
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

  const getFormattedUpdatedTime = () => {
    const jobOfferFormattingService = new JobOfferFormattingService();
    const formattedTime = jobOfferFormattingService.formatTime(updatedTime);
    return formattedTime;
  };

  const formattedUpdatedTime = getFormattedUpdatedTime();

  return (
    <StyledRectangleCard
      disabled={disabled}
      onClick={handleClick}
      backgroundColor={backgroundColor}
      color={color}
      flat={flat}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <ImageAndMainInfoWrapper>
        <Image
          backgroundColor={colors.lightgray}
          color={color}
          width={120}
          height={120}
          image={logo}
          borderRadius={35}
          flat
        />
        <MainInfoWrapper>
          <Text
            size={30}
            weight={500}
            color={isFocused ? colors.neutral : colors.secondary}
          >
            {company}
          </Text>
          <Text
            size={35}
            weight={600}
            color={isFocused ? colors.lightgray : colors.primary}
          >
            {jobTitle}
          </Text>
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
        </MainInfoWrapper>
      </ImageAndMainInfoWrapper>

      <TimeAndHeartWrapper>
        <HeartWrapper onClick={toggleFavourite}>
          {isJobOfferUserFavourite ? (
            <AiFillHeart size={50} color={colors.contrast} />
          ) : (
            <AiOutlineHeart size={50} color={colors.contrast} />
          )}
        </HeartWrapper>
        <Text size={28} color={colors.secondary}>
          {formattedUpdatedTime}
        </Text>
      </TimeAndHeartWrapper>
    </StyledRectangleCard>
  );
};

RectangleCard.defaultProps = {
  company: '',
  jobTitle: '',
  salary: '',
  location: '',
  logo: '',
  jobOfferId: '',
  updatedTime: '',
  disabled: false,
  handleClick: () => {},
  backgroundColor: color.white,
  color: color.primary,
  flat: false,
};

export default RectangleCard;
