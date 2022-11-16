import Chord from "./Chord";

class Triad extends Chord {
  third: number;
  fifth: number;

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
