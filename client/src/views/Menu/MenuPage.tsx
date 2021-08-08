import React, { FC } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import colors from '@styles/colors';
import routes from '@components/routing/routesStrings';
import Text from '@components/ui/Text/Text';
import CloseButton from '@components/ui/SideButtons/CloseButton';

type SelectedPage = 'Main Menu' | 'Favourite Job Offers';

interface MenuPageProps {
  closeModal?: () => void;
  selectedPage?: SelectedPage;
}

const StyledMenuPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 60px;
  margin-top: 200px;
`;

const ItemWrapper = styled.button`
  border: none;
  background: transparent;
`;

const MenuPage: FC<MenuPageProps> = ({ closeModal, selectedPage }) => {
  const history = useHistory();

  const redirectToPage = (page: string) => {
    history.push(page);
    if (closeModal) {
      closeModal();
    }
  };

  const redirectToMainMenuPage = () => {
    redirectToPage(routes.jobOffers);
  };

  const redirectToFavouriteJobOffersPage = () => {
    redirectToPage(routes.favouriteJobOffers);
  };

  return (
    <StyledMenuPage>
      <CloseButton handleClick={closeModal} />
      <ItemsWrapper>
        <ItemWrapper onClick={redirectToMainMenuPage}>
          <Text
            size={50}
            weight={600}
            color={
              selectedPage === 'Main Menu' ? colors.primary : colors.secondary
            }
          >
            Main Menu
          </Text>
        </ItemWrapper>
        <ItemWrapper onClick={redirectToFavouriteJobOffersPage}>
          <Text
            size={50}
            weight={600}
            color={
              selectedPage === 'Favourite Job Offers'
                ? colors.primary
                : colors.secondary
            }
          >
            Favourite Job Offers
          </Text>
        </ItemWrapper>
      </ItemsWrapper>
    </StyledMenuPage>
  );
};

MenuPage.defaultProps = {
  closeModal: () => {},
  selectedPage: 'Main Menu',
};

export default MenuPage;
