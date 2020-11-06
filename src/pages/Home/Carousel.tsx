import {wp, hp, viewportHeight, viewportWidth} from '@/utils/index';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import SnapCarousel, {
  AdditionalParallaxProps,
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import {ICarousel} from '@/models/home'

const sliderWidth = viewportWidth;
const sidewidth = wp(90);
const itemWidth = sidewidth + wp(2) * 2;

const sliderHeight = viewportHeight;
const sideHeight = hp(30);

interface IProps {
  data: ICarousel[],
}

class Carousel extends React.Component<IProps> {
  state = {
    activeSlide: 0,
  };

  onSnapToItem = (index: number) => {
    this.setState({
      activeSlide: index,
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
    const {data} = this.props;
    const {activeSlide} = this.state;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotsLength={data.length}
          inactiveDotScale={0.8}
          activeDotIndex={activeSlide}
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
export default Carousel;
