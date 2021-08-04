import React, { FC } from 'react';
import styled from 'styled-components';

import Header from '@components/ui/Header/Header';
import Subheader from '@components/ui/Subheader/Subheader';
import AvatarButton from '@components/ui/SideButtons/AvatarButton';
import MenuButton from '@components/ui/SideButtons/MenuButton';
import Chip from '@components/ui/Chip/Chip';
import TextField from '@components/ui/TextField/TextField';
import Spinner from '@components/ui/Spinner/Spinner';

const StyledFiltersPage = styled.div`
  margin-top: 30px;
`;

const SubheaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FiltersPage: FC = () => {
  return (
    <StyledFiltersPage>
      <SubheaderWrapper>
        <Subheader>Set Filters</Subheader>
      </SubheaderWrapper>
    </StyledFiltersPage>
  );
};

export default FiltersPage;
