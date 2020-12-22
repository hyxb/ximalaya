/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconLeftCircle from './IconLeftCircle';
import IconPlayCircle from './IconPlayCircle';
import IconRightCircle from './IconRightCircle';
import IconTimeout from './IconTimeout';
import IconRightCircleFill from './IconRightCircleFill';
import IconPoweroffCircleFill from './IconPoweroffCircleFill';
import IconPlayCircleFill from './IconPlayCircleFill';
import IconPause from './IconPause';
import IconTubiaozhizuomobanyihuifu from './IconTubiaozhizuomobanyihuifu';
import IconHuabankaobei from './IconHuabankaobei';
import IconYinpinpianduan from './IconYinpinpianduan';
import IconYinpin from './IconYinpin';
import IconBottom from './IconBottom';
import IconArrowLeftBold from './IconArrowLeftBold';
import IconArrowUpBold from './IconArrowUpBold';
import IconCloseBold from './IconCloseBold';
import IconArrowDownBold from './IconArrowDownBold';
import IconMinusBold from './IconMinusBold';
import IconArrowRightBold from './IconArrowRightBold';
import IconSelectBold from './IconSelectBold';
import IconYiguanzhu from './IconYiguanzhu';
import IconWeiguanzhu from './IconWeiguanzhu';
import IconMine from './IconMine';
import IconMine2 from './IconMine2';
import Icon31Shoucangxuanzhong from './Icon31Shoucangxuanzhong';
import Icon31Shoucang from './Icon31Shoucang';
import Icon31Shouyexuanzhong from './Icon31Shouyexuanzhong';
import Icon31Shouye from './Icon31Shouye';
import Icon31Wodexuanzhong from './Icon31Wodexuanzhong';
import Icon31Wode from './Icon31Wode';
import IconActivity from './IconActivity';
import IconChart from './IconChart';
import IconCategory from './IconCategory';
import IconChat from './IconChat';
import IconHome from './IconHome';
import IconHeart from './IconHeart';
import IconLocation from './IconLocation';
import IconMessage from './IconMessage';
import IconSearch from './IconSearch';
import IconProfile from './IconProfile';
import IconStar from './IconStar';
import IconSetting from './IconSetting';

export type IconNames = 'icon-left-circle' | 'icon-play-circle' | 'icon-right-circle' | 'icon-timeout' | 'icon-right-circle-fill' | 'icon-poweroff-circle-fill' | 'icon-play-circle-fill' | 'icon-pause' | 'icon-tubiaozhizuomobanyihuifu-' | 'icon-huabankaobei-' | 'icon-yinpinpianduan' | 'icon-yinpin' | 'icon-bottom' | 'icon-arrow-left-bold' | 'icon-arrow-up-bold' | 'icon-close-bold' | 'icon-arrow-down-bold' | 'icon-minus-bold' | 'icon-arrow-right-bold' | 'icon-select-bold' | 'icon-yiguanzhu' | 'icon-weiguanzhu' | 'icon-mine' | 'icon-mine2' | 'icon-31shoucangxuanzhong' | 'icon-31shoucang' | 'icon-31shouyexuanzhong' | 'icon-31shouye' | 'icon-31wodexuanzhong' | 'icon-31wode' | 'icon-Activity' | 'icon-Chart' | 'icon-Category' | 'icon-Chat' | 'icon-Home' | 'icon-Heart' | 'icon-Location' | 'icon-Message' | 'icon-Search' | 'icon-Profile' | 'icon-Star' | 'icon-Setting';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-left-circle':
      return <IconLeftCircle key="1" {...rest} />;
    case 'icon-play-circle':
      return <IconPlayCircle key="2" {...rest} />;
    case 'icon-right-circle':
      return <IconRightCircle key="3" {...rest} />;
    case 'icon-timeout':
      return <IconTimeout key="4" {...rest} />;
    case 'icon-right-circle-fill':
      return <IconRightCircleFill key="5" {...rest} />;
    case 'icon-poweroff-circle-fill':
      return <IconPoweroffCircleFill key="6" {...rest} />;
    case 'icon-play-circle-fill':
      return <IconPlayCircleFill key="7" {...rest} />;
    case 'icon-pause':
      return <IconPause key="8" {...rest} />;
    case 'icon-tubiaozhizuomobanyihuifu-':
      return <IconTubiaozhizuomobanyihuifu key="9" {...rest} />;
    case 'icon-huabankaobei-':
      return <IconHuabankaobei key="10" {...rest} />;
    case 'icon-yinpinpianduan':
      return <IconYinpinpianduan key="11" {...rest} />;
    case 'icon-yinpin':
      return <IconYinpin key="12" {...rest} />;
    case 'icon-bottom':
      return <IconBottom key="13" {...rest} />;
    case 'icon-arrow-left-bold':
      return <IconArrowLeftBold key="14" {...rest} />;
    case 'icon-arrow-up-bold':
      return <IconArrowUpBold key="15" {...rest} />;
    case 'icon-close-bold':
      return <IconCloseBold key="16" {...rest} />;
    case 'icon-arrow-down-bold':
      return <IconArrowDownBold key="17" {...rest} />;
    case 'icon-minus-bold':
      return <IconMinusBold key="18" {...rest} />;
    case 'icon-arrow-right-bold':
      return <IconArrowRightBold key="19" {...rest} />;
    case 'icon-select-bold':
      return <IconSelectBold key="20" {...rest} />;
    case 'icon-yiguanzhu':
      return <IconYiguanzhu key="21" {...rest} />;
    case 'icon-weiguanzhu':
      return <IconWeiguanzhu key="22" {...rest} />;
    case 'icon-mine':
      return <IconMine key="23" {...rest} />;
    case 'icon-mine2':
      return <IconMine2 key="24" {...rest} />;
    case 'icon-31shoucangxuanzhong':
      return <Icon31Shoucangxuanzhong key="25" {...rest} />;
    case 'icon-31shoucang':
      return <Icon31Shoucang key="26" {...rest} />;
    case 'icon-31shouyexuanzhong':
      return <Icon31Shouyexuanzhong key="27" {...rest} />;
    case 'icon-31shouye':
      return <Icon31Shouye key="28" {...rest} />;
    case 'icon-31wodexuanzhong':
      return <Icon31Wodexuanzhong key="29" {...rest} />;
    case 'icon-31wode':
      return <Icon31Wode key="30" {...rest} />;
    case 'icon-Activity':
      return <IconActivity key="31" {...rest} />;
    case 'icon-Chart':
      return <IconChart key="32" {...rest} />;
    case 'icon-Category':
      return <IconCategory key="33" {...rest} />;
    case 'icon-Chat':
      return <IconChat key="34" {...rest} />;
    case 'icon-Home':
      return <IconHome key="35" {...rest} />;
    case 'icon-Heart':
      return <IconHeart key="36" {...rest} />;
    case 'icon-Location':
      return <IconLocation key="37" {...rest} />;
    case 'icon-Message':
      return <IconMessage key="38" {...rest} />;
    case 'icon-Search':
      return <IconSearch key="39" {...rest} />;
    case 'icon-Profile':
      return <IconProfile key="40" {...rest} />;
    case 'icon-Star':
      return <IconStar key="41" {...rest} />;
    case 'icon-Setting':
      return <IconSetting key="42" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
