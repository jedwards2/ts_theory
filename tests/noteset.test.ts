import NoteSet from "../src/NoteSet";

describe('testing transpose noteset', () => {
  test('[1, 2, 3] + 2 = [3, 4, 5]', () => {
    expect(NoteSet.transposeSet(new NoteSet([1, 2, 3]), 2)).toStrictEqual(new NoteSet([3, 4, 5]));
  })
});

describe('testing transpose noteset', () => {
  test('[11, 2, 7] + 2 = [1, 4, 9]', () => {
    expect(NoteSet.transposeSet(new NoteSet([11, 2, 7]), 2)).toStrictEqual(new NoteSet([1, 4, 9]));
  })
});

describe('testing transpose noteset', () => {
  test('[23, 25, 27] + 13 = [0, 2, 4]', () => {
    expect(NoteSet.transposeSet(new NoteSet([23, 25, 27]), 13)).toStrictEqual(new NoteSet([0, 2, 4]));
  })
});

describe('testing transpose noteset', () => {
  test('[5, 7, 8, 11] + 8 = [1, 3, 4, 7]', () => {
    expect(NoteSet.transposeSet(new NoteSet([5, 7, 8, 11]), 8)).toStrictEqual(new NoteSet([1, 3, 4, 7]));
  })
});

describe('testing normalize noteset', () => {
  test('[0, 5, 13] = [0, 5, 1]', () => {
    expect(NoteSet.normalizeSet(new NoteSet([0, 5, 13]))).toStrictEqual(new NoteSet([0, 5, 1]));
  })
});

describe('testing normalize noteset', () => {
  test('[23, 25, 27] = [11, 1, 3]', () => {
    expect(NoteSet.normalizeSet(new NoteSet([23, 25, 27]))).toStrictEqual(new NoteSet([11, 1, 3]));
  })
});

describe('testing normalize noteset', () => {
  test('[23, 25, 27] = [11, 1, 3]', () => {
    expect(NoteSet.normalizeSet(new NoteSet([23, 25, 27]))).toStrictEqual(new NoteSet([11, 1, 3]));
  })
});

describe('testing normalForm noteset', () => {
  test('[0, 4, 8, 9, 11] = [8, 9, 11, 0, 4]', () => {
    expect(NoteSet.getNormalForm(new NoteSet([0, 4, 8, 9, 11]))).toStrictEqual(new NoteSet([8, 9, 11, 0, 4]));
  })
});

describe('testing normalForm noteset', () => {
  test('[9, 1, 5] = [1, 5, 9]', () => {
    expect(NoteSet.getNormalForm(new NoteSet([9, 1, 5]))).toStrictEqual(new NoteSet([1, 5, 9]));
  })
});
