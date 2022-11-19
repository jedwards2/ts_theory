import PitchClassInterval from "./PitchClassInterval";
import maps from "./MidiMap";
import HelperFunctions from "./HelperFunctions";
import NoteSet from "./NoteSet";
import TwelveToneSet from "./TwelveToneSet";

let map = maps.pianoKeyToNoteName();
let map2 = maps.midiNoteToNoteName();



let test2 = new NoteSet([2, 5, 6])
let test = new NoteSet([0, 3, 6, 9]);

// console.log(NoteSet.generateSetClass(test2))


console.log(NoteSet.getPrimeForm(new NoteSet([6, 7, 10])));
// let test = new NoteSet([0, 3, 6, 9]);
// let test2 = new NoteSet([3, 6, 9, 0]);

// console.log(HelperFunctions.setsEqual(test, test2))
