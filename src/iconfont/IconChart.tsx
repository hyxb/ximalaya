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

let IconChart: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M697.984 85.333333C842.666667 85.333333 938.666667 188.458667 938.666667 336.768v350.464C938.666667 835.541333 842.666667 938.666667 697.984 938.666667H325.973333C181.333333 938.666667 85.333333 835.541333 85.333333 687.232V336.768C85.333333 188.586667 181.589333 85.333333 326.016 85.333333z m0 59.52H325.973333c-110.592 0-181.162667 75.690667-181.162666 191.914667v350.464c0 116.352 70.357333 191.914667 181.162666 191.914667h371.968c110.805333 0 181.162667-75.52 181.162667-191.914667V336.768c0-116.352-70.357333-191.914667-181.162667-191.914667zM328.277333 410.88c15.104 0 27.52 11.178667 29.525334 25.728l0.256 4.010667v272.298666a29.781333 29.781333 0 0 1-59.264 4.010667l-0.256-4.010667v-272.298666c0-16.426667 13.312-29.738667 29.738666-29.738667z m185.216-130.304c15.104 0 27.562667 11.178667 29.525334 25.728l0.256 4.053333v402.56a29.781333 29.781333 0 0 1-59.264 4.010667l-0.256-4.010667V310.357333c0-16.469333 13.312-29.781333 29.738666-29.781333z m182.186667 274.176c15.104 0 27.562667 11.178667 29.525333 25.728l0.256 4.010667v128.426666a29.781333 29.781333 0 0 1-59.264 4.010667l-0.256-4.010667v-128.426666c0-16.426667 13.312-29.738667 29.781334-29.738667z"
        fill={getIconColor(color, 0, '#200E32')}
      />
    </Svg>
  );
};

IconChart.defaultProps = {
  size: 18,
};

IconChart = React.memo ? React.memo(IconChart) : IconChart;

export default IconChart;