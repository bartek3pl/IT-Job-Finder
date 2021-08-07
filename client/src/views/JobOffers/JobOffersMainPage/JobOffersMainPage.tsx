import React, { FC, FormEvent, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
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
import Modal from '@components/ui/Modal/Modal';
import Section from '@components/layout/Section/Section';
import FiltersPage from '@views/Filters/FiltersPage';
import {
  getFilters,
  saveFilters,
  saveTitle,
} from '../../../store/filter/actions';
import { FilterReducers, FiltersData } from '../../../store/filter/reducers';

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

const authenticationService = new AuthenticationService();
const jobOfferFormattingService = new JobOfferFormattingService();

let timer: ReturnType<typeof setTimeout>;
const timeoutValue = INPUT_TIMEOUT_VALUE;

const JobOffersPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const filtersData = useSelector<FilterReducers, FiltersData>(
    (state) => state.filterReducers
  );

  const [searchText, setSearchText] = useState(filtersData.title);
  const [currentSearchText, setCurrentSearchText] = useState(searchText);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isFiltersModalShown, setIsFiltersModalShown] = useState(false);

  const user = authenticationService.getUser();
  const country = user.address?.country || 'PL';
  const city = user.address?.city || '';
  const {
    data: nearbyData,
    loading: nearbyLoading,
    error: nearbyError,
  } = useQuery(GET_ALL_JOB_OFFERS, {
    variables: {
      first: PAGE_SIZE,
      offset,
      search: {
        ...filtersData,
        employer: { address: { country, city } },
      },
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
      search: { ...filtersData },
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

  const handleShowJobs = (search: string) => {
    history.push({
      pathname: routes.jobOffersSearch,
      state: { searchText, country, city },
      search,
    });
  };

  const handleShowAllJobs = () => {
    handleShowJobs(`?searchText=${searchText}`);
  };

  const handleShowNearbyJobs = () => {
    handleShowJobs(`?searchText=${searchText}&country=${country}&city=${city}`);
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

  const getUserLogin = () => {
    const authenticationService = new AuthenticationService();
    const user = authenticationService.getUser();
    const userLogin = user?.login;
    return userLogin || '';
  };

  const userLogin = getUserLogin();

  const nearbyJobOffers = createNearbyJobOffers();

  const allJobOffers = createAllJobOffers();

  const selectedFilters = createSelectedFiltersChips();

  return (
    <>
      <Modal show={isFiltersModalShown}>
        <FiltersPage closeModal={hideFilterModal} applyFilters={applyFilters} />
      </Modal>
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

          <SliderButton handleClick={showFilterModal} />
        </TextFieldWrapper>

        <ChipWrapper>{selectedFilters}</ChipWrapper>

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
    </>
  );
};

export default JobOffersPage;
