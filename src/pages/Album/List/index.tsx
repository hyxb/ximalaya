import React from 'react';
import {View, Text, ListRenderItemInfo, Alert, StyleSheet} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {IProgram} from '@/models/album';
// import {itemHeight} from '@/pages/Category/item';
import Item from './Item';
import {ITabProps} from '@/pages/Album/Tab'
const mapStateToprops = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToprops);

type ModelState = ConnectedProps<typeof connector>;

type IProps = ModelState & ITabProps;

class List extends React.Component<IProps> {
  onPress = (data: IProgram,index:number) => {
    // Alert.alert('节目');
    const {onItemPress} = this.props;
    onItemPress(data,index);
  };

  keyExtractor = (item: IProgram) => {
    return item.id;
  };
  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={this.onPress} />;
  };

  render() {
    const {list} = this.props;
    return (
      <FlatList
        data={list}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
  }
})

export default connector(List);
