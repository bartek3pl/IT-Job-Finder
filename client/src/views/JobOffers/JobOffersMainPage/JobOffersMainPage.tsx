import React, { FC, FormEvent, useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import avatar from '@assets/images/avatar.jpg';
import {
  GLOBAL_PADDING,
  INPUT_TIMEOUT_VALUE,
  PAGE_SIZE,
} from '@utils/constants/constants';
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

let timer: ReturnType<typeof setTimeout>;
const timeoutValue = INPUT_TIMEOUT_VALUE;

const JobOffersPage: FC = () => {
  const history = useHistory();

  const [searchText, setSearchText] = useState('');
  const [currentSearchText, setCurrentSearchText] = useState(searchText);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [offset, setOffset] = useState(0);

  const country = 'PL';
  const city = '';
  const {
    data: nearbyData,
    loading: nearbyLoading,
    error: nearbyError,
  } = useQuery(GET_ALL_JOB_OFFERS, {
    variables: {
      first: PAGE_SIZE,
      offset,
      search: { title: searchText, employer: { address: { country, city } } },
    },
  });
  const {
    data: allData,
    loading: allLoading,
    error: allError,
  } = useQuery(GET_ALL_JOB_OFFERS, {
    variables: {
      first: PAGE_SIZE,
      offset,
      search: { title: searchText },
    },
  });

  useEffect(() => {
    if (isUserTyping === false) {
      setSearchText(currentSearchText);
    }
  }, [isUserTyping]);

  const handleCurrentSearchText = (event: FormEvent<HTMLInputElement>) => {
    setCurrentSearchText(event.currentTarget.value);
  };

  const handleKeyUp = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setIsUserTyping(false);
    }, timeoutValue);
  };

  const handleKeyDown = () => {
    clearTimeout(timer);
    setIsUserTyping(true);
  };

  const handleShowAllJobs = () => {
    history.push(routes.jobOffersSearch);
  };

  const handleShowNearbyJobs = () => {
    history.push({
      pathname: routes.jobOffersSearch,
      search: `?country=${country}&city=${city}`,
      state: { country, city },
    });
  };

  const getNearbyJobOffers = () => {
    if (nearbyData && !nearbyLoading && !nearbyError) {
      const { getAllJobOffers } = nearbyData;
      if (getAllJobOffers?.success) {
        return getAllJobOffers?.results?.jobOffers;
      } else {
        return [];
      }
    }
  };

  const getAllJobOffers = () => {
    if (allData && !allLoading && !allError) {
      const { getAllJobOffers } = allData;
      if (getAllJobOffers?.success) {
        return getAllJobOffers?.results?.jobOffers;
      } else {
        return [];
      }
    }
  };

  const createNearbyJobOffers = () => {
    const allJobOffers = getNearbyJobOffers();

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

  const createAllJobOffers = () => {
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

  const nearbyJobOffers = createNearbyJobOffers();

  const allJobOffers = createAllJobOffers();

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
          value={currentSearchText}
          handleChange={handleCurrentSearchText}
          handleKeyDown={handleKeyDown}
          handleKeyUp={handleKeyUp}
        />

        <SliderButton />
      </TextFieldWrapper>

      <ChipWrapper>{chips}</ChipWrapper>

      <Section
        primaryText="Nearby jobs"
        secondaryText="Show all"
        secondaryTextHandleClick={handleShowNearbyJobs}
      />

      {nearbyLoading ? (
        <SpinnerWrapper>
          <Spinner loading={nearbyLoading} size={120} />
        </SpinnerWrapper>
      ) : (
        <CardWrapper>
          <Carousel>{nearbyJobOffers}</Carousel>
        </CardWrapper>
      )}

      <Section
        primaryText="All jobs"
        secondaryText="Show all"
        secondaryTextHandleClick={handleShowAllJobs}
      />

      {allLoading ? (
        <SpinnerWrapper>
          <Spinner loading={allLoading} size={120} />
        </SpinnerWrapper>
      ) : (
        <ListWrapper>{allJobOffers}</ListWrapper>
      )}
    </StyledJobOffersPage>
  );
};

export default JobOffersPage;
