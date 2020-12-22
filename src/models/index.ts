import home, { HomeState } from '@/models/home';
import { DvaLoadingState } from 'dva-loading-ts';
import album from './album';
import category from './category';
import player from './player';

const models = [home, category,album,player];

console.log()

export type RootState = {
    home: typeof home.state,
    loading: DvaLoadingState,
    category: typeof category.state,
    album:typeof album.state,
    player:typeof player.state,
} & {
    [key: string]: typeof home.state,
}

export default models;