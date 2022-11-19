import HelperFunctions from "./HelperFunctions";

class NoteSet {
  set: number[];

  constructor(inputted_notes: number[]){
    this.set = inputted_notes;
  }

  static getPrimeForm(input_set: NoteSet){
    let set_1 = new NoteSet(input_set.set)
    set_1 = NoteSet.getNormalForm(set_1);
    set_1 = NoteSet.transposeSetTo0(set_1);

    let invertedSet = new NoteSet(input_set.set);
    invertedSet = NoteSet.invertSet(invertedSet);
    invertedSet = NoteSet.getNormalForm(invertedSet);
    invertedSet = NoteSet.transposeSetTo0(invertedSet);


    //starting from the second to last item, compare each to the first item, looping over the array backwards
    for (let i = set_1.set.length - 2; i > 0; i--){
      //comparison array holds the distances between these items
      let comparisonArray = [];
      comparisonArray.push(input_set.set[i] - input_set.set[0]);
      comparisonArray.push(invertedSet.set[i] - invertedSet.set[0]);
      //if there are no duplicates in the comparison array, return the array with the lower distance
      let duplicates = (new Set(comparisonArray)).size !== comparisonArray.length;
      if (!duplicates){
        let min = Math.min(...comparisonArray);
        let index = comparisonArray.indexOf(min);

        if (index === 0){
          return NoteSet.normalizeSet(set_1);
        } else {
          return NoteSet.normalizeSet(invertedSet);
        }
      }
    }
  }

  static checkIfTransposition(input_set1: NoteSet, input_set2: NoteSet){
    let transposition_array = new NoteSet([])
    for (let i = 0; i < input_set1.set.length; i++){
      transposition_array.set.push(input_set1.set[i] - input_set2.set[i])
    }

    transposition_array = NoteSet.normalizeSet(new NoteSet(transposition_array.set));

    for(var i = 0; i < transposition_array.set.length - 1; i++) {
        if(transposition_array.set[i] !== transposition_array.set[i+1]) {
            return false;
        }
    }
    return true;

  }

  static transposeSet(input_set: NoteSet, distance: number){
    input_set.set = input_set.set.map(note => note += distance);
    return NoteSet.normalizeSet(input_set);
  }

  static transposeSetTo0(input_set: NoteSet){
    let amount = input_set.set[0];
    input_set.set = input_set.set.map(num => num - amount);
    return input_set;
  }

  static normalizeSet(input_set: NoteSet): NoteSet{
    return new NoteSet(input_set.set.map(num => HelperFunctions.normalizePitchClass(num)));
  }

  static invertSet(input_set: NoteSet, transposition_amount: number=0){
    input_set.set = input_set.set.map(num => 12 - num);
    return NoteSet.transposeSet(input_set, transposition_amount);
  }

  static getNormalForm(input_set: NoteSet): NoteSet {
    input_set.set = input_set.set.sort(function(a, b) {return a-b});
    //remove all duplicates
    input_set.set = input_set.set.filter((note, index) => input_set.set.indexOf(note) === index);
    //make sure that the noteSet array is increasing by adding 12 if necessary
    for (let i = 0; i < input_set.set.length - 1; i++){
      if (input_set.set[i] > input_set.set[i + 1]){
        input_set.set[i + 1] += 12;
      }
    }
    //orderings array holds each possible permutation of the order
    let orderings = [input_set.set];
    for (let i = 0; i<input_set.set.length - 1; i++){
      let firstElement = input_set.set[0];
      input_set.set = input_set.set.slice(1);
      input_set.set.push(firstElement + 12);
      orderings.push(input_set.set);
    }

    //lengths array holds each the distance of each permutation
    let lengths = [];
    for (let i = 0; i<orderings.length; i++){
      lengths.push(orderings[i][orderings[i].length - 1] - orderings[i][0])
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
          return NoteSet.normalizeSet(new NoteSet(arraysWithSameLength[index]));
        }
      }

      //normalize each array before final step
      arraysWithSameLength = arraysWithSameLength.map(array => NoteSet.normalizeSet(new NoteSet(array)));

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
          return NoteSet.normalizeSet(new NoteSet(arraysWithSameLength[index].set));
        }
      }

    //if there are no duplicates, return the normalized ordering with the lowest length
    } else {
      let min = Math.min(...lengths);
      let index = lengths.indexOf(min);
      return NoteSet.normalizeSet(new NoteSet(orderings[index]));
    }
  }

  static generateSetClass(input_set: NoteSet){
    let setClass = [];
    let inverted = NoteSet.invertSet(new NoteSet(input_set.set));
    for (let i =0 ; i<12; i++){
      setClass.push(NoteSet.getNormalForm(NoteSet.transposeSet(new NoteSet(input_set.set), i)));
      setClass.push(NoteSet.getNormalForm(NoteSet.transposeSet(new NoteSet(inverted.set), i)));
    }
    //filter out duplicates
    let noDuplicates = [];
    for (let i = 0; i<setClass.length; i++){
      if (HelperFunctions.setIsNotIncluded(noDuplicates, setClass[i])){
        noDuplicates.push(setClass[i]);
      }
    }
    return noDuplicates;
  }

}

export default NoteSet;
