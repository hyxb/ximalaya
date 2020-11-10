import {ICategory} from '@/models/category';
import {viewportWidth} from '@/utils/index';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IProps {
  data: ICategory;
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;

class Item extends React.Component<IProps> {
  render() {
    const {data} = this.props;
    return (
      <View key={data.id} style={styles.itemView}>
        <View style={styles.itemCotainer}>
          <Text>{data.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemView: {
    width: itemWidth,
  },
  itemCotainer: {
    height: 46,
    backgroundColor: '#fff',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Item;