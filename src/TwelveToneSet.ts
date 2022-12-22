import NoteSet from "./NoteSet";
import { array12 } from "./types";

class TwelveToneSet extends NoteSet {
  set: number[];

  constructor(input_series: array12){
    super(input_series)
  }

  getP0(){
    let amount = this.set[0];
    let new_set = new NoteSet(this.set.map(note => note -= amount))
    new_set.normalizeSet();
    return new_set;
  }

  getPrime(pitchClass: number){
    let p0 = this.getP0();
    let new_set = new NoteSet(p0.set.map(note => note += pitchClass));
    new_set.normalizeSet();
    return new_set;
  }

  getR0(){
    let p0 = this.getP0();
    return new NoteSet(p0.set.reverse());
  }

 getRetrograde(pitchClass: number){
    let retro = this.getPrime(pitchClass);
    let new_set = new NoteSet(retro.set.reverse());
    new_set.normalizeSet();
    return new_set;
  }

  getI0(){
    let p0 = this.getP0();
    return p0.invertSet();
  }

  getInversion(pitchClass: number){
    //first invert pitchClass, then get prime
    let primeSet = this.getPrime(12 - pitchClass);
    return primeSet.invertSet();
  }

  getRI0(){
    let I0 = this.getI0();
    return new NoteSet(I0.set.reverse());
  }

  getRetrogradeInversion(pitchClass: number){
    let inversion = this.getInversion(pitchClass);
    return new NoteSet(inversion.set.reverse());
  }

  getMatrix(){
    let p0 = this.getP0();
    let i0 = this.getI0();

    let matrix = []
    matrix.push(p0.set);

    for (let i = 1; i<i0.set.length; i++){
      let row = this.getPrime(i0.set[i]);
      matrix.push(row.set)
    }

    return matrix;
  }

}

export default TwelveToneSet;
