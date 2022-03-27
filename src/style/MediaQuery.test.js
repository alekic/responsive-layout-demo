import Breakpoint from './Breakpoint';
import MediaQuery from './MediaQuery';

describe('MediaQuery', () => {

  describe('constructor', () => {

    it("should throw when 'start' is not a number", () => {
      expect(() => new MediaQuery('0'))
        .toThrow(new TypeError("'start' must be a number"));
    });

    it("should throw when 'start' is negative", () => {
      expect(() => new MediaQuery(-1))
        .toThrow(new RangeError("'start' must not be negative: -1"));
    });

    it("should throw when 'end' is not a number", () => {
      expect(() => new MediaQuery(0, true))
        .toThrow(new TypeError("'end' must be a number"));
    });

    it("should throw when 'start' and 'end' don't form a valid range", () => {
      expect(() => new MediaQuery(1, 0))
        .toThrow(new RangeError('[1, 0) is not a valid range'));
    });
  });

  describe('matches', () => {

    const query = new MediaQuery(0, 100);

    it('should throw when width is not a number', () => {
      expect(() => query.matches(null))
        .toThrow(new TypeError('width must be a number'));
    });

    it('should return true when width is in range', () => {
      expect(query.matches(0)).toBe(true);
      expect(query.matches(99)).toBe(true);
    });

    it('otherwise should return false', () => {
      expect(query.matches(-1)).toBe(false);
      expect(query.matches(100)).toBe(false);
      expect(query.matches(Infinity)).toBe(false);
    });
  });

  describe('toString', () => {

    it('should return string representing the MediaQuery object', () => {
      const query = new MediaQuery(0, Infinity);

      expect(query.toString()).toBe('MediaQuery[0, Infinity)');
    });
  });

  describe('parse', () => {

    it('should return MediaQuery object when string can be parsed', () => {
      const query = MediaQuery.parse('MediaQuery[0, 100)');

      expect(query).toBeInstanceOf(MediaQuery);
      expect(query.start).toBe(0);
      expect(query.end).toBe(100);
    });

    it('should return MediaQuery object when upper bound is Infinity', () => {
      const query = MediaQuery.parse('MediaQuery[100, Infinity)');

      expect(query).toBeInstanceOf(MediaQuery);
      expect(query.start).toBe(100);
      expect(query.end).toBe(Infinity);
    });

    it("should return null when string can't be parsed", () => {
      expect(MediaQuery.parse('MediaQuery(0, Infinity)')).toBe(null);
      expect(MediaQuery.parse('mediaQuery[0, Infinity)')).toBe(null);
      expect(MediaQuery.parse("MediaQuery[0, '1')")).toBe(null);
      expect(MediaQuery.parse("MediaQuery[0,100)")).toBe(null);
      expect(MediaQuery.parse(null)).toBe(null);
    });
  });

  describe('between', () => {

    it('should throw when an invalid breakpoint is provided', () => {
      expect(() => MediaQuery.between('sm', 'xxl'))
        .toThrow(new Error('Invalid breakpoint: xxl'));
    });

    it('should return MediaQuery with range between two breakpoints', () => {
      expect(MediaQuery.between('sm', 'xl')).toEqual(
        expect.objectContaining({
          start: Breakpoint.SM,
          end: Breakpoint.XL
        })
      );
    });
  });

  describe('down', () => {

    it('should return MediaQuery with range [0, breakpoint)', () => {
      expect(MediaQuery.down('md')).toEqual(
        expect.objectContaining({
          start: 0,
          end: Breakpoint.MD
        })
      );
    });
  });

  describe('only', () => {

    it('should return MediaQuery with range between two consecutive breakpoints', () => {
      expect(MediaQuery.only('xs')).toEqual(
        expect.objectContaining({
          start: Breakpoint.XS,
          end: Breakpoint.SM
        })
      );

      expect(MediaQuery.only('sm')).toEqual(
        expect.objectContaining({
          start: Breakpoint.SM,
          end: Breakpoint.MD
        })
      );

      expect(MediaQuery.only('md')).toEqual(
        expect.objectContaining({
          start: Breakpoint.MD,
          end: Breakpoint.LG
        })
      );

      expect(MediaQuery.only('lg')).toEqual(
        expect.objectContaining({
          start: Breakpoint.LG,
          end: Breakpoint.XL
        })
      );

      expect(MediaQuery.only('xl')).toEqual(
        expect.objectContaining({
          start: Breakpoint.XL,
          end: Infinity
        })
      );
    });
  });

  describe('up', () => {

    it('should return MediaQuery with range [breakpoint, Infinity)', () => {
      expect(MediaQuery.up('md')).toEqual(
        expect.objectContaining({
          start: Breakpoint.MD,
          end: Infinity
        })
      );
    });
  });
});
