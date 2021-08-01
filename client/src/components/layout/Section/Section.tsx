import React, { FC } from 'react';
import styled from 'styled-components';

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

const Section: FC<SectionProps> = ({ primaryText, secondaryText }) => {
  return (
    <StyledSection>
      <SectionTextWrapper>
        <Text size={45} weight={600}>
          {primaryText}
        </Text>
        <Text size={30} weight={500} color={colors.secondary}>
          {secondaryText}
        </Text>
      </SectionTextWrapper>
    </StyledSection>
  );
};

Section.defaultProps = {
  primaryText: '',
  secondaryText: '',
};

export default Section;
