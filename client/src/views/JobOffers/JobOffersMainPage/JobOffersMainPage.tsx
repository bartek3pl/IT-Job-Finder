import React, { FC, FormEvent, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  GLOBAL_PADDING,
  INPUT_TIMEOUT_VALUE,
  PAGE_SIZE,
} from '@utils/constants/constants';
import { GET_ALL_JOB_OFFERS } from '@api/jobOffers/queries';
import { JobOffer, Maybe, JobOffersResponse } from '@typings/graphql';
import AuthenticationService from '@services/authenticationService';
import JobOfferFormattingService from '@services/jobOfferFormattingService';
import colors from '@styles/colors';
import routes from '@components/routing/routesStrings';
import Header from '@components/ui/Header/Header';
import Subheader from '@components/ui/Subheader/Subheader';
import Text from '@components/ui/Text/Text';
import AvatarButton from '@components/ui/SideButtons/AvatarButton';
import MenuButton from '@components/ui/SideButtons/MenuButton';
import Chip from '@components/ui/Chip/Chip';
import TextField from '@components/ui/TextField/TextField';
import TextButton from '@components/ui/TextButtons/TextButton';
import SliderButton from '@components/ui/Buttons/SliderButton';
import SquareCard from '@components/ui/Cards/SquareCard';
import ListElement from '@components/ui/ListElement/ListElement';
import Carousel from '@components/ui/Carousel/Carousel';
import Spinner from '@components/ui/Spinner/Spinner';
import Modal from '@components/ui/Modal/Modal';
import Section from '@components/layout/Section/Section';
import FiltersPage from '@views/Filters/FiltersPage';
import MenuPage from '@views/Menu/MenuPage';
import {
  getFilters,
  saveFilters,
  saveTitle,
} from '../../../store/filter/actions';
import { FilterReducers, FiltersData } from '../../../store/filter/reducers';

interface JobOffersData {
  getAllJobOffers: Maybe<JobOffersResponse>;
}

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

const NoJobOffersWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 80px;
`;

const FetchButtonWrapper = styled.div`
  margin-top: 50px;
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
  const [isFiltersModalShown, setIsFiltersModalShown] = useState(false);
  const [isMenuModalShown, setIsMenuModalShown] = useState(false);

  const [allJobOffers, setAllJobOffers] = useState<Maybe<JobOffer>[]>([]);
  const [allHasMore, setAllHasMore] = useState(false);
  const [allOffset, setAllOffset] = useState(0);

  const user = authenticationService.getUser();
  const country = user.address?.country || 'PL';
  const city = user.address?.city || '';

  const getHasMore = (data: JobOffersData) => {
    const { getAllJobOffers } = data || {};
    const hasMore = Boolean(getAllJobOffers?.results?.pageInfo?.hasMore);
    return hasMore;
  };

  const getJobOffers = (data: JobOffersData) => {
    const { getAllJobOffers } = data || {};
    if (getAllJobOffers?.success) {
      return getAllJobOffers?.results?.jobOffers || [];
    }
    return [];
  };

  const {
    data: nearbyData,
    loading: nearbyLoading,
    error: nearbyError,
  } = useQuery(GET_ALL_JOB_OFFERS, {
    variables: {
      first: PAGE_SIZE,
      offset: 0,
      search: {
        ...filtersData,
        employer: { address: { country, city } },
      },
    },
  });

  const { loading: allLoading, fetchMore } = useQuery(GET_ALL_JOB_OFFERS, {
    variables: {
      first: PAGE_SIZE,
      search: { ...filtersData },
    },
    onCompleted: (data) => {
      const thisJobOffers = getJobOffers(data);
      const thisHasMore = getHasMore(data);

      setAllJobOffers(thisJobOffers);
      setAllHasMore(thisHasMore);
    },
  });

  const allFetchMoreData = async () => {
    const newOffset = (allOffset + 1) * PAGE_SIZE;
    const { data } = await fetchMore<any, any>({
      variables: {
        first: PAGE_SIZE,
        offset: newOffset,
        search: { ...filtersData },
      },
    });
    const thisJobOffers = getJobOffers(data);
    const thisHasMore = getHasMore(data);

    setAllJobOffers([...allJobOffers, ...thisJobOffers]);
    setAllHasMore(thisHasMore);
    setAllOffset(allOffset + 1);
  };

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

  const showMenuModal = () => {
    setIsMenuModalShown(true);
  };

  const hideMenuModal = () => {
    setIsMenuModalShown(false);
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

  const handleProfile = () => {
    history.push(routes.profile);
  };

  const getNearbyJobOffers = () => {
    if (nearbyData && !nearbyLoading && !nearbyError) {
      const { getAllJobOffers } = nearbyData;
      if (getAllJobOffers?.success) {
        return getAllJobOffers?.results?.jobOffers;
      }
      return [];
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
            name={jobOffer.title}
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
    }
    return [];
  };

  const createAllJobOffers = () => {
    if (allJobOffers?.length) {
      return allJobOffers.map((jobOffer: Maybe<JobOffer>) => {
        const formattedSalary = jobOfferFormattingService.formatSalary(
          jobOffer?.minSalary,
          jobOffer?.maxSalary
        );
        const formattedLogo = jobOfferFormattingService.formatLogo(
          jobOffer?.employer?.logo
        );
        const formattedDetails =
          jobOfferFormattingService.formatDetails(jobOffer);

        return (
          <ListElement
            name={jobOffer?.title}
            jobTitle={jobOffer?.title}
            salary={formattedSalary}
            details={formattedDetails}
            logo={formattedLogo}
            key={`${jobOffer?._id}-listElement`}
          />
        );
      });
    }
    return [];
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
    }
    return [];
  };

  const getUserLogin = () => {
    const authenticationService = new AuthenticationService();
    const user = authenticationService.getUser();
    const userLogin = user?.login;
    return userLogin || '';
  };

  const noJobOffersComponent = (
    <NoJobOffersWrapper>
      <Text size={35} weight={500}>
        Sorry, no job offers found. Try to use different filters.
      </Text>
    </NoJobOffersWrapper>
  );

  const endMessageComponent = (
    <NoJobOffersWrapper>
      <Text size={35} weight={500}>
        You have viewed all job offers!
      </Text>
    </NoJobOffersWrapper>
  );

  const userLogin = getUserLogin();

  const nearbyJobOffers = createNearbyJobOffers();

  const allJobOffersElements = createAllJobOffers();

  const selectedFilters = createSelectedFiltersChips();

  return (
    <>
      <Modal show={isFiltersModalShown} appearFrom="bottom">
        <FiltersPage closeModal={hideFilterModal} applyFilters={applyFilters} />
      </Modal>
      <Modal show={isMenuModalShown} appearFrom="left">
        <MenuPage closeModal={hideMenuModal} selectedPage="Main Menu" />
      </Modal>
      <StyledJobOffersPage>
        <MenuButton handleClick={showMenuModal} />
        <AvatarButton handleClick={handleProfile} />

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
        ) : nearbyJobOffers?.length ? (
          <CardWrapper>
            <Carousel>{nearbyJobOffers}</Carousel>
          </CardWrapper>
        ) : (
          noJobOffersComponent
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
        ) : allJobOffers?.length ? (
          <ListWrapper>{allJobOffersElements}</ListWrapper>
        ) : (
          noJobOffersComponent
        )}

        {allHasMore ? (
          <FetchButtonWrapper>
            <TextButton fullWidth flat handleClick={allFetchMoreData}>
              Fetch more
            </TextButton>
          </FetchButtonWrapper>
        ) : !allLoading ? (
          endMessageComponent
        ) : null}
      </StyledJobOffersPage>
    </>
  );
};

export default JobOffersPage;
