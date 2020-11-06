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

let IconMessage: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M705.066667 128a235.434667 235.434667 0 0 1 170.154666 75.648A237.568 237.568 0 0 1 938.24 378.026667l-0.085333 266.112a238.933333 238.933333 0 0 1-62.976 176.213333A235.605333 235.605333 0 0 1 704.725333 896h-386.56C182.869333 896 85.333333 786.688 85.333333 646.016V377.984C85.333333 237.312 182.912 128 318.122667 128z m-0.725334 65.194667H318.122667c-97.834667 0-168.064 78.677333-168.064 184.789333v268.032c0 106.112 70.229333 184.746667 168.106666 184.746667h386.176a170.88 170.88 0 0 0 123.52-54.912 174.805333 174.805333 0 0 0 45.653334-129.834667l0.042666-269.952a173.397333 173.397333 0 0 0-45.696-127.914667 170.88 170.88 0 0 0-123.52-54.954666z m64.682667 175.36c10.154667 12.8 9.216 30.933333-1.536 42.581333l-3.498667 3.285333-175.232 141.226667a123.306667 123.306667 0 0 1-145.749333 4.906667l-6.869333-5.077334-176.426667-140.970666a32.768 32.768 0 0 1-5.205333-45.824 32.213333 32.213333 0 0 1 41.514666-7.978667l3.968 2.688 176.170667 140.842667a58.88 58.88 0 0 0 67.413333 3.797333l5.034667-3.541333 174.933333-141.013334a32.213333 32.213333 0 0 1 45.482667 5.12z"
        fill={getIconColor(color, 0, '#200E32')}
      />
    </Svg>
  );
};

IconMessage.defaultProps = {
  size: 18,
};

IconMessage = React.memo ? React.memo(IconMessage) : IconMessage;

export default IconMessage;
