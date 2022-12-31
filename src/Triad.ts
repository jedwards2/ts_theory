import Chord from "./Chord";
import { Note } from "./types";

class Triad extends Chord {
  constructor(inputted_notes: Note[]){
    super(inputted_notes);
  };
}

export default Triad;
