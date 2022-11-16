import HelperFunctions from "./HelperFunctions";

class PitchClassInterval {
  a: number;
  b: number;

  constructor(a: number, b: number){
    this.a = a;
    this.b = b;
  }

  getOrderedPitchClassInterval(){
    return HelperFunctions.normalizePitchClass(this.b - this.a);
  }

  getUnorderedPitchClassInterval(){
    return [HelperFunctions.normalizePitchClass(this.b - this.a), HelperFunctions.normalizePitchClass(this.a - this.b)];
  }

  print(){
    console.log(`${this.a} ${this.b}`)
  }
}

export default PitchClassInterval;
