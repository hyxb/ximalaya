import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
/**
 * 自定义TouchableOpacityProps组件，
 * 导入TouchableOpacityProps
 * @param props 由上层组件导入
 */


const Touchable: React.FC<TouchableOpacityProps> = React.memo((props) => (
  <TouchableOpacity activeOpacity={0.9} {...props} />
));

export default Touchable;
 