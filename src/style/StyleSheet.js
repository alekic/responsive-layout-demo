
import MediaQuery from './MediaQuery';

export default class StyleSheet {

  static applyMediaQueries(styles, width) {
    const responsiveStyles = {};

    Object.keys(styles).forEach(key => {
      responsiveStyles[key] = applyMediaQueries(styles[key], width);
    });

    return responsiveStyles;
  }

  static create(styles) {
    return styles;
  }

}

function applyMediaQueries(style, width) {
  const responsiveStyle = {};

  Object.entries(style).forEach(([key, value]) => {
    if (key.startsWith('MediaQuery')) {
      const query = MediaQuery.parse(key);

      if (query && query.matches(width)) {
        Object.assign(responsiveStyle, value);
      }
    } else {
      responsiveStyle[key] = style[key];
    }
  });

  return responsiveStyle;
}
