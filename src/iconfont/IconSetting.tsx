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

let IconSetting: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M538.282667 85.333333c30.293333 0 59.221333 11.946667 80.298666 33.237334 21.077333 21.248 32.512 49.92 31.573334 76.757333l0.384 6.272c0.725333 6.229333 2.773333 12.202667 6.144 17.749333 6.485333 10.88 17.152 18.773333 29.653333 21.930667 12.458667 3.157333 25.685333 1.365333 38.229333-5.845333l6.997334-3.541334c52.48-24.149333 115.413333-4.949333 144.512 44.544l26.197333 44.501334c0.682667 1.152 1.28 2.389333 1.792 3.626666l2.432 4.736a108.202667 108.202667 0 0 1-37.717333 136.704l-10.965334 6.784a47.018667 47.018667 0 0 0-14.08 15.189334 46.677333 46.677333 0 0 0-4.992 36.138666c3.328 12.245333 11.52 22.613333 23.893334 29.653334l7.082666 4.48c21.546667 14.762667 37.077333 36.48 43.861334 61.397333 7.68 28.117333 3.541333 58.026667-11.605334 83.498667l-28.16 45.952-4.266666 6.485333c-33.024 46.592-97.237333 60.8-146.218667 33.109333l-5.802667-2.944a50.645333 50.645333 0 0 0-18.56-4.266666 48.128 48.128 0 0 0-48.768 49.237333l-0.341333 7.296C645.12 894.762667 596.650667 938.666667 538.282667 938.666667h-52.693334c-61.824 0-111.914667-49.066667-111.872-107.733334l-0.341333-6.272a44.586667 44.586667 0 0 0-6.314667-18.005333 48 48 0 0 0-29.354666-22.144c-12.373333-3.242667-25.6-1.493333-38.4 5.717333l-7.552 3.712a114.090667 114.090667 0 0 1-76.544 5.504 111.189333 111.189333 0 0 1-66.986667-51.84l-27.178667-45.994666-3.626666-6.826667a107.818667 107.818667 0 0 1 43.946666-140.672l4.437334-2.730667c13.184-8.96 21.077333-23.637333 21.077333-39.381333 0-17.109333-9.344-32.938667-25.6-42.154667l-6.656-4.181333a108.458667 108.458667 0 0 1-32.597333-145.365333l27.733333-44.586667a112.896 112.896 0 0 1 151.552-40.96l5.717333 2.986667c5.76 2.56 12.074667 3.968 18.133334 4.010666 26.709333 0 48.512-20.992 48.896-47.957333l0.384-8.277333a108.373333 108.373333 0 0 1 32.085333-67.968A112.725333 112.725333 0 0 1 485.589333 85.333333z m0 61.781334h-52.693334c-12.885333 0-25.258667 5.034667-34.389333 13.994666-8.064 7.936-12.970667 18.389333-13.866667 28.16l-0.554666 13.056C432.341333 258.986667 384 303.530667 324.821333 303.530667a111.744 111.744 0 0 1-45.610666-10.410667l-8.192-4.266667a49.621333 49.621333 0 0 0-67.029334 18.346667l-27.733333 44.586667a47.061333 47.061333 0 0 0 13.312 62.464l11.136 6.912A109.056 109.056 0 0 1 249.941333 512c0 36.053333-18.090667 69.717333-49.322666 90.88l-6.656 4.096c-21.845333 12.373333-30.293333 39.168-20.138667 60.245333l2.389333 4.565334 26.88 45.354666c6.272 11.178667 16.853333 19.370667 29.354667 22.869334 11.093333 3.072 22.954667 2.218667 32.170667-1.792l4.650666-2.218667a113.152 113.152 0 0 1 84.736-11.136 110.592 110.592 0 0 1 82.133334 94.293333l0.853333 15.061334c2.645333 23.978667 23.381333 42.666667 48.64 42.666666h52.650667c25.514667 0 46.677333-19.2 48.64-42.666666l0.256-4.693334a108.16 108.16 0 0 1 32.682666-77.781333 113.109333 113.109333 0 0 1 80.085334-32c14.933333 0.384 29.653333 3.669333 44.714666 10.282667l13.482667 6.741333c21.162667 9.088 46.250667 2.474667 58.965333-15.402667l3.114667-4.736 27.477333-44.885333a46.933333 46.933333 0 0 0-12.928-62.08l-11.648-7.253333a109.397333 109.397333 0 0 1-45.312-62.378667 107.221333 107.221333 0 0 1 11.306667-82.944c8.106667-13.909333 19.242667-25.856 33.792-35.754667l6.869333-4.224c21.845333-12.501333 30.293333-39.296 20.181334-60.458666l-2.986667-5.717334-0.554667-1.194666-24.96-42.453334a49.365333 49.365333 0 0 0-57.173333-21.888l-4.778667 1.877334-4.394666 2.176a113.536 113.536 0 0 1-84.650667 11.605333 111.232 111.232 0 0 1-68.096-50.346667 106.154667 106.154667 0 0 1-14.592-43.562666l-0.597333-10.794667a47.36 47.36 0 0 0-13.781334-34.730667 49.408 49.408 0 0 0-35.114666-14.506666z m-26.154667 225.450666c78.634667 0 142.336 62.421333 142.336 139.434667 0 77.013333-63.701333 139.434667-142.336 139.434667-78.592 0-142.336-62.421333-142.336-139.434667 0-77.013333 63.744-139.434667 142.336-139.434667z m0 61.781334c-43.776 0-79.274667 34.773333-79.274667 77.653333 0 42.88 35.498667 77.653333 79.274667 77.653333 43.776 0 79.274667-34.773333 79.274667-77.653333 0-42.88-35.498667-77.653333-79.274667-77.653333z"
        fill={getIconColor(color, 0, '#200E32')}
      />
    </Svg>
  );
};

IconSetting.defaultProps = {
  size: 18,
};

IconSetting = React.memo ? React.memo(IconSetting) : IconSetting;

export default IconSetting;
