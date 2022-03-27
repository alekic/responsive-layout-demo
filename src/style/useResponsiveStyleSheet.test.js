import { renderHook } from '@testing-library/react-hooks';

import Breakpoint from './Breakpoint';
import MediaQuery from './MediaQuery';
import { mockWindowDimensions } from './mockWindowDimensions';
import useResponsiveStyleSheet from './useResponsiveStyleSheet';

describe('useResponsiveStyleSheet', () => {

  const styles = {
    tile: {
      backgroundColor: 'black',
      width: 200,
      [MediaQuery.only('xs')]: {
        width: 100
      },
      [MediaQuery.up('md')]: {
        width: 300
      }
    }
  };

  it('should return style sheet with applied media queries', () => {
    mockWindowDimensions({ width: Breakpoint.MD });

    const { result } = renderHook(() => useResponsiveStyleSheet(styles));

    expect(result.current).toEqual({
      tile: {
        backgroundColor: 'black',
        width: 300
      }
    });
  });
});
