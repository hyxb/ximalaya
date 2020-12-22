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

let IconPause: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M384 192H224a64 64 0 0 0-64 64v512a64 64 0 0 0 64 64h160a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64z m416 0h-160a64 64 0 0 0-64 64v512a64 64 0 0 0 64 64h160a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64z"
        fill={getIconColor(color, 0, '#231F20')}
      />
    </Svg>
  );
};

IconPause.defaultProps = {
  size: 18,
};

IconPause = React.memo ? React.memo(IconPause) : IconPause;

export default IconPause;
