import PitchClassInterval from "./PitchClassInterval";
import maps from "./MidiMap";
import HelperFunctions from "./HelperFunctions";
import NoteSet from "./NoteSet";
import TwelveToneSet from "./TwelveToneSet";

let map = maps.pianoKeyToNoteName();
let map2 = maps.midiNoteToNoteName();

// console.log(HelperFunctions.normalizePitchClass(25));
// console.log(HelperFunctions.convertNameToPitchClass("C#"));

// let bosh = new PitchClassInterval(7, 8);
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
// console.log(NoteSet.getPrimeForm(new NoteSet([1, 5, 6, 7])));
let bosh = new TwelveToneSet([2, 1, 9, 10, 5, 3, 4, 0, 8, 7, 6, 11]);
console.log(bosh.getMatrix())
// let p0 = bosh.getP0();
// // console.log(p0.set)
// let p2 = bosh.getPrime(2)
// let p7 = bosh.getPrime(7)
// let p11 = bosh.getPrime(11);
// // console.log(p2)
// // console.log(p7)
// // console.log(p11)

// let r0 = bosh.getR0();
// // console.log(r0)

// let r2 = bosh.getRetrograde(2)
// let r7 = bosh.getRetrograde(7)
// let r11 = bosh.getRetrograde(11);

// // console.log(r2);
// // console.log(r7)
// // console.log(r11)

// let I0 = bosh.getI0();
// // console.log(I0);

// let i2 = bosh.getInversion(2);
// let i11 = bosh.getInversion(11);

// // console.log(i2)
// // console.log(i11)

// let ri0 = bosh.getRI0();
// let ri5 = bosh.getRetrogradeInversion(5);
// let ri11 = bosh.getRetrogradeInversion(11);

// console.log(ri0)

// console.log(ri5);
// console.log(ri11);
