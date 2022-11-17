import HelperFunctions from "./HelperFunctions";

class NoteSet {
  set: number[];

  constructor(inputted_notes: number[]){
    this.set = inputted_notes;
  }

  static normalizeSet(input_set: NoteSet){
    return input_set.set.map(num => HelperFunctions.normalizePitchClass(num));
  }

  static getNormalForm(input_set: NoteSet){
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
      arraysWithSameLength = arraysWithSameLength.map(array => NoteSet.normalizeSet(new NoteSet(array)))

      //finally, iterate over each array until one of the notes is lower
      for (let i = 0; i < arraysWithSameLength.length; i++){
        let pitch_classes = [];
        //push note into pitch_classes array, one at a time for comparison
        for (let q = 0; q < arraysWithSameLength[i].length; q++){
          pitch_classes.push(arraysWithSameLength[i][q]);
        }
        //if the two notes are different, find and return the lower array
        let duplicates = (new Set(pitch_classes)).size !== pitch_classes.length;
        if (!duplicates){
          let min = Math.min(...pitch_classes);
          let index = pitch_classes.indexOf(min);
          return NoteSet.normalizeSet(new NoteSet(arraysWithSameLength[index]));
        }
      }

    //if there are no duplicates, return the normalized ordering with the lowest length
    } else {
      let min = Math.min(...lengths);
      let index = lengths.indexOf(min);
      return NoteSet.normalizeSet(new NoteSet(orderings[index]));
    }
  }
}

export default NoteSet;