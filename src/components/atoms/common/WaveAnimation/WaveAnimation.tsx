import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  Canvas,
  LinearGradient,
  Path,
  Skia,
  useClockValue,
  useComputedValue,
  useTouchHandler,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import { line, curveBasis } from 'd3';
import React, { useEffect } from 'react';
import { useTheme } from 'react-native-paper';
const dimension = Dimensions.get('window');
const width = dimension.width;
const height = dimension.height;
const frequency = 2;
const initialAmplitude = 10;
const initialVerticalOffset = 100;

type Props = {
  waterPercent: number;
};
export default function WaveAnimation({ waterPercent }: Props) {
  const { colors } = useTheme();
  const verticalOffset = useValue(initialVerticalOffset);
  const amplitude = useValue(initialAmplitude);
  const clock = useClockValue();

  const createWavePath = (phase = 20) => {
    const points = Array.from({ length: width }, (_, index) => {
      const angle = (index / width) * (Math.PI * frequency) + phase;
      return [
        index,
        amplitude.current * Math.sin(angle) + verticalOffset.current,
      ];
    });
    const lineGenerator = line().curve(curveBasis);
    const waveLine = lineGenerator(points);
    const bottomLine = `L${width},${height} L${0}, ${height}`;
    return `${waveLine} ${bottomLine} Z`;
  };

  const animatedPath = useComputedValue(() => {
    const current = (clock.current / 255) % 255;
    const start = Skia.Path.MakeFromSVGString(createWavePath(current));
    const end = Skia.Path.MakeFromSVGString(createWavePath(Math.PI * current));
    return start.interpolate(end, 0.5);
  }, [clock, verticalOffset]);

  const gradientStart = useComputedValue(() => {
    return vec(0, verticalOffset.current);
  }, [verticalOffset]);

  const gradientEnd = useComputedValue(() => {
    return vec(0, verticalOffset.current + 500);
  }, [verticalOffset]);

  useEffect(() => {
    verticalOffset.current = (1 - waterPercent) * height - 20;
  }, [waterPercent]);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Path path={animatedPath} style={'fill'} color={colors.quaternary}>
          <LinearGradient
            start={gradientStart}
            end={gradientEnd}
            colors={[colors.tertiary, colors.secondary]}
          />
        </Path>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
});
