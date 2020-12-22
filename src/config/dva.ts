import { create, Model } from 'dva-core-ts';
import models from '@/models/index';
import createLoading from 'dva-loading-ts';
import modelExtend from 'dva-model-extend';
import homeModel from '@/models/home'

// 1.创建实例
const app = create();

// 2.加载model对象
models.forEach(model => {
    app.model(model);
});

app.use(createLoading());
//3 . 启动dva
app.start();
//4. 到处dva的数据
export default app._store;

interface Cached {
    [key: string]: boolean;
}

const cached: Cached = {
    home: true,
}

/**
 * 传入model，判断model的namespace是否存在于cached中，
 * 如果没有，通过app.model插入model，将cached[model.namespace]设置为true
 * @param model 
 */
function registerModel(model: Model) {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = true
    }
}

/**
 * 创建model方法，传入namespace，
 * @param namespace 命名空间
 */
export function createHomeModel(namespace: string) {
    /**
     * modelExtend根据传入的model和namespace生成不同命名空间的扩展model
     */
    const model = modelExtend(homeModel, { namespace });
    registerModel(model);
}