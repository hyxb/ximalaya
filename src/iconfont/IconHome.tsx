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

let IconHome: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M415.146667 118.954667a155.008 155.008 0 0 1 186.026666-5.12l6.826667 5.12 259.84 207.829333a127.957333 127.957333 0 0 1 49.066667 90.88l0.426666 8.533333v346.026667c0 89.173333-70.4 161.706667-158.72 166.4h-84.906666a78.08 78.08 0 0 1-76.373334-72.106667l-0.426666-5.973333v-122.026667a27.093333 27.093333 0 0 0-23.04-26.453333l-3.84-0.426667h-113.92a27.093333 27.093333 0 0 0-26.453334 23.04l-0.426666 3.84v121.6c0 2.56-0.426667 5.546667-0.853334 7.68l-0.426666 0.853334-0.426667 2.986666a77.738667 77.738667 0 0 1-72.106667 66.56L349.866667 938.666667H273.493333c-89.173333 0-162.133333-69.973333-166.826666-157.866667v-354.56a126.592 126.592 0 0 1 42.666666-93.44z m155.733333 46.506666a96.256 96.256 0 0 0-112.64-4.693333l-6.4 4.693333L192.426667 374.613333a66.133333 66.133333 0 0 0-26.026667 45.226667l-0.426667 6.826667v345.6c0 56.746667 44.373333 103.253333 100.693334 106.666666H349.866667c9.386667 0 17.493333-6.4 18.773333-15.36l0.853333-7.68 0.426667-2.133333v-115.2c0-45.653333 34.986667-82.773333 79.786667-86.186667h120.32c45.653333 0 82.773333 34.986667 86.186666 79.786667v128.426667c0 8.96 6.4 16.64 14.933334 18.346666h79.36a106.666667 106.666667 0 0 0 107.093333-99.84l0.426667-6.826666v-345.6a69.12 69.12 0 0 0-21.333334-48.213334l-5.546666-4.693333z"
        fill={getIconColor(color, 0, '#200E32')}
      />
    </Svg>
  );
};

IconHome.defaultProps = {
  size: 18,
};

IconHome = React.memo ? React.memo(IconHome) : IconHome;

export default IconHome;