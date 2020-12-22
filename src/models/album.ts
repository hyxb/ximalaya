import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';

const ALBUM_URL = 'https://test.apilab.cn/v1/5fd0425960b22ade4c8e061d/album/list';

export interface IProgram {
    id: string;
    title: string;
    playVolume: number;
    duration: string;
    date: string;

}

export interface IAuthor {
    name: string;
    avatar: string;

}

export interface IAlbumModelState {
    id: string;
    title: string;
    summary: string;
    thumbnailUrl: string;
    introduction: string;
    author: IAuthor;
    list: IProgram[];

}

interface AlbumModel extends Model {
    namespace: 'album';
    state: IAlbumModelState;
    effects: {
        fetchAlbum: Effect;
    };
    reducers: {
        setState: Reducer<IAlbumModelState>;

    }
}

const initialState: IAlbumModelState = {
    id: '',
    thumbnailUrl: '',
    title: '',
    summary: '',
    list: [],
    introduction: '',
    author: {
        name: '',
        avatar: '',
    },
}

const albumModel: AlbumModel = {
    namespace: 'album',
    state: initialState,
    effects: {
        *fetchAlbum({ payload }, { call, put }) {
            const { data } = yield call(axios.get, ALBUM_URL);
            yield put({
                type: 'setState',
                payload: data,
            })
        }
    },
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    }
}

export default albumModel;