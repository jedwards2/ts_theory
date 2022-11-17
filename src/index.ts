import Triad from "./Triad";
import PitchClassInterval from "./PitchClassInterval";
import maps from "./MidiMap";
import HelperFunctions from "./HelperFunctions";

// let triad = new Triad();
// triad.print();

// let map = maps.pianoKeyToNoteName();
// let map2 = maps.midiNoteToNoteName();

// console.log(HelperFunctions.normalizePitchClass(25));
// console.log(HelperFunctions.convertNameToPitchClass("C#"));

// let bosh = new PitchClassInterval(7, 8);
// console.log(bosh.getOrderedPitchClassInterval());

console.log(HelperFunctions.getNormalForm([0, 4, 8, 9, 11]))
console.log(HelperFunctions.getNormalForm([9, 1, 5]))
