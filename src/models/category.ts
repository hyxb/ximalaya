import storage, { load } from "@/config/storage";
import Axios from "axios";
import { Effect, Model, SubscriptionsMapObject } from "dva-core-ts";
import { Reducer } from 'redux';
import { RootState } from "@/models/index";


const CATEGORY_URL = 'https://test.apilab.cn/v1/5fd0425960b22ade4c8e061d/category';

export interface ICategory {
    id: string;
    name: string;
    classify?: string;
}

interface CategoryModelState {
    myCategorys: ICategory[];
    categorys: ICategory[];
    isEdit: boolean;
}


//第一步继承全局model对象
interface CategoryModel extends Model {
    namespace: 'category',
    state: CategoryModelState,
    effects: {
        loadData: Effect;
        toggle: Effect; //切换编辑状态，
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
            name: '推荐',
        },
        {
            id: 'vip',
            name: 'VIP',
        },
    ],
    categorys: [],
    isEdit: false,
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
        },
        *toggle({ payload }, { select, put }) {
            const category = yield select(({ category }: RootState) => category);
            /**
             * toggle可以用来更改编辑按钮的选中状态，并且将myCategorys提交到本地dva仓库
             * 然后提交到持久化库中，以便下次启动读取数据，
             */
            yield put({
                type: 'setState',
                payload: {
                    isEdit: !category.isEdit,
                    myCategorys: payload.myCategorys,
                }
            });
            storage.save({
                key: 'myCategorys',
                data: payload.myCategorys,
            });
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
         * @param param
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