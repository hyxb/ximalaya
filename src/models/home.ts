import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import Config from "react-native-config";
import { RootState } from ".";

//轮播图
const CAROUSEL_URL = '/mock/9203/carousel';

//猜你喜欢
const GUESS_URL = '/mock/9203/guess';

//首页列表
const CHANNEL_URL = '/mock/9203/channel';

export interface ICarousel {
    id: string;
    image: string;
    colors: [string, string];
}

export interface IGuess {
    id: string;
    title: string;
    image: string;
}

export interface IChannel {
    id: string;
    title: string;
    image: string;
    remark: string;
    played: number;
    playing: number;
}

export interface HomeState {
    carousels: ICarousel[],
    guess: IGuess[],
    channels: IChannel[],
}

interface HomeModel extends Model {
    namespace: 'home';
    state: HomeState;
    reducers?: {
        setState: Reducer<HomeState>;
    };
    effects?: {
        fetchCarousels: Effect;
        fetchGuess: Effect;
        fetchChannel: Effect;
    };
}


const initiaState: HomeState = {
    carousels: [],
    guess: [],
    channels: [],
}

const homeModel: HomeModel = {
    namespace: 'home',
    state: initiaState,
    reducers: {
        setState(state = initiaState, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
    effects: {
        *fetchCarousels(_, { call, put }) {
            const { data } = yield call(axios.get, CAROUSEL_URL);
            console.log('runbotushuju', data);
            yield put({
                type: 'setState',
                payload: {
                    carousels: data,
                },
            });
        },

        *fetchGuess(_, { call, put }) {
            const { data } = yield call(axios.get, GUESS_URL);
            yield put({
                type: 'setState',
                payload: {
                    guess: data,
                }
            })
        },

        *fetchChannel({ callback, payload }, { call, put, select }) {
            const { channels } = yield select((state: RootState) => state.home)
            const { data } = yield call(axios.get, CHANNEL_URL);
            let newChannels = data.results;
            if (payload && payload.loadMore) {
                newChannels = channels.concat(newChannels);
            }
            yield put({
                type: 'setState',
                payload: {
                    channels: newChannels,
                }
            })
        }
    },
};

export default homeModel;