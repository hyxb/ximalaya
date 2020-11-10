import {ICategory} from '@/models/category';
import {RootState} from '@/models/index';
import {viewportWidth} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import _ from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
import Item from '@/pages/Category/item';

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategorys: category.myCategorys,
    categorys: category.categorys,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

interface IState {
  myCategorys: ICategory[];
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;

class Category extends React.Component<IProps> {
  state = {
    myCategorys: this.props.myCategorys,
  };

  renderItem = (item: ICategory, index: number) => {
    return <Item data={item} />;
  };

  render() {
    const {categorys} = this.props;
    const {myCategorys} = this.state;
    const calssifyGroup = _.groupBy(categorys, (item) => item.classify);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.classifyName}>我的分类</Text>
        <View style={styles.classifyView}>
          {myCategorys.map(this.renderItem)}
        </View>
        <View>
          {Object.keys(calssifyGroup).map((classify) => {
            return (
              <View key={classify}>
                <Text style={styles.classifyName}>{classify}</Text>
                <View style={styles.classifyView}>
                  {calssifyGroup[classify].map(this.renderItem)}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f6',
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
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

//使用connector返回新的组件
export default connector(Category);
