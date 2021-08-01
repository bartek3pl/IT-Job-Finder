import React, { FC, Children, isValidElement, cloneElement } from 'react';
import styled from 'styled-components';

const StyledCarousel = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 0px;
  margin-left: -${20}px;
  grid-auto-flow: column;
  overflow-x: scroll;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  padding-bottom: 10px;

  &:before,
  &:after {
    content: '';
    width: 10px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselChild = styled.div`
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Carousel: FC = ({ children }) => {
  const wrapChildren = () =>
    Children.map(children, (child) => {
      if (isValidElement(child)) {
        return <CarouselChild>{cloneElement(child)}</CarouselChild>;
      }
    });

  const wrappedChildren = wrapChildren();

  return <StyledCarousel>{wrappedChildren}</StyledCarousel>;
};

export default Carousel;
