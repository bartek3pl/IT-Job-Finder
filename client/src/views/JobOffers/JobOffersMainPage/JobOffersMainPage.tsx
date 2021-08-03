import React, { FC, FormEvent, useState } from 'react';

import { useQuery } from '@apollo/client';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

import avatar from '@assets/images/avatar.jpg';
import { GLOBAL_PADDING } from '@utils/constants/constants';
import { GET_ALL_JOB_OFFERS } from '@api/jobOffers/queries';
import { JobOffer } from '@typings/graphql';
import AuthenticationService from '@services/authenticationService';
import JobOfferFormattingService from '@services/jobOfferFormattingService';
import colors from '@styles/colors';
import routes from '@components/routing/routesStrings';
import Header from '@components/ui/Header/Header';
import Subheader from '@components/ui/Subheader/Subheader';
import AvatarButton from '@components/ui/SideButtons/AvatarButton';
import MenuButton from '@components/ui/SideButtons/MenuButton';
import Chip from '@components/ui/Chip/Chip';
import TextField from '@components/ui/TextField/TextField';
import SliderButton from '@components/ui/Buttons/SliderButton';
import SquareCard from '@components/ui/Cards/SquareCard';
import ListElement from '@components/ui/ListElement/ListElement';
import Carousel from '@components/ui/Carousel/Carousel';
import Spinner from '@components/ui/Spinner/Spinner';
import Section from '@components/layout/Section/Section';

const StyledJobOffersPage = styled.div`
  padding: ${GLOBAL_PADDING};
  padding-top: 210px;
  padding-bottom: 96px;
  background-color: ${colors.lightBackground};
  min-height: 100%;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 60px;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
`;

const CardWrapper = styled.div`
  margin-top: 30px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
`;

const chips = [
  <Chip size={30} key="3a">
    Product
  </Chip>,
  <Chip size={30} key="3b">
    Design
  </Chip>,
  <Chip size={30} key="3c">
    Development
  </Chip>,
];

const jobOfferFormattingService = new JobOfferFormattingService();

const JobOffersPage: FC = () => {
  const history = useHistory();

  const [searchText, setSearchText] = useState('');

  const { data, loading, error } = useQuery(GET_ALL_JOB_OFFERS);

  const handleSearchText = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  const handleShowAllJobs = () => {
    history.push(routes.jobOffersSearch);
  };

  const getAllJobOffers = () => {
    if (data && !loading && !error) {
      const { getAllJobOffers } = data;
      if (getAllJobOffers?.success) {
        return getAllJobOffers?.results?.jobOffers;
      } else {
        return [];
      }
    }
  };

  const createJobOffersSquareCards = () => {
    const allJobOffers = getAllJobOffers();

    if (allJobOffers?.length) {
      return allJobOffers.map((jobOffer: JobOffer) => {
        const formattedSalary = jobOfferFormattingService.formatSalary(
          jobOffer.minSalary,
          jobOffer.maxSalary
        );
        const formattedLocation = jobOfferFormattingService.formatLocation(
          jobOffer.employer?.address
        );
        const formattedLogo = jobOfferFormattingService.formatLogo(
          jobOffer.employer?.logo
        );

        return (
          <SquareCard
            company={jobOffer.employer?.name}
            jobTitle={jobOffer.title}
            salary={formattedSalary}
            location={formattedLocation}
            logo={formattedLogo}
            jobOfferId={jobOffer._id}
            key={`${jobOffer._id}-card`}
          />
        );
      });
    } else {
      return [];
    }
  };

  const createJobOffersListElements = () => {
    const allJobOffers = getAllJobOffers();

    if (allJobOffers?.length) {
      return allJobOffers.map((jobOffer: JobOffer) => {
        const formattedSalary = jobOfferFormattingService.formatSalary(
          jobOffer.minSalary,
          jobOffer.maxSalary
        );
        const formattedLogo = jobOfferFormattingService.formatLogo(
          jobOffer.employer?.logo
        );
        const formattedDetails =
          jobOfferFormattingService.formatDetails(jobOffer);

        return (
          <ListElement
            jobTitle={jobOffer.title}
            salary={formattedSalary}
            details={formattedDetails}
            logo={formattedLogo}
            key={`${jobOffer._id}-listElement`}
          />
        );
      });
    } else {
      return [];
    }
  };

  const getUserLogin = () => {
    const authenticationService = new AuthenticationService();
    const userFirstName = authenticationService.getUserLogin();
    return userFirstName || '';
  };

  const userLogin = getUserLogin();

  const jobOfferSquareCards = createJobOffersSquareCards();

  const jobOfferListElements = createJobOffersListElements();

  return (
    <StyledJobOffersPage>
      <MenuButton />
      <AvatarButton avatar={avatar} />

      <Subheader>Hello {userLogin}</Subheader>
      <Header>Find your perfect job</Header>
      <TextFieldWrapper>
        <TextField
          type="text"
          alt="login"
          name="login"
          placeholder="What are you looking for?"
          value={searchText}
          handleChange={handleSearchText}
        />

        <SliderButton />
      </TextFieldWrapper>

      <ChipWrapper>{chips}</ChipWrapper>

      <Section primaryText="Nearby jobs" secondaryText="Show all" />

      {loading ? (
        <SpinnerWrapper>
          <Spinner loading={loading} size={120} />
        </SpinnerWrapper>
      ) : (
        <CardWrapper>
          <Carousel>{jobOfferSquareCards}</Carousel>
        </CardWrapper>
      )}

      <Section
        primaryText="All jobs"
        secondaryText="Show all"
        secondaryTextHandleClick={handleShowAllJobs}
      />

      {loading ? (
        <SpinnerWrapper>
          <Spinner loading={loading} size={120} />
        </SpinnerWrapper>
      ) : (
        <ListWrapper>{jobOfferListElements}</ListWrapper>
      )}
    </StyledJobOffersPage>
  );
};

export default JobOffersPage;
