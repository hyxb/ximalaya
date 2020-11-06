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

let IconYinpinpianduan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 128a32 32 0 0 1 32 32v704a32 32 0 1 1-64 0v-704A32 32 0 0 1 512 128zM320 256a32 32 0 0 1 32 32v448a32 32 0 1 1-64 0v-448A32 32 0 0 1 320 256z m384 0a32 32 0 0 1 32 32v448a32 32 0 1 1-64 0v-448A32 32 0 0 1 704 256z m192 128a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0v-192A32 32 0 0 1 896 384zM128 384a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0v-192A32 32 0 0 1 128 384z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconYinpinpianduan.defaultProps = {
  size: 18,
};

IconYinpinpianduan = React.memo ? React.memo(IconYinpinpianduan) : IconYinpinpianduan;

export default IconYinpinpianduan;
