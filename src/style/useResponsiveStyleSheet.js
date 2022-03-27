import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import StyleSheet from './StyleSheet';

export default function useResponsiveStyleSheet(styles) {
  const { width } = useWindowDimensions();

  return useMemo(
    () => StyleSheet.applyMediaQueries(styles, width),
    [styles, width]
  );
}
