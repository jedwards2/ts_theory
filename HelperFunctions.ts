function normalizePitchClass(note: number){
  while (note < 0){
    note += 12;
  }

  return note % 12;
}

function convertNameToPitchClass(name: String){
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

export default {
  normalizePitchClass,
  convertNameToPitchClass,
}
