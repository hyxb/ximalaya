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

let Icon31Shoucang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M946.44567 407.179676c-3.706415-11.056823-13.268188-19.154245-24.823362-20.929682l-263.117606-40.614L540.930913 93.91802c-5.108345-10.93198-16.071024-17.939581-28.155247-17.971303-0.030699 0-0.062422 0-0.062422 0-12.021801 0-22.985504 6.945179-28.155247 17.84646L365.79001 345.247138l-263.917832 39.507806c-11.399631 1.961678-20.774139 10.060123-24.355711 21.054525-3.613294 10.963703-0.778736 23.047926 7.257288 31.332612l191.202717 196.684568-45.6282 277.132808c-1.930979 11.741415 3.0208 23.608697 12.769838 30.491455 9.717316 6.882757 22.549575 7.630794 32.983205 1.868557l235.366565-129.47177 234.868215 130.282229c4.703115 2.616594 9.904581 3.924379 15.106046 3.924379 6.291287 0 12.551874-1.868557 17.877159-5.699816 9.748015-6.852058 14.763239-18.687618 12.862959-30.460756L747.488339 634.635061l191.669344-195.84341C947.286828 430.476265 950.121386 418.2365 946.44567 407.179676zM691.986257 602.337471c-6.882757 7.039323-10.060123 16.974603-8.471952 26.722618l37.000706 229.480508L526.666024 751.025908c-9.343809-5.232165-20.74344-5.232165-30.117948-0.062422L302.262138 857.856006l37.779442-229.387387c1.588171-9.717316-1.52575-19.652596-8.40953-26.754341L170.703847 436.176081l220.156142-31.686676c2.191922-0.378623 4.288676-0.980327 6.274914-1.771343 7.674796-2.63092 14.32117-8.233522 18.061354-16.156982l97.392144-206.183919 96.550986 206.712969c4.422729 9.406231 13.205766 16.008602 23.483854 17.596773l219.638349 33.886785L691.986257 602.337471z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Icon31Shoucang.defaultProps = {
  size: 18,
};

Icon31Shoucang = React.memo ? React.memo(Icon31Shoucang) : Icon31Shoucang;

export default Icon31Shoucang;