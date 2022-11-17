import PitchClassInterval from "./PitchClassInterval";
import maps from "./MidiMap";
import HelperFunctions from "./HelperFunctions";
import NoteSet from "./NoteSet";

let map = maps.pianoKeyToNoteName();
let map2 = maps.midiNoteToNoteName();

// console.log(HelperFunctions.normalizePitchClass(25));
// console.log(HelperFunctions.convertNameToPitchClass("C#"));

let bosh = new PitchClassInterval(7, 8);
// console.log(bosh.getOrderedPitchClassInterval());

// console.log(NoteSet.getNormalForm(new NoteSet([0, 4, 8, 9, 11])))
// console.log(NoteSet.getNormalForm(new NoteSet([9, 1, 5])))

// NoteSet.transposeSet(new NoteSet([1, 2, 3]), 2)

// console.log(NoteSet.normalizeSet(new NoteSet([11, 12, 13])))

// console.log(HelperFunctions.createIntervalClassVector(new NoteSet([3, 3, 3])))
// console.log(NoteSet.transposeSet(new NoteSet ([23, 25, 27]), 13))
// console.log(NoteSet.checkIfTransposition(new NoteSet([10, 11, 1, 2]), new NoteSet([7, 8, 10, 11])))
// console.log(NoteSet.checkIfTransposition(new NoteSet([10, 11, 1, 2]), new NoteSet([7, 8, 10, 10])))
// console.log(NoteSet.invertSet(new NoteSet([1, 3, 4, 7]), 5));
console.log(NoteSet.getNormalForm(new NoteSet([4, 2, 1, 10])))
