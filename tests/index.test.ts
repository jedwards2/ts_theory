import { createIntervalClassVector } from '../src/index';

describe('testing createIntervalClassVector', () => {
  test('interval class vector should be 101100', () => {
    expect(createIntervalClassVector([7, 8, 11])).toStrictEqual({
    "1": 1,
    "2": 0,
    "3": 1,
    "4": 1,
    "5": 0,
    "6": 0,
  });
  });
});
