import Breakpoint from './Breakpoint';
import MediaQuery from './MediaQuery';
import StyleSheet from './StyleSheet';

describe('StyleSheet', () => {

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

  describe('create', () => {

    it('should return styles object', () => {
      expect(StyleSheet.create(styles)).toEqual(styles);
    });
  });

  describe('applyMediaQueries', () => {

    it('should apply matching media queries', () => {
      expect(StyleSheet.applyMediaQueries(styles, Breakpoint.XS)).toEqual({
        tile: {
          backgroundColor: 'black',
          width: 100
        }
      });

      expect(StyleSheet.applyMediaQueries(styles, Breakpoint.SM)).toEqual({
        tile: {
          backgroundColor: 'black',
          width: 200
        }
      });

      expect(StyleSheet.applyMediaQueries(styles, Breakpoint.MD)).toEqual({
        tile: {
          backgroundColor: 'black',
          width: 300
        }
      });
    });
  });
});
