import React from 'react';
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native';
/**
 * 自定义TouchableOpacityProps组件，
 * 导入TouchableOpacityProps
 * @param props 由上层组件导入
 */



 /**
  * 这里看不懂，要用直接复制就好
  */
const Touchable: React.FC<TouchableOpacityProps> = React.memo(
  ({style,...rest}) => {
      const touchableStyle = rest.disabled ? [style,styles.disabled] : style;
      return (
        <TouchableOpacity style={touchableStyle} activeOpacity={0.8} {...rest} />
      );
  },
);
const styles = StyleSheet.create({
  disabled:{
    opacity:0.5,
  }
})
export default Touchable;
