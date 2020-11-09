import {wp, hp, viewportHeight, viewportWidth} from '@/utils/index';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import SnapCarousel, {
  AdditionalParallaxProps,
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import {ICarousel} from '@/models/home';
import {connect, ConnectedProps} from 'react-redux';
// import { RootStackNavigation } from '@/navigator/index';
import {RootState} from '@/models/index';

const sliderWidth = viewportWidth;
const sidewidth = wp(90);
const itemWidth = sidewidth + wp(2) * 2;

const sliderHeight = viewportHeight;
const sideHeight = hp(30);

const mapStateToProps = ({home}: RootState) => {
  // console.log("Carousel log",home.carousels.length);
  return {
    data: home.carousels,
    activeCarouseIndex: home.activeCarouseIndex,
  };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {}

class Carousel extends React.Component<IProps> {
  state = {
    activeSlide: 0,
  };

  onSnapToItem = (index: number) => {
  
    const {dispatch} = this.props;
    dispatch({
      type: 'home/setState',
      payload: {
        activeCarouseIndex: index,
      },
    });
  };

  renderItem = (
    {item}: {item: ICarousel},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item.image}}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.8}
        showSpinner
        spinnerColor="rgba(0,0,0,0.25)"
        {...parallaxProps}
      />
    );
  };

  get pagination() {
    const {data, activeCarouseIndex} = this.props;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotsLength={data.length}
          inactiveDotScale={0.8}
          activeDotIndex={activeCarouseIndex}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
        />
      </View>
    );
  }

  render() {
    const {data} = this.props;
    return (
      <View>
        <SnapCarousel
          data={data}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          renderItem={this.renderItem}
          onSnapToItem={this.onSnapToItem}
          hasParallaxImages
          loop
          autoplay
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: sideHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -25,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
});
export default connector(Carousel);
