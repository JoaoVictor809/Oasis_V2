import React from 'react';
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import Animated, { useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  // Animação para interpolar a cor de fundo
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1], 
      ['#ffffff', '#1261D7'], 
    ),
  }));

  // Renderiza o fundo com gradiente
  return (
    <Animated.View style={[style, containerAnimatedStyle]}>
      <LinearGradient
        colors={['#1261D7', '#CDDDF6', '#fff']}
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
};

export default CustomBackground;
