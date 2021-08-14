import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { GLOBAL_PADDING } from '@utils/constants/constants';
import { JobOffer } from '@typings/graphql';
import colors from '@styles/colors';
import { GET_USER_BY_ID } from '@api/user/queries';
import AuthenticationService from '@services/authenticationService';
import JobOfferFormattingService from '@services/jobOfferFormattingService';
import Subheader from '@components/ui/Subheader/Subheader';
import Text from '@components/ui/Text/Text';
import Spinner from '@components/ui/Spinner/Spinner';
import MenuButton from '@components/ui/SideButtons/MenuButton';
import RectangleCard from '@components/ui/Cards/RectangleCard';
import Modal from '@components/ui/Modal/Modal';
import MenuPage from '@views/Menu/MenuPage';

const StyledFavouriteJobOffersPage = styled.div`
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

const TextWrapper = styled.div`
  display: flex;
  margin-top: 30px;
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

const NoJobOffersWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 80px;
`;

const authenticationService = new AuthenticationService();
const jobOfferFormattingService = new JobOfferFormattingService();

const user = authenticationService.getUser();

const FavouriteJobOffersPage: FC = () => {
  const [isMenuModalShown, setIsMenuModalShown] = useState(false);

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: user._id,
    },
    fetchPolicy: 'no-cache',
  });

  const showMenuModal = () => {
    setIsMenuModalShown(true);
  };

  const hideMenuModal = () => {
    setIsMenuModalShown(false);
  };

  const getFavouriteJobOffers = () => {
    if (data && !loading && !error) {
      const { getUserById } = data;
      if (getUserById?.success) {
        return getUserById?.user?.favouriteJobOffers || [];
      }
      return [];
    }
    return [];
  };

  const createJobOffersRectangleCards = () => {
    const favouriteJobOffers = getFavouriteJobOffers();

    if (favouriteJobOffers?.length) {
      return favouriteJobOffers.map((jobOffer: JobOffer) => {
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
            updatedTime={jobOffer.updatedDateTime}
            key={`${jobOffer._id}-card`}
          />
        );
      });
    }
    return [];
  };

  const getCurrentCount = () => {
    if (data && !loading && !error) {
      const { getUserById } = data;
      if (getUserById?.success) {
        return getUserById?.user?.favouriteJobOffers?.length || 0;
      }
      return 0;
    }
    return 0;
  };

  const noJobOffersComponent = (
    <NoJobOffersWrapper>
      <Text size={35} weight={500}>
        Sorry, you don't have any favourite job offer. Try to add them.
      </Text>
    </NoJobOffersWrapper>
  );

  const currentCount = getCurrentCount();

  const jobOfferRectangleCards = createJobOffersRectangleCards();

  return (
    <>
      <Modal show={isMenuModalShown} appearFrom="left">
        <MenuPage
          closeModal={hideMenuModal}
          selectedPage="Favourite Job Offers"
        />
      </Modal>
      <StyledFavouriteJobOffersPage>
        <MenuButton handleClick={showMenuModal} />
        <SubheaderWrapper>
          <Subheader>Favourite Job Offers</Subheader>
        </SubheaderWrapper>
        <TextWrapper>
          <Text size={30} weight={500}>
            {currentCount} Favourite Job{' '}
            {currentCount === 1 ? 'Offer' : 'Offers'}
          </Text>
        </TextWrapper>
        <SearchJobOffersWrapper>
          {loading ? (
            <SpinnerWrapper>
              <Spinner loading={loading} size={120} />
            </SpinnerWrapper>
          ) : jobOfferRectangleCards?.length ? (
            <SearchJobOffersWrapper>
              {jobOfferRectangleCards}
            </SearchJobOffersWrapper>
          ) : (
            noJobOffersComponent
          )}
        </SearchJobOffersWrapper>
      </StyledFavouriteJobOffersPage>
    </>
  );
};

export default FavouriteJobOffersPage;
