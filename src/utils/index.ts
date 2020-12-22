import { NavigationState } from '@react-navigation/native';
import { Dimensions } from 'react-native';
/**
 * 此工具类用来屏幕适配
 */
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

//通过百分比计算宽度尺寸
function wp(percentage: number) {
    const value = percentage * viewportWidth / 100;
    return Math.round(value);
}

function hp(percentage: number) {
    const value = percentage * viewportHeight / 100;
    return Math.round(value);
}

/**
 * 获取焦点页面的路由名字
 */
function getActiveRouteName(state: NavigationState) {
    let route;
    route = state.routes[state.index];
    while (route.state && route.state.index) {
        route = route.state.routes[route.state.index];
    }
    return route.name;
}


function formaTime(seconds: number) {
    const m = parseInt((seconds % (60 * 60)) / 60 + '', 10);
    const s = parseInt((seconds % 60) + '', 10);
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}


export {
    viewportWidth,
    viewportHeight,
    wp,
    hp,
    getActiveRouteName,
    formaTime,
}