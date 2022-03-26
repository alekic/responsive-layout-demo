import { renderHook } from '@testing-library/react-hooks';
import { Dimensions } from 'react-native';

import useResponsiveValue, { Breakpoint } from './useResponsiveValue';

function mockWindowDimensions({ height, width }) {
  Dimensions.get = jest.fn(() => ({ height, width }));
}

describe('useResponsiveValue', () => {

  const config = {
    xs: 100,
    sm: 200,
    md: 300,
    lg: 400,
    xl: 500,
    default: 0
  };

  it('should return xs value on extra small screens', () => {
    mockWindowDimensions({ width: Breakpoint.XS });

    const { result } = renderHook(() => useResponsiveValue(config));

    expect(result.current).toBe(config.xs);
  });

  it('should return sm value on small screens', () => {
    mockWindowDimensions({ width: Breakpoint.SM });

    const { result } = renderHook(() => useResponsiveValue(config));

    expect(result.current).toBe(config.sm);
  });

  it('should return md value on medium screens', () => {
    mockWindowDimensions({ width: Breakpoint.MD });

    const { result } = renderHook(() => useResponsiveValue(config));

    expect(result.current).toBe(config.md);
  });

  it('should return lg value on large screens', () => {
    mockWindowDimensions({ width: Breakpoint.LG });

    const { result } = renderHook(() => useResponsiveValue(config));

    expect(result.current).toBe(config.lg);
  });

  it('should return xl value on extra large screens', () => {
    mockWindowDimensions({ width: Breakpoint.XL });

    const { result } = renderHook(() => useResponsiveValue(config));

    expect(result.current).toBe(config.xl);
  });

  it('should return default value', () => {
    mockWindowDimensions({ width: Breakpoint.MD });

    const { result } = renderHook(() => useResponsiveValue({
      xs: 'blue',
      default: 'red'
    }));

    expect(result.current).toBe('red');
  });
});
