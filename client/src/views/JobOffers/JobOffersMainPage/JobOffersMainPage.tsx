import React, { FC, FormEvent, useState } from 'react';
import { FiSliders } from 'react-icons/fi';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import avatar from '@assets/images/avatar.jpg';
import { GLOBAL_PADDING, PAGE_SIZE } from '@utils/constants/constants';
import { validateUrl } from '@utils/helpers/validators';
import { GET_ALL_JOB_OFFERS } from '@api/jobOffers/queries';
import colors from '@styles/colors';
import routes from '@components/routing/routesStrings';
import Header from '@components/ui/Header/Header';
import Subheader from '@components/ui/Subheader/Subheader';
import AvatarButton from '@components/ui/SideButtons/AvatarButton';
import MenuButton from '@components/ui/SideButtons/MenuButton';
import Chip from '@components/ui/Chip/Chip';
import TextField from '@components/ui/TextField/TextField';
import Button from '@components/ui/Button/Button';
import Card from '@components/ui/Card/Card';
import ListElement from '@components/ui/ListElement/ListElement';
import Carousel from '@components/ui/Carousel/Carousel';
import Spinner from '@components/ui/Spinner/Spinner';
import Section from '@components/layout/Section/Section';
import { Address, JobOffer, Level, Maybe } from '@typings/graphql';

const StyledJobOffersPage = styled.div`
  padding: ${GLOBAL_PADDING};
  padding-top: 210px;
  background-color: ${colors.white};
`;

const TextFieldWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 60px;
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

const JobOffersPage: FC = () => {
  const history = useHistory();

  const [searchText, setSearchText] = useState('');

  const { data, loading, error } = useQuery(GET_ALL_JOB_OFFERS);

  const handleSearchText = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
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

  const formatSalary = (minSalary?: number, maxSalary?: number) => {
    let convertedMinSalary = null;
    let convertedMaxSalary = null;

    if (minSalary) {
      convertedMinSalary = Math.round(minSalary / 1000);
    }
    if (maxSalary) {
      convertedMaxSalary = Math.round(maxSalary / 1000);
    }

    if (minSalary && maxSalary) {
      return `PLN ${convertedMinSalary}-${convertedMaxSalary}k`;
    } else if (minSalary && !maxSalary) {
      return `PLN ${convertedMinSalary}k`;
    } else if (!minSalary && maxSalary) {
      return `PLN ${convertedMaxSalary}k`;
    } else {
      return '';
    }
  };

  const formatLocation = (address?: Address) => {
    if (address) {
      const { city, country } = address || {};

      if (city && country) {
        return `${city}, ${country}`;
      } else if (country && !city) {
        return country;
      } else if (!country && city) {
        return city;
      }
    } else {
      return '';
    }
  };

  const formatLogo = (logo?: string | null) => {
    if (logo) {
      const isLogoUrlValid = validateUrl(logo);
      if (isLogoUrlValid) {
        return logo;
      } else {
        const BASE_URL = 'https://nofluffjobs.com/';
        return `${BASE_URL}${logo}`;
      }
    } else {
      return '';
    }
  };

  const formatLevels = (levels?: Maybe<Maybe<Level>[]>) => {
    if (levels) {
      return levels.join(', ');
    } else {
      return '';
    }
  };

  const formatDetails = (jobOffer: JobOffer) => {
    const formattedLocation = formatLocation(jobOffer?.employer?.address);
    const formattedLevels = formatLevels(jobOffer?.levels);
    const contractType = jobOffer?.contractType;

    return `${formattedLocation} | ${formattedLevels} | ${contractType}`;
  };

  const createJobOffersCards = () => {
    const allJobOffers = getAllJobOffers();

    if (allJobOffers?.length) {
      return allJobOffers.map((jobOffer: JobOffer) => {
        const formattedSalary = formatSalary(
          jobOffer.minSalary,
          jobOffer.maxSalary
        );
        const formattedLocation = formatLocation(jobOffer.employer?.address);
        const formattedLogo = formatLogo(jobOffer.employer?.logo);

        return (
          <Card
            company={jobOffer.employer?.name}
            jobTitle={jobOffer.title}
            salary={formattedSalary}
            location={formattedLocation}
            logo={formattedLogo}
            backgroundColor={colors.white}
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
        const formattedSalary = formatSalary(
          jobOffer.minSalary,
          jobOffer.maxSalary
        );
        const formattedLogo = formatLogo(jobOffer.employer?.logo);
        const formattedDetails = formatDetails(jobOffer);

        return (
          <ListElement
            jobTitle={jobOffer.title}
            salary={formattedSalary}
            details={formattedDetails}
            logo={formattedLogo}
            backgroundColor={colors.white}
            key={`${jobOffer._id}-listElement`}
          />
        );
      });
    } else {
      return [];
    }
  };

  const jobOfferCards = createJobOffersCards();

  const jobOfferListElements = createJobOffersListElements();

  return (
    <StyledJobOffersPage>
      <MenuButton />
      <AvatarButton avatar={avatar} />

      <Subheader>Hello Bartek</Subheader>
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
        <Button flat width={160}>
          <FiSliders />
        </Button>
      </TextFieldWrapper>

      <ChipWrapper>{chips}</ChipWrapper>

      <Section primaryText="Popular jobs" secondaryText="Show all" />

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <CardWrapper>
          <Carousel>{jobOfferCards}</Carousel>
        </CardWrapper>
      )}

      <Section primaryText="All jobs" secondaryText="Show all" />

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <ListWrapper>{jobOfferListElements}</ListWrapper>
      )}
    </StyledJobOffersPage>
  );
};

export default JobOffersPage;
