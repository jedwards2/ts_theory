import Chord from "./Chord";
import { Note } from "./types";

class Triad extends Chord {
  _root: Note;
  _third: Note;
  _fifth: Note;

  constructor(inputted_notes: Note[]){
    super(inputted_notes);
    this._root = inputted_notes[0];
    this._third = inputted_notes[1];
    this._fifth = inputted_notes[2];
  };

  getFirstInversion(){
    return [this._third, this._fifth, this._root];
  }

  getSecondInversion(){
    return [this._fifth, this._root, this._third]
  }
}

export default Triad;
