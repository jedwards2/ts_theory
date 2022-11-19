import NoteSet from "./NoteSet";

class TwelveToneSet {
  series: number[];

  constructor(input_series :number[]){
    this.series = input_series;
  }

  getP0(){
    let amount = this.series[0];
    return this.series.map(note => note -= amount);
  }

  getPrime(pitchClass: number){
    let p0 = this.getP0();
    return p0.map(note => note += pitchClass);
  }

  getR0(){
    let p0 = this.getP0();
    return p0.reverse();
  }

  getRetrograde(pitchClass: number){
    let retro = this.getPrime(pitchClass);
    return retro.reverse();
  }

  getI0(){
    let p0 = this.getP0();
    let note =  NoteSet.invertSet(new NoteSet([...p0]))
    return note.set;
  }

  getInversion(pitchClass: number){
    let primeSet = this.getPrime(pitchClass);
    let inverted =  NoteSet.invertSet(new NoteSet([...primeSet]))
    return inverted.set;
  }

  getRI0(){
    let I0 = this.getI0();
    return I0.reverse();
  }

  getRetrogradeInversion(pitchClass: number){
    let inversion = this.getInversion(pitchClass);
    return inversion.reverse();
  }

}

export default TwelveToneSet;
