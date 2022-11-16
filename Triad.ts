import Chord from "./Chord";

class Triad extends Chord {
  third: Number;
  fifth: Number;

  constructor(){
    super();
    this.third = 4;
    this.fifth = 7;
  }

  print(){
    console.log(`${this.root} ${this.third} ${this.fifth}`);
  }
}


export default Triad;
