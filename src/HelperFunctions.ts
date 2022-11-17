import PitchClassInterval from "./PitchClassInterval";

type IntervalClassVector = {
  1: number,
  2: number,
  3: number,
  4: number,
  5: number,
  6: number,
}

type Note = number;

function normalizePitchClass(note: number) {
  //converts all notes to 0 - 11
  while (note < 0){
    note += 12;
  }

  return note % 12;
}

function normalizeSet(set: number[]){
  return set.map(num => normalizePitchClass(num));
}

function convertNameToPitchClass(name: String): Note{
  //just in case you're a pleb that doesn't like pitch classes
  if (name === "B#" || name === "C" || name === "Dbb"){
    return 0;
  } else if (name === "C#" || name === "Db"){
    return 1;
  } else if (name === "Cx" || name === "D" || name === "Ebb"){
    return 2;
  } else if (name === "D#" || name === "Eb"){
    return 3;
  } else if (name === "Dx" || name === "E" || name === "Fb"){
    return 4;
  } else if (name === "E#" || name === "F" || name === "Gbb"){
    return 5;
  } else if (name === "F#" || name === "Gb"){
    return 6;
  } else if (name === "Fx" || name === "G" || name === "Abb"){
    return 7;
  } else if (name === "G#" || name === "Ab"){
    return 8;
  } else if (name === "Gx" || name === "A" || name === "Bbb"){
    return 9;
  } else if (name === "A#" || name === "Bb"){
    return 10;
  } else if (name === "Ax" || name === "B" || name === "Cb"){
    return 11;
  }
}

function convertToClassVectorSpecs(note: number): Note {
  //makes sure that the distance is from 1-6, not 1 - 11
  if (note === 11){
    return 1;
  } else if (note === 10){
    return 2;
  } else if (note === 9){
    return 3;
  } else if (note === 8){
    return 4;
  } else if (note === 7){
    return 3;
  } else {
    return note;
  }
}

function createIntervalClassVector(noteList: number[]): IntervalClassVector | Error {
  //octave equivalence, no duplicate notes are allowed
  noteList = noteList.filter((note, index) => noteList.indexOf(note) === index);

  let vector: IntervalClassVector = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  //interval vectors require more than 1 note to be created
  if (noteList.length < 2){
    return new Error("not a valid note list")
  }
  //loop over every combination of the arrays
  for (let i = 0; i<noteList.length - 1; i++){
    for (let q = i+1; q < noteList.length; q++){
      //create a new PitchClassInterval obj
      let interval = new PitchClassInterval(noteList[i], noteList[q]);
      // converts to 0-6 if larger and then adds one to that class on the vector
      let intervalClass = convertToClassVectorSpecs(interval.getOrderedPitchClassInterval());
      vector[intervalClass] += 1;
    }
  }

  return vector;
}

function getNormalForm(noteSet: number[]){
  for (let i = 0; i < noteSet.length - 1; i++){
    if (noteSet[i] > noteSet[i + 1]){
      noteSet[i + 1] += 12;
    }
  }

  let scales = [noteSet];
  for (let i = 0; i<noteSet.length - 1; i++){
    let firstElement = noteSet[0];
    noteSet = noteSet.slice(1);
    noteSet.push(firstElement + 12);
    scales.push(noteSet);
  }
  let lengths = [];
  for (let i = 0; i<scales.length; i++){
    lengths.push(scales[i][scales[i].length - 1] - scales[i][0])
  }

  let duplicates = (new Set(lengths)).size !== lengths.length;
  if (duplicates){
    let all_arrays = [];
    let min = Math.min(...lengths);
    lengths.forEach((val, idx) => {
      if (val === min){
        all_arrays.push(scales[idx]);
      }
    })

    for (let i = all_arrays[0].length - 2; i > 0; i--){
      let orderings = [];
      for (let q = 0; q < all_arrays.length; q++){
        orderings.push(all_arrays[q][i] - all_arrays[q][0]);
      }
      let duplicates = (new Set(orderings)).size !== orderings.length;
      if (!duplicates){
        let min = Math.min(...orderings);
        let index = orderings.indexOf(min);
        return normalizeSet(all_arrays[index]);
      }
    }
    all_arrays = all_arrays.map(array => normalizeSet(array))

    //finally, iterate over each array until one of the notes is lower
    for (let i = 0; i < all_arrays.length; i++){
      let pitch_classes = [];
      for (let q = 0; q < all_arrays[i].length; q++){
        pitch_classes.push(all_arrays[i][q]);
      }
      let duplicates = (new Set(pitch_classes)).size !== pitch_classes.length;
      if (!duplicates){
        let min = Math.min(...pitch_classes);
        let index = pitch_classes.indexOf(min);
        return normalizeSet(all_arrays[index]);
      }
    }

  } else {
    let min = Math.min(...lengths);
    let index = lengths.indexOf(min);
    return normalizeSet(scales[index]);
  }
}

export default {
  normalizePitchClass,
  convertNameToPitchClass,
  convertToClassVectorSpecs,
  createIntervalClassVector,
  getNormalForm,
  normalizeSet,
}
