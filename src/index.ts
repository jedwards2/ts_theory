import Triad from "./Triad";
import PitchClassInterval from "./PitchClassInterval";
import maps from "./MidiMap";
import helper from "./HelperFunctions";

// let triad = new Triad();
// triad.print();

// let map = maps.pianoKeyToNoteName();
// let map2 = maps.midiNoteToNoteName();

// console.log(helper.normalizePitchClass(25));
// console.log(helper.convertNameToPitchClass("C#"));

// let bosh = new PitchClassInterval(7, 8);
// console.log(bosh.getOrderedPitchClassInterval());

export function createIntervalClassVector(noteList: Array<number>){
  let vector = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  for (let i = 0; i<noteList.length - 1; i++){
    for (let q = i+1; q < noteList.length; q++){
      let interval = new PitchClassInterval(noteList[i], noteList[q]);
      vector[interval.getOrderedPitchClassInterval()] += 1;
    }
  }

  return vector;
}

console.log(createIntervalClassVector([7, 8, 11]));