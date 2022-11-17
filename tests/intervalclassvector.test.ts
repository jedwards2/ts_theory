import HelperFunctions from '../src/HelperFunctions';

describe('testing createIntervalClassVector', () => {
  test('interval class vector should be 101100', () => {
    expect(HelperFunctions.createIntervalClassVector([7, 8, 11])).toStrictEqual({
    "1": 1,
    "2": 0,
    "3": 1,
    "4": 1,
    "5": 0,
    "6": 0,
    });
  });

  test('list of same note should reduce to one note, and then get rejected', () => {
    expect(HelperFunctions.createIntervalClassVector([3, 3, 3])).toStrictEqual(new Error("not a valid note list"));
  });

  test('list with duplicates should reduce to one note, and then return correct vector', () => {
    expect(HelperFunctions.createIntervalClassVector([3, 3, 4])).toStrictEqual({
    "1": 1,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    });
  });

  test('list with values greater than 6 should reduce, and then return correct vector', () => {
    expect(HelperFunctions.createIntervalClassVector([0, 1, 9])).toStrictEqual({
    "1": 1,
    "2": 0,
    "3": 1,
    "4": 1,
    "5": 0,
    "6": 0,
    });
  });
});
