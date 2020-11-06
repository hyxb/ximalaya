import IconFont from '@/iconfont/index';
import {IChannel} from '@/models/home';
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Touchable from '@/components/Touchable';
interface IProps {
  data: IChannel;
  onPress: (data: IChannel) => void;
}

class ChannelItem extends React.PureComponent<IProps> {
  onPress = () => {
    const {onPress, data} = this.props;
    if (typeof onPress === 'function') {
      onPress(data);
    }
  };

  render() {
    const {data} = this.props;
    return (
      <Touchable style={styles.container} onPress={this.onPress}>
        <Image source={{uri: data.image}} style={styles.image} />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}
          </Text>
          <Text style={styles.remake} numberOfLines={2}>
            {data.remark}
          </Text>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomItem}>
              <IconFont name={'icon-huabankaobei-'} size={14} />
              <Text>{data.played}</Text>
            </View>
            <View style={styles.bottomItem}>
              <IconFont name={'icon-yinpinpianduan'} size={14} />
              <Text>{data.playing}</Text>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#dedede',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  remake: {
    backgroundColor: '#f8f8f8',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 5,
    marginRight: 10,
  },
});
export default ChannelItem;
