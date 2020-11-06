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

let IconSearch: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M495.445333 85.333333c226.474667 0 410.069333 179.541333 410.069334 401.066667 0 104.490667-40.874667 199.68-107.861334 271.061333l131.754667 128.426667c12.330667 12.074667 12.373333 31.616 0 43.690667a32.128 32.128 0 0 1-41.088 3.072l-3.541333-2.986667-133.290667-130.005333a414.165333 414.165333 0 0 1-256.042667 87.765333C268.928 887.424 85.333333 707.84 85.333333 486.357333 85.333333 264.96 268.928 85.333333 495.445333 85.333333z m0 61.781334c-191.616 0-346.965333 151.893333-346.965333 339.242666 0 187.392 155.306667 339.285333 346.965333 339.285334 191.573333 0 346.88-151.893333 346.88-339.285334 0-187.349333-155.306667-339.242667-346.88-339.242666z"
        fill={getIconColor(color, 0, '#200E32')}
      />
    </Svg>
  );
};

IconSearch.defaultProps = {
  size: 18,
};

IconSearch = React.memo ? React.memo(IconSearch) : IconSearch;

export default IconSearch;
