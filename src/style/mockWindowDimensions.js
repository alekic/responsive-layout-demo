import { Dimensions } from 'react-native';

export function mockWindowDimensions({ height, width }) {
  Dimensions.get = jest.fn(() => ({ height, width }));
}
