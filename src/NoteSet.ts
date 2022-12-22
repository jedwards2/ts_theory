import HelperFunctions from "./HelperFunctions";

class NoteSet {
  set: number[];

  constructor(inputted_notes: number[]){
    this.set = inputted_notes;
  }

  normalizeSet(){
    this.set = this.set.map(num => HelperFunctions.normalizePitchClass(num));
  }

  cloneSet(){
    return new NoteSet(this.set);
  }

  convertToArray(){
    return [...this.set];
  }

  getPrimeForm(){
    let set_1 = new NoteSet(this.set);
    set_1 = set_1.getNormalForm();
    set_1 = (set_1).getSetTransposedTo0();

    let invertedSet = new NoteSet(this.set);
    invertedSet = (invertedSet).invertSet();
    invertedSet = (invertedSet).getNormalForm();
    invertedSet = (invertedSet).getSetTransposedTo0();

    //starting from the second to last item, compare each to the first item, looping over the array backwards
    for (let i = set_1.set.length - 2; i > 0; i--){
      //comparison array holds the distances between these items
      let comparisonArray = [];
      comparisonArray.push(this.set[i] - this.set[0]);
      comparisonArray.push(invertedSet.set[i] - invertedSet.set[0]);
      //if there are no duplicates in the comparison array, return the array with the lower distance
      let duplicates = (new Set(comparisonArray)).size !== comparisonArray.length;
      if (!duplicates){
        let min = Math.min(...comparisonArray);
        let index = comparisonArray.indexOf(min);

        if (index === 0){
          return set_1.normalizeSet();
        } else {
          return invertedSet.normalizeSet();
        }
      }
    }
  }

  static checkIfRelatedByTransposition(input_set1: NoteSet, input_set2: NoteSet){
    if (input_set1.set.length !== input_set2.set.length){
      return false;
    }

    let transposition_array = new NoteSet([]);

    //loop over arrays, subtracting each element from the same element in the other array
    for (let i = 0; i < input_set1.set.length; i++){
      transposition_array.set.push(input_set1.set[i] - input_set2.set[i])
    }

    transposition_array = new NoteSet(transposition_array.set);
    transposition_array.normalizeSet()

    for(let i = 0; i < transposition_array.set.length - 1; i++) {
        if(transposition_array.set[i] !== transposition_array.set[i+1]) {
            return false;
        }
    }
    return true;
  }

  static checkIfRelatedByInversion(input_set1: NoteSet, input_set2: NoteSet): boolean {
    if (input_set1.set.length !== input_set2.set.length){
      return false;
    }

    let inversion_array = new NoteSet([]);
    //loop over the two arrays in opposite directions, adding together the elements
    for (let i = 0; i < input_set1.set.length; i++){
      inversion_array.set.push(input_set1.set[i] + input_set2.set[(input_set2.set.length - 1) - i])
    }

    //normalize the set, and loop making sure that each element in the array is equal
    inversion_array = new NoteSet(inversion_array.set);
    inversion_array.normalizeSet()

    for(let i = 0; i < inversion_array.set.length - 1; i++) {
        if(inversion_array.set[i] !== inversion_array.set[i+1]) {
            return false;
        }
    }
    return true;
  }

  static checkIfZRelated(input_set1: NoteSet, input_set2: NoteSet): boolean {
    //get both inverval class vectors and compare that they're the same
    let i1 = HelperFunctions.createIntervalClassVector(input_set1);
    let i2 = HelperFunctions.createIntervalClassVector(input_set2);
    for (let i = 1; i<7; i++){
      if (i1[i] !== i2[i]){
        return false;
      }
    }

    //check that they're not related by inversion or transposition
    if (this.checkIfRelatedByInversion(input_set1, input_set2) || this.checkIfRelatedByTransposition(input_set1, input_set2)){
      return false;
    } else {
      return true;
    }
  }

  getTransposedSet(distance: number): NoteSet{
    let new_set = new NoteSet(this.set);
    new_set.set = new_set.set.map(note => note += distance);
    new_set.normalizeSet();
    return new_set;
  }

  getSetTransposedTo0(){
    let amount = this.set[0];
    let new_set = new NoteSet(this.set);
    new_set.set = new_set.set.map(num => num - amount);
    return new_set;
  }

  invertSet(transposition_amount: number=0): NoteSet{
    let new_set = new NoteSet(this.set);
    new_set.normalizeSet();
    new_set.set = new_set.set.map(num => 12 - num);
    return new_set.getTransposedSet(transposition_amount);
  }

