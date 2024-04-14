// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Create an array for species numbers not to repeat
let tags = [];
for (let i = 0; i < 10000; i++) {
  let tag = Math.floor(Math.random() * 10001);
  if (tags.includes(tag)) {
    tag = Math.floor(Math.random() * 10001);
  } else {
    tags.push(tag)
  }
}

// Selects a random number for the species
const speciesNumber = () => {
  let indexChoosed = Math.floor(Math.random() * tags.length);
  number = tags.splice(indexChoosed, 1)[0];
  return number;
}

// Object factory
const pAequorFactory = (number, array) => {
 
  pAequor = {
    specimenNum: number,
    dna: array,

    mutate() {
      let index = Math.floor(Math.random() * array.length);

      const replace = index => {
        let change = returnRandBase();
        if (this.dna[index] === change) {
          replace(index);
        } else {
          this.dna[index] = change;
        }
      }

      replace(index);
    },

    compareDNA(obj) {
      let count = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === obj.dna[i]) {
          count++
        }
      }

      let percentage = (count / this.dna.length * 100);
      if (!Number.isInteger(percentage)) {
        percentage = percentage.toFixed(2);
      }

      `specimen #${this.specimenNum} and specimen #${obj.specimenNum} have ${percentage}% DNA in common`;
      return percentage;
    },

    willLikelySurvive() {
      let survive = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          survive++
        }
      }

      if (survive / this.dna.length >= .6) {
        return true
      } else {
        return false
      }
    },

    complementStrand() {
      strand = [];
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]){
          case 'A':
            strand.push('T');
            break;
          case 'T':
            strand.push('A');
            break;
          case 'C':
            strand.push('G');
            break;
          case 'G':
            strand.push('C')
            break;
        }
      }
      return strand;
    }
  };

  return pAequor;
}


// Making an array with 30 species ocurrences that are LIKELY to survive

let pAequorArray = [];

while (pAequorArray.length < 30){
  let specimenNum = speciesNumber(); 
  let dnaArray = mockUpStrand();
  let newAqueor = pAequorFactory(specimenNum, dnaArray);

  newAqueor.willLikelySurvive() ? pAequorArray.push(newAqueor) : null;
}

console.log(pAequorArray);

let highestMatch = 0;
let bestMatchPair = [];

for (let i = 0; i < pAequorArray.length - 1; i++) {
  for (let j = i + 1; j < pAequorArray.length; j++) {
    let matchPercentage = pAequorArray[i].compareDNA(pAequorArray[j]);
    if (matchPercentage > highestMatch) {
      highestMatch = matchPercentage;
      bestMatchPair = [pAequorArray[i], pAequorArray[j]];
    }
  }
}

console.log(`The pair with the highest DNA match is between specimen #${bestMatchPair[0].specimenNum} and specimen #${bestMatchPair[1].specimenNum}, with ${highestMatch}% DNA match.`);










