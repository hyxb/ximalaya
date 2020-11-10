import AsyncStorage from '@react-native-community/async-storage';
import Storage, { LoadParams } from 'react-native-storage';


const storage = new Storage({
    size: 1000, //最大容量
    storageBackend: AsyncStorage, //数据引擎
    defaultExpires: 1000 * 3600 * 24 * 7,//过期时间
    enableCache: true,//是否缓存
    sync: {}
});

/**
 * 做封装，避免dva直接调用load引发的this关键字变化引起的错误
 */
const load = (params: LoadParams) => {
    return storage.load(params);
};

export { load };

export default storage;