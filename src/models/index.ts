import home, { HomeState } from '@/models/home';
import { DvaLoadingState } from 'dva-loading-ts';

const models = [home];

console.log()
export type RootState = {
    home:typeof home.state;
}

export default models;