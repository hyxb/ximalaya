import home, { HomeState } from '@/models/home';
import { DvaLoadingState } from 'dva-loading-ts';
import category from './category';

const models = [home, category];

console.log()

export type RootState = {
    home: typeof home.state,
    loading: DvaLoadingState,
    category: typeof category.state,
}

export default models;