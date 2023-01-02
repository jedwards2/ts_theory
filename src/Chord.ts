import NoteSet from "./NoteSet";
import { Note } from "./types";

class Chord extends NoteSet {
  constructor(inputted_notes: Note[]){
    super(inputted_notes);
  }

  getAllInversions() : Chord[]{
    let newNoteSet = this.cloneSet()._set;
    let allInversions = [];
    allInversions.push([...newNoteSet]);

    for (let i = 0; i<newNoteSet.length - 1; i++){
      let slice = newNoteSet.splice(0, 1);
      newNoteSet.push(slice[0]);
      allInversions.push([...newNoteSet])
    }

   return allInversions;
  }
}

export default Chord;
