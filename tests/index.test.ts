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
  test('list of same note should reduce to one note, and then get rejected', () => {
    expect(createIntervalClassVector([3, 3, 3])).toBe("not a valid note list");
  });
  test('list with duplicates should reduce to one note, and then return correct vector', () => {
    expect(createIntervalClassVector([3, 3, 4])).toStrictEqual({
    "1": 1,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    });
  });
});
