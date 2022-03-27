import Breakpoint from './Breakpoint';

const MEDIA_QUERY_REGEX = /^MediaQuery\[(?<start>\d+), (?<end>\d+|Infinity)\)$/;

export default class MediaQuery {

  constructor(start, end) {
    if (typeof start !== 'number') {
      throw new TypeError("'start' must be a number");
    }
    if (start < 0) {
      throw new RangeError(`'start' must not be negative: ${start}`);
    }
    if (typeof end !== 'number') {
      throw new TypeError("'end' must be a number");
    }
    if (start > end) {
      throw new RangeError(`[${start}, ${end}) is not a valid range`);
    }

    this.start = start;
    this.end = end;
  }

  matches(width) {
    if (typeof width !== 'number') {
      throw new TypeError('width must be a number');
    }

    return width >= this.start && width < this.end;
  }

  toString() {
    return `MediaQuery[${this.start}, ${this.end})`;
  }

  static parse(string) {
    const matches = MEDIA_QUERY_REGEX.exec(string);

    if (!matches) {
      return null;
    }

    const { start, end } = matches.groups;

    return new MediaQuery(
      parseInt(start, 10),
      (end === 'Infinity') ? Infinity : parseInt(end, 10)
    );
  }

  static between(start, end) {
    return new MediaQuery(toBreakpoint(start), toBreakpoint(end));
  }

  static down(key) {
    return new MediaQuery(0, toBreakpoint(key));
  }

  static only(key) {
    return new MediaQuery(toBreakpoint(key), next(toBreakpoint(key)));
  }

  static up(key) {
    return new MediaQuery(toBreakpoint(key), Infinity);
  }

}

function toBreakpoint(key) {
  const upperCasedKey = key.toUpperCase();

  if (!Object.prototype.hasOwnProperty.call(Breakpoint, upperCasedKey)) {
    throw new Error(`Invalid breakpoint: ${key}`);
  }

  return Breakpoint[upperCasedKey];
}

function next(breakpoint) {
  switch (breakpoint) {
    case Breakpoint.XS: return Breakpoint.SM;
    case Breakpoint.SM: return Breakpoint.MD;
    case Breakpoint.MD: return Breakpoint.LG;
    case Breakpoint.LG: return Breakpoint.XL;
    default: return Infinity;
  }
}
