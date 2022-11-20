import PitchClassInterval from "./PitchClassInterval";
import maps from "./MidiMap";
import HelperFunctions from "./HelperFunctions";
import NoteSet from "./NoteSet";
import TwelveToneSet from "./TwelveToneSet";

let map = maps.pianoKeyToNoteName();
let map2 = maps.midiNoteToNoteName();

let firstSet = new NoteSet([0, 1, 4, 6]);
let secondSet = new NoteSet([0, 1, 3, 7]);

console.log(NoteSet.checkIfZRelated(firstSet, secondSet));
