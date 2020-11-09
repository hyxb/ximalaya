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

export interface IPagination {
    current: number,
    total: number,
    hasMore: boolean,
}

export interface HomeState {
    carousels: ICarousel[],
    activeCarouseIndex:number; //当前轮播图的标
    guess: IGuess[],
    channels: IChannel[],
    pagination: IPagination[],
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
    activeCarouseIndex:0,
    guess: [],
    channels: [],
    pagination: [{
        current: 1,
        total: 0,
        hasMore: true,
    }]
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
            console.log('轮播图数据', data);
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
            const { channels, pagination } = yield select((state: RootState) => state.home)
            let page = 1;

            if (payload && payload.loadMore) {
                page = pagination.current + 1;
            }


            const { data } = yield call(axios.get, CHANNEL_URL, {
                params: {
                    page,
                }
            });
            let newChannels = data.results;
            if (payload && payload.loadMore) {
                newChannels = channels.concat(newChannels);

            }

            yield put({
                type: 'setState',
                payload: {
                    channels: newChannels,
                    pagination: {
                        current: data.pagination.total,
                        total: data.pagination.total,
                        hasMore: newChannels.length < data.pagination.total,
                    }
                }
            })

            if (typeof callback === 'function') {
                console.log('this is Models CallBack!');
                callback();
            }
        }
    },
};

export default homeModel;