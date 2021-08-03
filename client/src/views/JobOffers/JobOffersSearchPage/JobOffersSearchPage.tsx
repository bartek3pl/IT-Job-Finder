import React, { FC, useState, FormEvent } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { GLOBAL_PADDING } from '@utils/constants/constants';
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

type Filter = 'Most Relevant' | 'Most Recent';

const MOST_RELEVANT_FILTER = 'Most Relevant';
const MOST_RECENT_FILTER = 'Most Recent';

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

const jobOfferFormattingService = new JobOfferFormattingService();

const JobOffersSearchPage: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [checkedFilter, setCheckedFilter] = useState(MOST_RELEVANT_FILTER);

  const { data, loading, error } = useQuery(GET_ALL_JOB_OFFERS);

  const handleSearchText = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
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

  const getTotalCount = () => {
    const isSuccess = data?.getAllJobOffers?.success;
    if (isSuccess) {
      return data?.getAllJobOffers?.results?.pageInfo?.totalCount;
    }
    return 0;
  };

  const totalCount = getTotalCount();

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
          value={searchText}
          handleChange={handleSearchText}
        />
        <SliderButton />
      </TextFieldWrapper>
      <TextWrapper>
        <Text size={30} weight={500}>
          {totalCount} Job Opportunity
        </Text>
      </TextWrapper>
      <SelectTextButtonWrapper>
        <SelectTextButton
          size={30}
          verticalPadding={30}
          borderRadius={35}
          checked={checkedFilter === MOST_RELEVANT_FILTER}
          handleClick={() => handleCheckedFilter(MOST_RELEVANT_FILTER)}
        >
          {MOST_RELEVANT_FILTER}
        </SelectTextButton>
        <SelectTextButton
          size={30}
          verticalPadding={30}
          borderRadius={35}
          checked={checkedFilter === MOST_RECENT_FILTER}
          handleClick={() => handleCheckedFilter(MOST_RECENT_FILTER)}
        >
          {MOST_RECENT_FILTER}
        </SelectTextButton>
        <SearchJobOffersWrapper>
          {jobOfferRectangleCards}
        </SearchJobOffersWrapper>
      </SelectTextButtonWrapper>
    </StyledJobOffersSearchPage>
  );
};

export default JobOffersSearchPage;
