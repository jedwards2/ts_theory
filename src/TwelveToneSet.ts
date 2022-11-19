import NoteSet from "./NoteSet";

class TwelveToneSet extends NoteSet {
  set: number[];

  constructor(input_series: number[]){
    super(input_series)
  }

  getP0(){
    let amount = this.set[0];
    return NoteSet.normalizeSet(new NoteSet(this.set.map(note => note -= amount)));
  }

  getPrime(pitchClass: number){
    let p0 = this.getP0();
    return NoteSet.normalizeSet(new NoteSet(p0.set.map(note => note += pitchClass)));
  }

  getR0(){
    let p0 = this.getP0();
    return new NoteSet(p0.set.reverse());
  }

  getRetrograde(pitchClass: number){
    let retro = this.getPrime(pitchClass);
    return NoteSet.normalizeSet(new NoteSet(retro.set.reverse()));
  }

  getI0(){
    let p0 = this.getP0();
    return NoteSet.invertSet(p0);
  }

  getInversion(pitchClass: number){
    //first invert pitchClass, then get prime
    let primeSet = this.getPrime(12 - pitchClass);
    return NoteSet.invertSet(primeSet);
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
