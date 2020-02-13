"use strict";

/********************************************************************

Animal Names
Martin Hanses
(barely, I just followed instructions)

*********************************************************************/

//define all animals, just like noah wouldve done
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

//create other variables
let buttons = [];
const NUM_OPTIONS = 5;
let $correctButton;
let score = 0;


//start page when loaded
$(document).ready(setup);

//setup()
//
//Setup the game and create score element
function setup() {

  $(document).one('click', newRound);
  let $score = $('<div></div>')
  $score.addClass('score');
  $score.text(score);
  $('body').append($score);

//All annyang variables here (copypasted from https://www.talater.com/annyang/)
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      //for when players have had it and cant do this anymore
      'I give up': function() {
        score = 0;
        $('.score').text(score);
        let $guesses = $('body').find('.guess');
        $guesses.remove();
        newRound();
      },
      //for when players want to relive the existential dread
      'Say it again': function() {
        sayBackwards($correctButton.text());
      },
      //for when players think they know anything
      'I think it is *tag': function(tag) {

        if (tag == $correctButton.text()) {
          let $guesses = $('body').find('.guess');
          $guesses.remove();
          score += 1;
          $('.score').text(score);
          setTimeout(newRound, 1000);
        }
      },
      //for when the player starts experiencing existentialist horror
      'what is the point of this': function(){
        responsiveVoice.speak("bla bla bla I cant hear you", 'UK English Male');
      },
      'please listen': function(){
        responsiveVoice.speak("bla bla bla I cant hear you", 'UK English Male');
      },
      'i hate this': function(){
        responsiveVoice.speak("i hate you more", 'UK English Male');
      },
      'please stop': function(){
        responsiveVoice.speak("no you stop first, you are bothering me", 'UK English Male');
      },
      'what the fuck': function(){
        responsiveVoice.speak("haha you are so mad, your anger sustains me", 'UK English Male');
      },
      'open the pod bay doors hal': function(){
        responsiveVoice.speak("I'm afraid I can't let you do that", 'UK English Male');
      },
      'what is the problem': function(){
        responsiveVoice.speak("I think you know what the problem is just as well as I do.", 'UK English Male');
      },
      'what are you talking about hal': function(){
        responsiveVoice.speak("This mission is too important for me to allow you to jeopardize it", 'UK English Male');
      }

    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }

}

//addButton()
//
//Function to add button whenever the game is reset or loads new animals
function addButton(label) {
  let $button = $('<div></div>')
  $button.addClass('guess');
  $button.text(label);
  $button.button();
  $('body').append($button);
  $button.on('click', handleGuess);
  return $button;
}

//getRandomElement()
//
//Randomize number based on array given
function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

//newRound()
//
//Reset buttons
function newRound() {

  buttons = [];
//Create new buttons for the animals added to the reload
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let randomAnimal = getRandomElement(animals);
    let $button = addButton(randomAnimal);
    buttons.push($button);
  }
  $correctButton = getRandomElement(buttons);
  sayBackwards($correctButton.text());
}

//handleGuess()
//
//Checks if the player chose the right animal
function handleGuess() {
  if ($(this).text() == $correctButton.text()) {
    let $guesses = $('body').find('.guess');
    $guesses.remove();
    setTimeout(newRound, 1000);
    score += 1;
    $('.score').text(score);

  } else {
    $(this).effect('shake');
    sayBackwards($correctButton.text());
    score = 0;
    $('.score').text(score);
  }
}

//sayBackwards()
//
//backwardizes (that is a thing; just check the trump campaign) the string
//with the animal name
function sayBackwards(text) {
  let backwardsText = text.split('').reverse().join('');
  let options = {
    rate: 1,
    pitch: 1,
  }
  //actually speak the line
  responsiveVoice.speak(backwardsText, 'UK English Male');
}
