import Chord from "./Chord";
import { Note } from "./types";

class Triad extends Chord {
  _root: Note;
  _third: Note;
  _fifth: Note;

  constructor(inputted_notes: Note[]){
    super(inputted_notes);
    this._root = this._set[0];
    this._third = this._set[1];
    this._fifth = this._set[2];
  };

  resetChord(){
    this._root = this._set[0];
    this._third = this._set[1];
    this._fifth = this._set[2];
  }

  getFirstInversion(): Note[]{
    return [this._third, this._fifth, this._root];
  }

  getSecondInversion(): Note[]{
    return [this._fifth, this._root, this._third]
  }

  transpose(amt: number){
    let newSet = this.getTransposedSet(amt);
    this._set = newSet._set;
    this.resetChord()
  }

  printInRootPos(){
    console.log(`Root: ${this._root} Third: ${this._third} Fifth: ${this._fifth}`)
  }
}

export default Triad;
