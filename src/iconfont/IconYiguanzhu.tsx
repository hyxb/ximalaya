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

let IconYiguanzhu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M510.39744 298.75712C395.13088 24.255488 53.377024 88.508416 65.26464 406.877184c6.569984 174.884864 185.560064 255.371264 278.36416 340.880384 90.631168 83.576832 129.665024 111.694848 167.640064 149.474304 32.173056-32.659456 76.910592-62.802944 166.283264-149.474304 91.117568-88.50432 262.523904-170.923008 278.272-342.813696C985.101312 86.9632 620.352512 35.270656 510.39744 298.75712z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconYiguanzhu.defaultProps = {
  size: 18,
};

IconYiguanzhu = React.memo ? React.memo(IconYiguanzhu) : IconYiguanzhu;

export default IconYiguanzhu;
