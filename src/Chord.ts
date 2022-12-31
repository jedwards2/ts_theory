import NoteSet from "./NoteSet";
import { Note } from "./types";

class Chord extends NoteSet {
  constructor(inputted_notes: Note[]){
    super(inputted_notes);
  }
}
