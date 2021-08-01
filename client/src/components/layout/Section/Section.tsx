import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import routes from '@components/routing/routesStrings';
import colors from '@styles/colors';
import Text from '@components/ui/Text/Text';

interface SectionProps {
  primaryText: string;
  secondaryText?: string;
}

const StyledSection = styled.section`
  margin-top: 80px;
`;

const SectionTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SecondaryTextWrapper = styled.button`
  border: none;
  background: transparent;
`;

const Section: FC<SectionProps> = ({ primaryText, secondaryText }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(routes.all);
  };

  return (
    <StyledSection>
      <SectionTextWrapper>
        <Text size={45} weight={600}>
          {primaryText}
        </Text>
        <SecondaryTextWrapper onClick={handleClick}>
          <Text size={30} weight={500} color={colors.secondary}>
            {secondaryText}
          </Text>
        </SecondaryTextWrapper>
      </SectionTextWrapper>
    </StyledSection>
  );
};

Section.defaultProps = {
  primaryText: '',
  secondaryText: '',
};

export default Section;
