import React, { FC } from 'react';
import styled from 'styled-components';

import colors from '@styles/colors';
import Text from '@components/ui/Text/Text';

interface SectionProps {
  primaryText: string;
  secondaryText?: string;
  primaryTextHandleClick?: () => void;
  secondaryTextHandleClick?: () => void;
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

const Section: FC<SectionProps> = ({
  primaryText,
  secondaryText,
  primaryTextHandleClick,
  secondaryTextHandleClick,
}) => {
  return (
    <StyledSection>
      <SectionTextWrapper onClick={primaryTextHandleClick}>
        <Text size={45} weight={600}>
          {primaryText}
        </Text>
        <SecondaryTextWrapper
          onClick={secondaryTextHandleClick}
          name={secondaryText}
        >
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
  primaryTextHandleClick: () => {},
  secondaryTextHandleClick: () => {},
};

export default Section;
