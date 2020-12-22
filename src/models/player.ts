import { initPlayer, pause, play, getCurrentTime, getDuration, stop,currentTimeChange } from '@/config/sound';
import axios from 'axios';
import { Effect, EffectsCommandMap, EffectWithType, Model, ReducerEnhancer } from 'dva-core-ts';
import { call } from 'react-native-reanimated';
import { Reducer } from 'redux';
import { RootState } from '.';

const SHOW_URL = 'https://test.apilab.cn/v1/5fd0425960b22ade4c8e061d/albumdetails';


export interface PlayerModelState {
    id: string,
    soundUrl: string,
    playState: string,
    currentTime: number,
    duration: number,
    previousId: string,
    nextId: string,
    sounds: { id: string; title: string }[],
    title: string,
    thumbnailUrl:string,
};

export interface PlayerModel extends Model {
    namespace: 'player';
    state: PlayerModelState;
    reducers: {
        setState: Reducer<PlayerModelState>;
    };
    effects: {
        fetchShow: Effect;
        play: Effect;
        pause: Effect;
        watherCurrentTime: EffectWithType;
        previous: Effect;
        next: Effect;
        currentChange:Effect;
    }
}

const initiaState: PlayerModelState = {
    id: '32131',
    soundUrl: "none",
    playState: "none",
    currentTime: 0,
    duration: 0,
    previousId: '',
    nextId: '',
    sounds: [],
    title: 'music',
    thumbnailUrl:'',
}

// const getDuration = () => {  }

const delay = (timeout: number) => new Promise(resolve => setTimeout(resolve))

function* CurrentTime({ call, put }: EffectsCommandMap) {
    while (true) {
        yield call(delay, 1000)
        const currentTime = yield call(getCurrentTime, () => { });
        yield put({
            type: 'setState',
            payload: {
                currentTime: currentTime
            }
        })
    }
}

const playerModel: PlayerModel = {
    namespace: 'player',
    state: initiaState,
    reducers: {
        setState(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *fetchShow({ payload }, { call, put }) {
            const { data } = yield call(axios.get, SHOW_URL,
                { params: { id: payload.id } }
            );

            yield call(initPlayer, data.soundUrl);

            // console.log('--fetchShow--:', data);
            yield put({
                type: 'setState',
                payload: {
                    id: payload.id,
                    soundUrl: data.soundUrl,
                    duration: getDuration(),
                },
            });

            //根据获取到的url调用初始化函数
            console.log('sound Url is:', data.soundUrl);
            yield put({
                type: 'play',
            });
        },
        *play({ playload }, { call, put }) {
            // console.log('')
            yield put({
                type: 'setState',
                payload: {
                    playState: 'playing',
                },
            });
            try {
                yield call(play);
            } catch (e) {
                console.log('播放音频失败：', e);
            }
            /**
             * 调用play后播放音乐，完成后调用回调函数释放资源
             * 然更改playState状态为paused暂停
             */
            yield put({
                type: 'setState',
                payload: {
                    playState: 'paused',
                }
            });
        },
        *pause({ payload }, { call, put }) {
            yield call(pause);
            yield put({
                type: 'setState',
                payload: {
                    playState: 'plauseding'
                }
            });
        },
        watherCurrentTime: [function* (sagaEffects) {
            const { call, take, race } = sagaEffects;

            while (true) {
                yield take('play');
                yield race([call(CurrentTime, sagaEffects), take('pause')])
            }
        }, { type: 'watcher' }],
        *previous({ payload }, { put, call, select }) {
            yield call(stop);
            // yield put({
            //     type: 'setState',
            //     payload: {
            //     },
            // });
            const { id, sounds }: PlayerModelState = yield select(({ player }: RootState) => player);
            const index = sounds.findIndex(item => item.id === id);
            const currentIndex = index - 1;
            const currentItem = sounds[currentIndex];
            const previousItem = sounds[currentIndex - 1];
            yield put({
                type: 'setState',
                payload: {
                    playState: 'paused',
                    id: currentItem.id,
                    title: currentItem.title,
                    previousId: previousItem ? previousItem.id : '',
                    nextID: id
                }
            });
            yield put({
                type: 'fetchShow',
                payload: {
                    id: currentItem.id
                }
            })
        },
        *next({ payload }, { put, call, select }) {
            yield call(stop);
            const { id, sounds }: PlayerModelState = yield select(({ player }: RootState) => player);
            const index = sounds.findIndex(item => item.id === id);
            const currentIndex = index + 1;
            const currentItem = sounds[currentIndex];
            const nextItem = sounds[currentIndex + 1];
            yield put({
                type: 'setState',
                payload: {
                    playState: 'paused',
                    id: currentItem.id,
                    title: currentItem.title,
                    previousId: id,
                    nextID: nextItem ? nextItem.id : '',
                }
            });
            yield put({
                type: 'fetchShow',
                payload: {
                    id: currentItem.id
                }
            })
        },
        *currentChange({payload},{call,put}){
            const {currentTime} = payload
            yield call(currentTimeChange,currentTime)
        }
    }
}

export default playerModel;