// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function initialPrompt() {
   let word = input.question("Let's play some Scrabble! Please enter a word...");
   console.log(vowelBonusScorer(word));
   return;
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let newPointStructure = transform(oldPointStructure);
console.log (newPointStructure)
let simpleScorer = function(word){
   word = word.toUpperCase();
   let letterpoints = word.length;
   return letterpoints;
};

let vowelBonusScorer = function(word){
   word = word.toUpperCase();
   let letterpoints = 0;
   let vowels = ['A','E','I','O','U'];
   for (i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterpoints += 3;
      } else {
         letterpoints += 1;
      };
   };
return letterpoints
};

let scrabbleScorer;

const scoringAlgorithms = [
   {
   name: 'Simple Score', 
   description: 'Each letter is worth 1 point.',
   scorerFunction: function(x) {return simpleScorer(x);}
   }, {
   name: 'Bonus Vowels',
   description: 'Vowels are worth 3 pts, Consonants are worth 1.',
   scorerFunction: function(word) { return vowelBonusScorer(word)}
   },{
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: function(x) {return oldScrabbleScorer(x);}
   }
];

function scorerPrompt() {
let UserWord = input.question(`Let's play some Scrabble!
   
   Enter a word for scoring: `);
let algorithmSelect = input.question
(`Which scoring algorithm would you like to use?
   0 - Simple: One point per character.
   1 - Bonus Vowels: Same as above except vowels are worth 3 points.
   2 - Scrabble: The classic Scrabble scoring system.
   Enter 0, 1, or 2: `
);
if (algorithmSelect === '0') {
   console.log (` The word ${UserWord} scores ${scoringAlgorithms[0].scorerFunction(UserWord)} points.`);
} else if (algorithmSelect === '1') {
   console.log (`The word ${UserWord} scores ${scoringAlgorithms[1].scorerFunction(UserWord)} points.`);
} else if (algorithmSelect === '2') {
   console.log (`The word ${UserWord} scores as follows:
${scoringAlgorithms[2].scorerFunction(UserWord)}`);
} else {
   console.log ('Invalid Input, please try again.')
};
};

function transform(obj) {
   let newObj = {}
for (let item in obj) {
   let j = 0;
   let target;
   for (i = 0; i < item.length; i++) {
      target = obj[j][i]
      newObj[target] = obj[j];
   };
   j++
};
return newObj;
};

function runProgram() {
   scorerPrompt();
   
}






// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
