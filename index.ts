import Triad from "./Triad";
import maps from "./MidiMap";
import helper from "./HelpersFunctions";

let triad = new Triad();
triad.print();

let map = maps.pianoKeyToNoteName();
let map2 = maps.midiNoteToNoteName();

console.log(helper.normalizeNote(25));
