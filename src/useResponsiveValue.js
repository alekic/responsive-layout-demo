import { useWindowDimensions } from 'react-native';

export const Breakpoint = Object.freeze({
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536
});

export default function useResponsiveValue(config) {
  const { width } = useWindowDimensions();

  function valueOrDefault(key) {
    return Object.prototype.hasOwnProperty.call(config, key)
      ? config[key]
      : config.default;
  }

  if (width >= Breakpoint.XL) return valueOrDefault('xl');
  else if (width >= Breakpoint.LG) return valueOrDefault('lg');
  else if (width >= Breakpoint.MD) return valueOrDefault('md');
  else if (width >= Breakpoint.SM) return valueOrDefault('sm');
  else return valueOrDefault('xs');
}
