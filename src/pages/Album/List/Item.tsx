import Touchable from '@/components/Touchable';
import IconFont from '@/iconfont/index';
import {IProgram} from '@/models/album';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  data: IProgram;
  index: number;
  onPress?: (data: IProgram,index:number) => void;
}

class Item extends React.Component<IProps> {
  onPress = () => {
    const {onPress, data,index} = this.props;
    if (typeof onPress === 'function') {
      onPress(data,index);
    }
  };

  render() {
    const {data, index} = this.props;
    return (
      <Touchable style={styles.item} onPress={this.onPress}>
        <Text style={styles.index}>{index + 1} </Text>
        <View style={styles.container}>
          <Text>{data.title}</Text>
          <View style={styles.info}>
            <View style={styles.iconView}>
              <IconFont name="icon-tubiaozhizuomobanyihuifu-" color="#939393" />
              <Text style={styles.iconText}>{data.playVolume} </Text>
            </View>
            <View style={styles.iconView}>
              <IconFont name="icon-tubiaozhizuomobanyihuifu-" color="#939393" />
              <Text style={styles.iconText}>{data.duration} </Text>
            </View>
          </View>
        </View>
        <View style={{width:86}}>
          <Text style={styles.data}>{data.date}</Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    borderBottomColor: '#939393',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight:'800',
  },
  container: {
    flex: 1,
    marginHorizontal: 25,
    fontWeight: '800',
  },
  index: {
    fontSize: 14,
    color: '#828282',
    marginRight: 25,
  },
  info: {
    flexDirection: 'row',
    marginTop: 15,
  },
  iconView: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconText:{
    marginHorizontal:5,
    color:'#939393',
  },
  data:{
    color:'#939393',
  }
});
export default Item;
