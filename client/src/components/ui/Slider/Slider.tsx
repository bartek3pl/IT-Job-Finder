import React, { FC, ChangeEvent } from 'react';
import styled from 'styled-components';
import { withStyles } from '@bit/mui-org.material-ui.styles';
import Slider from '@bit/mui-org.material-ui.slider';

import colors from '@styles/colors';

type Value = number | number[];

interface SliderProps {
  value?: Value;
  min?: number;
  max?: number;
  marks?: boolean;
  handleChange: (event: ChangeEvent<{}>, value: Value) => void;
}

const valuetext = (value: number) => {
  return `PLN ${value}k`;
};

const PrettoSlider = withStyles({
  root: {
    color: colors.contrast,
  },
  thumb: {
    height: 50,
    width: 50,
    backgroundColor: colors.white,
    border: '4px solid currentColor',
    marginTop: -23,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  track: {
    height: 5,
    borderRadius: 5,
  },
  rail: {
    height: 5,
    borderRadius: 5,
  },
})(Slider);

const SliderWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const CustomSlider: FC<SliderProps> = ({
  value,
  min,
  max,
  marks,
  handleChange,
}) => {
  return (
    <SliderWrapper>
      <PrettoSlider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        min={min}
        max={max}
        marks={marks}
      />
    </SliderWrapper>
  );
};

CustomSlider.defaultProps = {
  value: undefined,
  min: 0,
  max: 50,
  marks: false,
  handleChange: () => {},
};

export default CustomSlider;
