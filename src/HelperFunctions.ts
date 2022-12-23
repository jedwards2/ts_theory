import { Note } from "./types";

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
    return 5;
  } else {
    return note;
  }
}



export default {
  normalizePitchClass,
  convertNameToPitchClass,
  convertToClassVectorSpecs,
}
