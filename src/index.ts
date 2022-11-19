import PitchClassInterval from "./PitchClassInterval";
import maps from "./MidiMap";
import HelperFunctions from "./HelperFunctions";
import NoteSet from "./NoteSet";
import TwelveToneSet from "./TwelveToneSet";

let map = maps.pianoKeyToNoteName();
let map2 = maps.midiNoteToNoteName();


let test = new NoteSet([13, 15, 16]);
console.log(NoteSet.getPrimeForm(test));
console.log(test);

// console.log(HelperFunctions.setsEqual(test, test2))
