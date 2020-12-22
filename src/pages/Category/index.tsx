import {ICategory} from '@/models/category';
import {RootState} from '@/models/index';
import {viewportWidth} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import _ from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
import Item, {itemHeight, margin} from '@/pages/Category/item';
import {RootStackNavigation} from '@/navigator/index';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';

import {DragSortableView} from 'react-native-drag-sort';

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategorys: category.myCategorys,
    categorys: category.categorys,
    isEdit: category.isEdit,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

interface IState {
  myCategorys: ICategory[];
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;

const fixedItems = [0, 1];

class Category extends React.Component<IProps> {
  state = {
    myCategorys: this.props.myCategorys,
  };

  constructor(props: IProps) {
    super(props);
    props.navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit} />,
    });
  }

  componentWillUnMount() {
    const {dispatch, categorys} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: false,
      },
    });
  }

  onSubmit = () => {
    const {dispatch, categorys, isEdit, navigation} = this.props;
    const {myCategorys} = this.state;
    dispatch({
      type: 'category/toggle',
      payload: {
        myCategorys: myCategorys,
      },
    });
    if (isEdit) {
      navigation.goBack();
    }
    // console.log("isEdit:",isEdit);
    // if(isEdit){
    //   dispatch({
    //     type:''
    //   })
    // }
  };

  onLongPress = () => {
    const {dispatch, categorys} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true,
      },
    });
  };

  onPress = (item: ICategory, index: number, selected: boolean) => {
    const {isEdit} = this.props;
    const {myCategorys} = this.state;
    if (isEdit) {
      if (selected) {
        this.setState({
          myCategorys: myCategorys.filter(
            (selectedItem) => selectedItem.id !== item.id,
          ),
        });
      } else {
        this.setState({
          myCategorys: myCategorys.concat([item]),
        });
      }
    }
  };

  onClickItem = (data: ICategory[], item: ICategory) => {
    this.onPress(item, data.indexOf(item), true);
  };

  //dragsortz再拖拽后的回调函数
  onDataChange = (data: ICategory[]) => {
    this.setState({
      myCategorys: data,
    });
  };

  renderItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      // <Touchable
      //   key={item.id}
      //   onPress={() => this.onPress(item, index, true)}
      //   onLongPress={this.onLongPress}>
      // </Touchable>

      <Item
        key={item.id}
        data={item}
        isEdit={isEdit}
        selected={true}
        disabled={disabled}
      />
    );
  };

  renderUnSelectedItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    return (
      <Touchable
        key={item.id}
        onPress={() => this.onPress(item, index, false)}
        onLongPress={this.onLongPress}>
        <Item data={item} isEdit={isEdit} selected={false} disabled={false} />
      </Touchable>
    );
  };

  render() {
    const {categorys, isEdit} = this.props;
    const {myCategorys} = this.state;
    const calssifyGroup = _.groupBy(categorys, (item) => item.classify);

    return (
      <View style={styles.container}>
        <Text style={styles.classifyName}>我的分类</Text>
        <View style={styles.classifyView}>
          {/* {myCategorys.map(this.renderItem)}
           */}
          <DragSortableView
            dataSource={myCategorys}
            renderItem={this.renderItem}
            fixedItems={fixedItems}
            sortable={isEdit}
            keyExtractor={(item) => item.id}
            onDataChange={this.onDataChange}
            parentWidth={parentWidth}
            childrenWidth={itemWidth}
            childrenHeight={itemHeight}
            marginChildrenTop={margin}
            onClickItem={this.onClickItem}
          />
        </View>
        <View>
          {Object.keys(calssifyGroup).map((classify) => {
            return (
              <View key={classify}>
                <Text style={styles.classifyName}>{classify}</Text>
                <View style={styles.classifyView}>
                  {calssifyGroup[classify].map((item, index) => {
                    if (
                      myCategorys.find(
                        (selectedItem) => selectedItem.id === item.id,
                      )
                    ) {
                      return null;
                    }
                    return this.renderUnSelectedItem(item, index);
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </View>
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
