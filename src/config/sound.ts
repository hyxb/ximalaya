import { reject } from 'lodash';
import Sound from 'react-native-sound';

//静音模式下启用播放
Sound.setCategory('Playback');

let sound: Sound;

const initPlayer = (filepath: string) => {
    return new Promise<void>((resolve, reject) => {
        sound = new Sound(filepath, '', error => {
            if (error) {
                console.log("播放初始化失败", error);
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

const playComplete = () => {
    return new Promise((resolve, reject) => {
        sound.play(success => {
            if (success) {
                console.log('successfully finsiished playing');
                resolve(sound);
            } else {
                console.log('playback failed due to audio decoding errors');
                reject();
            }
        });
    });
};

const stop = () => {
    return new Promise<void>((resolve, reject) => {
        if (sound) {
            sound.stop(() => {
                resolve();
            });
        } else {
            reject();
        }
    });
};

//获取当前播放时间
const getCurrentTime = () => {
    return new Promise((resolve, reject) => {
        if (sound && sound.isLoaded()) {
            sound.getCurrentTime(seconds => {
                resolve(seconds);
            });
        } else {
            // reject();
            resolve(0);
        }
    });
};

//获取音频时长
const getDuration = () => {
    if (sound) {
        return sound.getDuration();
    }
    return 0;
}

//播放，知道播放完成才会返回
const play = () => {
    return new Promise<void>((resolve, reject) => {
        if (sound) {
            sound.play(success => {
                if (success) {
                    resolve();
                } else {
                    reject();
                }
                //释放资源
                sound.release();
            });
        } else {
            reject();
        }
    });
};

const pause = () => {
    return new Promise<void>(resolve => {
        if (sound) {
            sound.pause(() => {
                resolve();
            });
        } else {
            resolve();
        }
    });
};

const currentTimeChange = (currentTiem: number) => {
    return new Promise<void>((resolve, reject) => {
        if (sound) {
            sound.setCurrentTime(currentTiem);
        }
    })
}

export { sound, currentTimeChange,initPlayer, getCurrentTime, playComplete, stop, play, pause, getDuration };