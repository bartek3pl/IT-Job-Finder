import React, { FC, FormEvent, useState } from 'react';
import { FiSliders } from 'react-icons/fi';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import googleImage from '@assets/images/google.png';
import spotifyImage from '@assets/images/spotify.png';
import avatar from '@assets/images/avatar.jpg';
import { GLOBAL_PADDING } from '@utils/constants/constants';
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
import Section from '@components/layout/Section/Section';

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

const JobOffersPage: FC = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchText = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

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

      <ChipWrapper>
        <Chip size={30}>Product</Chip>
        <Chip size={30}>Design</Chip>
        <Chip size={30}>Development</Chip>
      </ChipWrapper>

      <Section primaryText="Popular jobs" secondaryText="Show all" />

      <CardWrapper>
        <Carousel>
          <Card
            company="Google"
            jobTitle="Lead Product Manager"
            salary="$8k"
            location="Tokyo, Japan"
            logo={googleImage}
            backgroundColor={colors.white}
          />
          <Card
            company="Spotify"
            jobTitle="Senior Designer"
            salary="$5k"
            location="Toronto, Canada"
            logo={spotifyImage}
            backgroundColor={colors.white}
          />
          <Card
            company="Google"
            jobTitle="Lead Product Manager"
            salary="$8k"
            location="Tokyo, Japan"
            logo={googleImage}
            backgroundColor={colors.white}
          />
          <Card
            company="Spotify"
            jobTitle="Senior Designer"
            salary="$5k"
            location="Toronto, Canada"
            logo={spotifyImage}
            backgroundColor={colors.white}
          />
        </Carousel>
      </CardWrapper>

      <Section primaryText="All jobs" secondaryText="Show all" />

      <ListWrapper>
        <ListElement
          jobTitle="Lead Product Manager"
          salary="$8k"
          details="Tokyo, Japan | Expert | B2B "
          logo={googleImage}
          backgroundColor={colors.white}
        />
        <ListElement
          jobTitle="Senior Designer"
          salary="$5k"
          details="Toronto, Canada | Senior | UOP"
          logo={spotifyImage}
          backgroundColor={colors.white}
        />
        <ListElement
          jobTitle="Lead Product Manager"
          salary="$8k"
          details="Tokyo, Japan | Expert | B2B "
          logo={googleImage}
          backgroundColor={colors.white}
        />
        <ListElement
          jobTitle="Senior Designer"
          salary="$5k"
          details="Toronto, Canada | Senior | UOP"
          logo={spotifyImage}
          backgroundColor={colors.white}
        />
      </ListWrapper>
    </StyledJobOffersPage>
  );
};

export default JobOffersPage;
