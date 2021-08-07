import React, { FC, FormEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
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
import Modal from '@components/ui/Modal/Modal';
import Chip from '@components/ui/Chip/Chip';
import FiltersPage from '@views/Filters/FiltersPage';
import {
  getFilters,
  saveFilters,
  saveTitle,
} from '../../../store/filter/actions';
import { FilterReducers, FiltersData } from '../../../store/filter/reducers';

interface LocationState {
  country: string;
  city: string;
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
  flex-wrap: wrap;
  gap: 30px;
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

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
`;

const hasUrlParameter = (parameter: string) => {
  if (parameter) {
    const queryString = window.location.search;
    return queryString.includes(parameter);
  }
  return false;
};

const jobOfferFormattingService = new JobOfferFormattingService();

let timer: ReturnType<typeof setTimeout>;
const timeoutValue = INPUT_TIMEOUT_VALUE;

const JobOffersSearchPage: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<LocationState>();

  const country = location.state.country;
  const city = location.state.city;
  const selectedCheckedFilter =
    hasUrlParameter(country) || hasUrlParameter(city)
      ? NEARBY_JOB_OFFERS_FILTER
      : ALL_JOB_OFFERS_FILTER;

  const filtersData = useSelector<FilterReducers, FiltersData>(
    (state) => state.filterReducers
  );

  const [searchText, setSearchText] = useState(filtersData.title);
  const [currentSearchText, setCurrentSearchText] = useState(searchText);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [checkedFilter, setCheckedFilter] = useState(selectedCheckedFilter);
  const [offset, setOffset] = useState(0);
  const [isFiltersModalShown, setIsFiltersModalShown] = useState(false);

  const getSearchQuery = () => {
    const queryAddress =
      checkedFilter === NEARBY_JOB_OFFERS_FILTER ? { country, city } : null;

    return {
      ...filtersData,
      employer: { address: queryAddress },
    };
  };

  const searchQuery = getSearchQuery();
  const { data, loading, error } = useQuery(GET_ALL_JOB_OFFERS, {
    variables: {
      first: PAGE_SIZE,
      offset,
      search: searchQuery,
    },
  });

  useEffect(() => {
    dispatch(getFilters());
  }, []);

  useEffect(() => {
    if (isUserTyping === false) {
      setSearchText(currentSearchText);
      dispatch(saveTitle(currentSearchText));
    }
  }, [isUserTyping]);

  const handleCurrentSearchText = (event: FormEvent<HTMLInputElement>) => {
    setCurrentSearchText(event.currentTarget.value);
  };

  const showFilterModal = () => {
    setIsFiltersModalShown(true);
  };

  const hideFilterModal = () => {
    setIsFiltersModalShown(false);
  };

  const applyFilters = (filtersData: FiltersData) => {
    dispatch(saveFilters(filtersData));
    hideFilterModal();
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

  const getSelectedFilters = () => {
    const { employer, skills, levels, contractTypes } = filtersData;
    const { name, address } = employer;
    const { country, city } = address;
    const formattedLevels = jobOfferFormattingService
      .formatLevels(levels)
      .split(', ');

    return [
      country,
      city,
      name,
      ...skills,
      ...formattedLevels,
      ...contractTypes,
    ];
  };

  const createSelectedFiltersChips = () => {
    const selectedFilters = getSelectedFilters();

    if (selectedFilters?.length) {
      return selectedFilters
        .filter((selectedFilter) => selectedFilter !== '')
        .map((selectedFilter: string) => (
          <Chip size={30} key={`${selectedFilter}-chip`}>
            {selectedFilter}
          </Chip>
        ));
    } else {
      return [];
    }
  };

  const currentCount = getCurrentCount();

  const jobOfferRectangleCards = createJobOffersRectangleCards();

  const selectedFilters = createSelectedFiltersChips();

  return (
    <>
      <Modal show={isFiltersModalShown}>
        <FiltersPage closeModal={hideFilterModal} applyFilters={applyFilters} />
      </Modal>
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
          <SliderButton handleClick={showFilterModal} />
        </TextFieldWrapper>
        <ChipWrapper>{selectedFilters}</ChipWrapper>
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
            checked={checkedFilter === NEARBY_JOB_OFFERS_FILTER}
            handleClick={() => handleCheckedFilter(NEARBY_JOB_OFFERS_FILTER)}
          >
            {NEARBY_JOB_OFFERS_FILTER}
          </SelectTextButton>
          <SelectTextButton
            size={30}
            verticalPadding={30}
            borderRadius={35}
            checked={checkedFilter === ALL_JOB_OFFERS_FILTER}
            handleClick={() => handleCheckedFilter(ALL_JOB_OFFERS_FILTER)}
          >
            {ALL_JOB_OFFERS_FILTER}
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
    </>
  );
};

export default JobOffersSearchPage;