  getNormalForm(): NoteSet {
    let new_set = new NoteSet(this.set);
    new_set.set = new_set.set.sort(function(a, b) {return a-b});
    //remove all duplicates
    new_set.set = new_set.set.filter((note, index) => new_set.set.indexOf(note) === index);
    //make sure that the noteSet array is increasing by adding 12 if necessary
    for (let i = 0; i < new_set.set.length - 1; i++){
      if (new_set.set[i] > new_set.set[i + 1]){
        new_set.set[i + 1] += 12;
      }
    }
    //orderings array holds each possible permutation of the order
    let orderings = [new_set.set];
    for (let i = 0; i<new_set.set.length - 1; i++){
      let firstElement = new_set.set[0];
      new_set.set = new_set.set.slice(1);
      new_set.set.push(firstElement + 12);
      orderings.push(new_set.set);
    }

    //lengths array holds each the distance of each permutation
    let lengths = [];
    for (let i = 0; i<orderings.length; i++){
      lengths.push(orderings[i][orderings[i].length - 1] - orderings[i][0]);
    }

    //if there are duplicates in the array, move on to step 2 for closer inspection
    let duplicates = (new Set(lengths)).size !== lengths.length;
    if (duplicates){
      //gather all the arrays with the lowest length into one array
      let arraysWithSameLength = [];
      let min = Math.min(...lengths);
      lengths.forEach((val, idx) => {
        if (val === min){
          arraysWithSameLength.push(orderings[idx]);
        }
      })

      //starting from the second to last item, compare each to the first item, looping over the array backwards
      for (let i = arraysWithSameLength[0].length - 2; i > 0; i--){
        //comparison array holds the distances between these items
        let comparisonArray = [];
        for (let q = 0; q < arraysWithSameLength.length; q++){
          comparisonArray.push(arraysWithSameLength[q][i] - arraysWithSameLength[q][0]);
        }
        //if there are no duplicates in the comparison array, return the array with the lower distance
        let duplicates = (new Set(comparisonArray)).size !== comparisonArray.length;
        if (!duplicates){
          let min = Math.min(...comparisonArray);
          let index = comparisonArray.indexOf(min);
          let new_set = new NoteSet(arraysWithSameLength[index]);
          new_set.normalizeSet()
          return new_set;
        }
      }

      //normalize each array before final step
      arraysWithSameLength = arraysWithSameLength.map(array => {
        let new_array = new NoteSet(array)
        new_array.normalizeSet()
        return new_array
      });

      //finally, iterate over each array until one of the notes is lower
      for (let i = 0; i < arraysWithSameLength.length; i++){
        let pitch_classes = [];

        //push note into pitch_classes array, one at a time for comparison
        for (let q = 0; q < arraysWithSameLength[i].set.length; q++){
          pitch_classes.push(arraysWithSameLength[i].set[q]);
        }

        //if the two notes are different, find and return the lower array
        let duplicates = (new Set(pitch_classes)).size !== pitch_classes.length;
        if (!duplicates){
          let min = Math.min(...pitch_classes);
          let index = pitch_classes.indexOf(min);
          let new_set = new NoteSet(arraysWithSameLength[index].set);
          new_set.normalizeSet()
          return new_set;
        }
      }

    //if there are no duplicates, return the normalized ordering with the lowest length
    } else {
      let min = Math.min(...lengths);
      let index = lengths.indexOf(min);
      let new_set = new NoteSet(orderings[index]);
      new_set.normalizeSet()
      return new_set;
    }
  }

  generateSetClass(): NoteSet[]{
    let new_set = new NoteSet(this.set);
    new_set.normalizeSet();

    let setClass = [];
    let inverted = new NoteSet(new_set.set);
    inverted = inverted.invertSet()

    for (let i =0 ; i<12; i++){
      setClass.push(((new NoteSet(new_set.set)).getTransposedSet(i)).getNormalForm());
      setClass.push((new NoteSet(inverted.set).getTransposedSet(i)).getNormalForm());
    }
    //filter out duplicates
    let noDuplicates = [];
    for (let i = 0; i<setClass.length; i++){
      if (HelperFunctions.checkIfSetIsNotIncluded(noDuplicates, setClass[i])){
        noDuplicates.push(setClass[i]);
      }
    }
    return noDuplicates;
  }

  generateComplementRelation() : NoteSet {
    let new_set = new NoteSet(this.set);
    new_set.normalizeSet();
    let missing_notes = [];

    for (let i = 0; i < 12; i++){
      if (!new_set.set.includes(i)){
        missing_notes.push(i)
      }
    };

    return new NoteSet(missing_notes);
  }

}

export default NoteSet;
