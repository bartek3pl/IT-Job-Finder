import React, { FC } from 'react';
import styled from 'styled-components';

const StyledSubHeader = styled.h2`
  font-size: 45px;
  font-weight: 400;
  line-height: 65px;
`;

const SubHeader: FC = ({ children }) => <StyledSubHeader>{children}</StyledSubHeader>;

export default SubHeader;
