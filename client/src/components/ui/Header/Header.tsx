import React, { FC } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  font-size: 62px;
  font-weight: 600;
`;

const Header: FC = ({ children }) => <StyledHeader>{children}</StyledHeader>;

export default Header;
