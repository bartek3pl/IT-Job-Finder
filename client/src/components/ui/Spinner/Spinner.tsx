import React, { FC } from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

import colors from '@styles/colors';

const override = css`
  position: absolute;
  transform: translate(-50%, -50%);
  display: block;
  margin: 0 auto;
`;

interface SpinnerProps {
  styles?: any;
  color?: string;
  size?: number;
  loading: boolean;
}

const Spinner: FC<SpinnerProps> = ({ styles, size, color, loading }) => (
  <ClipLoader css={styles} size={size} color={color} loading={loading} />
);

Spinner.defaultProps = {
  styles: override,
  color: colors.primary,
  size: 90,
};

export default Spinner;
