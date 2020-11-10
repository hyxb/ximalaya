import storage, { load } from "@/config/storage";
import Axios from "axios";
import { Effect, Model, SubscriptionsMapObject } from "dva-core-ts";
import { Reducer } from 'redux';


const CATEGORY_URL = 'https://yapi.baidu.com/mock/9203/category';

export interface ICategory {
    id: string;
    name: string;
    classify?: string;
}

interface CategoryModelState {
    myCategorys: ICategory[];
    categorys: ICategory[];
}


//第一步继承全局model对象
interface CategoryModel extends Model {
    namespace: 'category',
    state: CategoryModelState,
    effects: {
        loadData: Effect;

    };
    reducers: {
        setState: Reducer<CategoryModelState>;
    };
    subscriptions: SubscriptionsMapObject;
}

const initiaState = {
    myCategorys: [
        {
            id: 'home',
            name: 'tuijian',
        },
        {
            id: 'vip',
            name: 'vip',
        },
    ],
    categorys: [],
}

const categoryModel: CategoryModel = {
    namespace: 'category',
    state: initiaState,
    effects: {
        *loadData(_, { call, put }) {
            //从storage获取数据
            const myCategorys = yield call(load, { key: 'myCategorys' })
            const categorys = yield call(load, { key: 'categorys' });
            //如果获取的数据没有myCategorys，则发起action，将myCategorys，categorys保存到state
            //如果有myCategorys，则只保存categorys
            if (myCategorys) {
                yield put({
                    type: 'setState',
                    payload: {
                        myCategorys,
                        categorys,
                    }
                })
            } else {
                yield put({
                    type: 'setState',
                    payload: {
                        categorys,
                    }
                })
            }
        }
    },
    reducers: {
        //用来保存更新的值，反正一般都是这样用的
        setState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    },
    subscriptions: {
        /**
         * subscriptions中的函数会在dva数据加载完成后执行，执行action
         * @param param0 
         */
        setup({ dispatch }) {
            dispatch({ type: 'loadData' });
        },
        asyncStorage() {
            //自动同步方法
            storage.sync.categorys = async () => {
                const { data } = await Axios.get(CATEGORY_URL);
                return data;
            };
            storage.sync.myCategorys = async () => {
                return null;
            }
        }
    }
}

export default categoryModel;