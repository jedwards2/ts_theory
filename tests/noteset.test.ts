import NoteSet from "../src/NoteSet";

describe('testing transpose noteset', () => {
  test('[1, 2, 3] + 2 = [3, 4, 5]', () => {
    expect((new NoteSet([1, 2, 3])).getTransposedSet(2)).toStrictEqual(new NoteSet([3, 4, 5]));
  })
});

describe('testing transpose noteset', () => {
  test('[11, 2, 7] + 2 = [1, 4, 9]', () => {
    expect((new NoteSet([11, 2, 7])).getTransposedSet(2)).toStrictEqual(new NoteSet([1, 4, 9]));
  })
});

describe('testing transpose noteset', () => {
  test('[23, 25, 27] + 13 = [0, 2, 4]', () => {
    expect((new NoteSet([23, 25, 27])).getTransposedSet(13)).toStrictEqual(new NoteSet([0, 2, 4]));
  })
});

describe('testing transpose noteset', () => {
  test('[5, 7, 8, 11] + 8 = [1, 3, 4, 7]', () => {
    expect((new NoteSet([5, 7, 8, 11])).getTransposedSet(8)).toStrictEqual(new NoteSet([1, 3, 4, 7]));
  })
});

describe('testing normalize noteset', () => {
  test('[0, 5, 13] = [0, 5, 1]', () => {
    let new_set = new NoteSet([0, 5, 13]);
    new_set.normalizeSet();
    expect(new_set).toStrictEqual(new NoteSet([0, 5, 1]));
  })
});

describe('testing normalize noteset', () => {
  test('[23, 25, 27] = [11, 1, 3]', () => {
    let new_set = new NoteSet([23, 25, 27]);
    new_set.normalizeSet();
    expect(new_set).toStrictEqual(new NoteSet([11, 1, 3]));
  })
});

describe('testing normalize noteset', () => {
  test('[23, 25, 27] = [11, 1, 3]', () => {
    let new_set = new NoteSet([23, 25, 27]);
    new_set.normalizeSet();
    expect(new_set).toStrictEqual(new NoteSet([11, 1, 3]));
  })
});

describe('testing normalForm noteset', () => {
  test('[0, 4, 8, 9, 11] = [8, 9, 11, 0, 4]', () => {
    expect((new NoteSet([0, 4, 8, 9, 11])).getNormalForm()).toStrictEqual(new NoteSet([8, 9, 11, 0, 4]));
  })
});

describe('testing normalForm noteset', () => {
  test('[9, 1, 5] = [1, 5, 9]', () => {
    expect((new NoteSet([9, 1, 5])).getNormalForm()).toStrictEqual(new NoteSet([1, 5, 9]));
  })
});

describe('testing checkIfTranposition noteset', () => {
  test('can recognize transposed sets', () => {
    expect(NoteSet.checkIfRelatedByTransposition(new NoteSet([10, 11, 1, 2]), new NoteSet([7, 8, 10, 11]))).toStrictEqual(true);
  })
});


describe('testing checkIfTranposition noteset', () => {
  test('can recognize not transposed sets', () => {
    expect(NoteSet.checkIfRelatedByTransposition(new NoteSet([10, 11, 1, 2]), new NoteSet([7, 8, 10, 10]))).toStrictEqual(false);
  })
});
