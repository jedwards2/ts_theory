const notes = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]

function pianoKeyToNoteName(){
  let noteObj = {};
  for (let i = 0; i<88; i++){
    let note_name = notes[i % notes.length] + String(getMidiNoteOctave(i + 21));
    noteObj[i + 21] = note_name
  }
  return noteObj;
}

function midiNoteToNoteName(){
 let noteObj = {};
  for (let i = 21; i<128; i++){
    let note_name = notes[(i - 21) % notes.length] + String(getMidiNoteOctave(i));
    noteObj[i] = note_name;
  }
  return noteObj;
}

//just a little git test with alacritty

function getMidiNoteOctave(i: number): number{
  if (i < 24){
    return 0;
  } else if (i < 36){
    return 1;
  } else if (i < 48){
    return 2;
  } else if (i < 60){
    return 3;
  } else if (i < 72){
    return 4;
  } else if (i < 84){
    return 5;
  } else if (i < 96){
    return 6;
  } else if (i < 108){
    return 7;
  } else if (i < 120){
    return 8;
  } else {
    return 9;
  }
};

export default {
  midiNoteToNoteName,
  pianoKeyToNoteName
};
