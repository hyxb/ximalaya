import {Dimensions} from 'react-native';
/**
 * 此工具类用来屏幕适配
 */
const {width:viewportWidth,height:viewportHeight} = Dimensions.get('window');

//通过百分比计算宽度尺寸
function wp (percentage:number){
    const value = percentage * viewportWidth /100;
    return Math.round(value);
}

function hp (percentage:number){
    const value = percentage * viewportHeight /100;
    return Math.round(value);
}

export {
    viewportWidth,
    viewportHeight,
    wp,
    hp,
}