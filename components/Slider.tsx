import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ImageSliderType } from '@/data/SliderData';
import SliderItem from './SliderItem';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  useDerivedValue,
  scrollTo,
  runOnJS,
} from 'react-native-reanimated';

type Props = {
  itemList: ImageSliderType[];
};

const Slider = ({ itemList }: Props) => {
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const { width } = Dimensions.get('screen');

  const totalItems = itemList.length;

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        runOnJS(() => {
          if (offset.value >= (totalItems - 1) * width) {
            offset.value = 0; 
          } else {
            offset.value += width; 
          }
        })();
      }, 3000); 

    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay]); 

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  return (
    <View>
      <Animated.FlatList
        ref={ref}
        data={itemList}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
        keyExtractor={(item, index) => index.toString()} // Garante chaves únicas
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
