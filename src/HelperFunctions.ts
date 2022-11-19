import PitchClassInterval from "./PitchClassInterval";
import NoteSet from "./NoteSet";
import { Note } from "./types";
import { IntervalClassVector } from "./types";

function normalizePitchClass(note: Note): Note {
  //converts all notes to 0 - 11
  while (note < 0){
    note += 12;
  }

  return note % 12;
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

function convertToClassVectorSpecs(note: Note): Note {
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

function createIntervalClassVector(noteList: NoteSet): IntervalClassVector | Error {
  //octave equivalence, no duplicate notes are allowed
  noteList.set = noteList.set.filter((note, index) => noteList.set.indexOf(note) === index);

  let vector: IntervalClassVector = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  //interval vectors require more than 1 note to be created
  if (noteList.set.length < 2){
    return new Error("not a valid note list")
  }
  //loop over every combination of the arrays
  for (let i = 0; i<noteList.set.length - 1; i++){
    for (let q = i+1; q < noteList.set.length; q++){
      //create a new PitchClassInterval obj
      let interval = new PitchClassInterval(noteList.set[i], noteList.set[q]);
      // converts to 0-6 if larger and then adds one to that class on the vector
      let intervalClass = convertToClassVectorSpecs(interval.getOrderedPitchClassInterval());
      vector[intervalClass] += 1;
    }
  }

  return vector;
}

function setsEqual(a: NoteSet, b: NoteSet) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.set.length !== b.set.length) return false;

  for (let i = 0; i < a.set.length; ++i) {
    if (a.set[i] !== b.set[i]) return false;
  }
  return true;
}

function setIsNotIncluded(array: NoteSet[], b: NoteSet){
  for (let i = 0; i < array.length; i++) {
    if (setsEqual(array[i], b)){
      return false;
    }
  }
  return true;
}


export default {
  normalizePitchClass,
  convertNameToPitchClass,
  convertToClassVectorSpecs,
  createIntervalClassVector,
  setsEqual,
  setIsNotIncluded,
}
