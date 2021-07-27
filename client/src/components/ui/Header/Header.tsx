import React, { FC } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  font-size: 70px;
  font-weight: 500;
`;

const Header: FC = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
