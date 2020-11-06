/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconYinpin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M517.45 162c16.52 0 29.91 13.391 29.91 29.91v685.18c0 16.519-13.39 29.91-29.91 29.91-16.519 0-29.91-13.391-29.91-29.91V191.91c0-16.519 13.391-29.91 29.91-29.91zM317.28 282.224c16.284 0 29.528 13.004 29.903 29.187l0.008 0.705v446.08c0 16.51-13.391 29.893-29.91 29.893-16.283 0-29.528-13.004-29.903-29.187l-0.008-0.705v-446.08c0-16.51 13.392-29.893 29.91-29.893z m402.64 0c16.283 0 29.527 13.004 29.902 29.187l0.009 0.705v446.08c0 16.51-13.392 29.893-29.91 29.893-16.284 0-29.528-13.004-29.903-29.187l-0.008-0.705v-446.08c0-16.51 13.391-29.893 29.91-29.893zM115.91 437.642c16.283 0 29.527 13.003 29.903 29.186l0.008 0.706V602.78c0 16.508-13.392 29.892-29.91 29.892-16.284 0-29.528-13.004-29.903-29.187L86 602.78V467.534c0-16.51 13.391-29.892 29.91-29.892z m804.18 0c16.283 0 29.527 13.003 29.902 29.186l0.008 0.706V602.78c0 16.508-13.391 29.892-29.91 29.892-16.283 0-29.527-13.004-29.903-29.187l-0.008-0.705V467.534c0-16.51 13.392-29.892 29.91-29.892z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconYinpin.defaultProps = {
  size: 18,
};

IconYinpin = React.memo ? React.memo(IconYinpin) : IconYinpin;

export default IconYinpin;
