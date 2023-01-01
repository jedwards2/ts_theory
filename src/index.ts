import TwelveToneSet from "./TwelveToneSet";
import NoteSet from "./NoteSet";
import Chord from "./Chord";

let bosh = new NoteSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
let bosh12 = new TwelveToneSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

let chord = new Chord([0, 4, 7]);
console.log(chord._set)
console.log(chord.getAllInversions());

console.log(chord._set)
