import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Path, Defs, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const WaveCircularProgress = ({ progress = 50 }) => {
  const waveHeight = useSharedValue(10);
  const waveOffset = useSharedValue(0); 

  useEffect(() => {
    waveOffset.value = withRepeat(
      withTiming(260, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const height = 100 - progress;
    const frequency = 10;
    const amplitude = waveHeight.value;
    const offset = waveOffset.value;

    let wavePath = `M0,${height} `;
    for (let x = 0; x <= 120; x += 5) {
      const y = height + amplitude * Math.sin((x + offset) * (Math.PI / 50));
      wavePath += `L${x},${y} `;
    }

    wavePath += `V100 H0 Z`;

    return { d: wavePath };
  });

  return (
    <View style={styles.waveContainer}>
      <Svg width={120} height={120} viewBox="0 0 120 100">
        <Defs>
          <ClipPath id="clip">
            <Circle cx="60" cy="50" r="40" />
          </ClipPath>
        </Defs>

        {/* Fundo do círculo */}
        <Circle cx="60" cy="50" r="40" stroke="#ddd" strokeWidth="5" fill="none" />

        {/* Onda animada */}
        <AnimatedPath animatedProps={animatedProps} fill="white" clipPath="url(#clip)" />

        {/* Borda do círculo */}
        <Circle cx="60" cy="50" r="40" stroke="white" strokeWidth="5" fill="none" />
      </Svg>
    </View>
  );
};

export default function TelaLoading() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("./main/pagesRoot/studyPlanEnem"); 
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <WaveCircularProgress progress={60} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1261D7",
    justifyContent: "center",
    alignItems: "center",
  },
  waveContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
