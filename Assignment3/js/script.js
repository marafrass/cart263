"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

//define all animals
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

let buttons = [];
const NUM_OPTIONS = 5;
let $correctButton;
let score = 0;



$(document).ready(setup);


function setup() {

  $(document).one('click', newRound);
  let $score = $('<div></div>')
  $score.addClass('score');
  $score.text(score);
  $('body').append($score);


  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'I give up': function() {
        score = 0;
        $('.score').text(score);
        let $guesses = $('body').find('.guess');
        $guesses.remove();
        newRound();
      },
      'Say it again': function() {
        sayBackwards($correctButton.text());
      },
      'I think it is *tag': function(tag) {

        if (tag == $correctButton.text()) {
          let $guesses = $('body').find('.guess');
          $guesses.remove();
          score += 1;
          $('.score').text(score);
          setTimeout(newRound, 1000);
        }
      }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }

}

function addButton(label) {
  let $button = $('<div></div>')
  $button.addClass('guess');
  $button.text(label);
  $button.button();
  $('body').append($button);
  $button.on('click', handleGuess);
  return $button;
}

function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

function newRound() {

  buttons = [];

  for (let i = 0; i < NUM_OPTIONS; i++) {
    let randomAnimal = getRandomElement(animals);
    let $button = addButton(randomAnimal);
    buttons.push($button);
  }
  $correctButton = getRandomElement(buttons);
  sayBackwards($correctButton.text());
}

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

function sayBackwards(text) {
  let backwardsText = text.split('').reverse().join('');
  let options = {
    rate: 1,
    pitch: 1,
  }
  responsiveVoice.speak(backwardsText, 'UK English Male');
}
