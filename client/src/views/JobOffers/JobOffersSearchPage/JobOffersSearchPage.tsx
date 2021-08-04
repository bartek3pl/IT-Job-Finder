import React, { FC, FormEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

import {
  GLOBAL_PADDING,
  INPUT_TIMEOUT_VALUE,
  PAGE_SIZE,
} from '@utils/constants/constants';
import { GET_ALL_JOB_OFFERS } from '@api/jobOffers/queries';
import { JobOffer } from '@typings/graphql';
import colors from '@styles/colors';
import JobOfferFormattingService from '@services/jobOfferFormattingService';
import routes from '@components/routing/routesStrings';
import Subheader from '@components/ui/Subheader/Subheader';
import Text from '@components/ui/Text/Text';
import TextField from '@components/ui/TextField/TextField';
import SliderButton from '@components/ui/Buttons/SliderButton';
import SelectTextButton from '@components/ui/TextButtons/SelectTextButton';
import Spinner from '@components/ui/Spinner/Spinner';
import BackButton from '@components/ui/SideButtons/BackButton';
import RectangleCard from '@components/ui/Cards/RectangleCard';

interface LocationState {
  country: string;
  city: string;
  searchText: string;
}

type Filter = 'All Job Offers' | 'Nearby Job Offers';

const ALL_JOB_OFFERS_FILTER = 'All Job Offers';
const NEARBY_JOB_OFFERS_FILTER = 'Nearby Job Offers';

const StyledJobOffersSearchPage = styled.div`
  padding: ${GLOBAL_PADDING};
  padding-top: 96px;
  padding-bottom: 96px;
  background-color: ${colors.lightBackground};
  min-height: 100%;
`;

const SubheaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 60px;
`;

const TextWrapper = styled.div`
  display: flex;
  margin-top: 30px;
`;

const SelectTextButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 40px;
`;

const SearchJobOffersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 50px;
  width: 100%;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const jobOfferFormattingService = new JobOfferFormattingService();

let timer: ReturnType<typeof setTimeout>;
const timeoutValue = INPUT_TIMEOUT_VALUE;

const JobOffersSearchPage: FC = () => {
  const location = useLocation<LocationState>();
  const mainPageSearchText = location?.state?.searchText || '';
  const country = location?.state?.country || '';
  const city = location?.state?.city || '';

  const selectCheckedFilter = () => {
    if (country || city) {
      return NEARBY_JOB_OFFERS_FILTER;
    }
    return ALL_JOB_OFFERS_FILTER;
  };

  const selectedCheckedFilter = selectCheckedFilter();

  const [searchText, setSearchText] = useState(mainPageSearchText);
  const [currentSearchText, setCurrentSearchText] = useState(searchText);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [checkedFilter, setCheckedFilter] = useState(selectedCheckedFilter);
  const [offset, setOffset] = useState(0);

  const { data, loading, error } = useQuery(GET_ALL_JOB_OFFERS, {
    variables: {
      first: PAGE_SIZE,
      offset,
      search: { title: searchText, employer: { address: { country, city } } },
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

  const handleCheckedFilter = (filter: Filter) => {
    setCheckedFilter(filter);
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

  const createJobOffersRectangleCards = () => {
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
          <RectangleCard
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

  const getCurrentCount = () => {
    const isSuccess = data?.getAllJobOffers?.success;
    if (isSuccess) {
      return data?.getAllJobOffers?.results?.pageInfo?.currentCount;
    }
    return 0;
  };

  const currentCount = getCurrentCount();

  const jobOfferRectangleCards = createJobOffersRectangleCards();

  return (
    <StyledJobOffersSearchPage>
      <BackButton />
      <SubheaderWrapper>
        <Subheader>Search</Subheader>
      </SubheaderWrapper>
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
      <TextWrapper>
        <Text size={30} weight={500}>
          {currentCount} Job Opportunity
        </Text>
      </TextWrapper>
      <SelectTextButtonWrapper>
        <SelectTextButton
          size={30}
          verticalPadding={30}
          borderRadius={35}
          checked={checkedFilter === ALL_JOB_OFFERS_FILTER}
          handleClick={() => handleCheckedFilter(ALL_JOB_OFFERS_FILTER)}
        >
          {ALL_JOB_OFFERS_FILTER}
        </SelectTextButton>
        <SelectTextButton
          size={30}
          verticalPadding={30}
          borderRadius={35}
          checked={checkedFilter === NEARBY_JOB_OFFERS_FILTER}
          handleClick={() => handleCheckedFilter(NEARBY_JOB_OFFERS_FILTER)}
        >
          {NEARBY_JOB_OFFERS_FILTER}
        </SelectTextButton>
      </SelectTextButtonWrapper>

      {loading ? (
        <SpinnerWrapper>
          <Spinner loading={loading} size={120} />
        </SpinnerWrapper>
      ) : (
        <SearchJobOffersWrapper>
          {jobOfferRectangleCards}
        </SearchJobOffersWrapper>
      )}
    </StyledJobOffersSearchPage>
  );
};

export default JobOffersSearchPage;
