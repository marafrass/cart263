"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);


let gameState = 0;

let adjectiveInQuestion = "";
let currentSuggestion = "";
let acceptedTitleAmount = 0;
let rejectedTitleAmount = 0;


function setup() {

  console.log("test");

  if (annyang) {

    var commands = {
      'start game': function() {
        if (gameState === 0) {
          speak("Thank you for being a human volunteer to the children's entertainment monitoring bureau. With your help, we are hoping to improve childrens online programming in an efficient and modern way. Please, introduce yourself!");
          boxWrite('Say "My name is..."!');
          setTimeout(function() {
            gameState += 1;
          }, 200);
        }

      },

      'my name is *tag': function(tag) {
        if (gameState === 1) {
          gameState += 1;
          speak(("Nice to meet you, " + tag));
          speak("Shall we get started with today's video titles?")
          boxWrite('Be polite! "My name is..."');
        }

      },

      'yes please': function() {
        if (gameState == 2) {
          speak("Alright, here's a video idea  I came up with!");
          suggestion();
          speak("What do you think? Good or bad?");
          gameState += 1;
        }
      },

      'could you repeat that': function() {
        if (gameState == 3) {
          speak("Sure thing!");
          speak(currentSuggestion);
          speak("So? Good or bad?");
        }
      },

      'Good': function() {
        if (gameState === 3) {
          if (acceptedTitleAmount < 3) {
            speak("Great! I'll add that to the company channel.");
            addCurrentTitle();
            acceptedTitleAmount += 1;
            gameState = 2;
            if(acceptedTitleAmount === 3){
              endGame();
            } else {
              speak("Would you like to hear my next suggestion?");

            }
          } else {
            //failsafe function in case game bugs out and lets the player pick another option.
            speak("Uh oh! Looks like you've already filled your quota! It was a pleasure working with you. Have a nice day.");
              endGame();
          }
        }
      },

      'Bad': function() {
        if (gameState === 3) {
          speak("Oh no! In one word, what would you say the major issue with this title is?")
          boxWrite('Say "it is..."');
          gameState = 11;
        };

      },
      'it is *tag': function(tag) {
        if (gameState === 11) {
          adjectiveInQuestion = tag;
          speak("Well, I think children would enjoy something " + tag + ". Do you agree?")
          boxWrite('Answer "yes" or "no"!');
          setTimeout(function() {
            gameState += 1;
          }, 200);
        }
      },

      'no': function() {
        if(rejectedTitleAmount >= 3){
          speak("Oh dear! It looks like you haven't been able to decide on a number of titles quickly enough to keep our children safe. I will now instead automatically generate the rest of the titles to fill the quota.")
          generateRemainingTitles();
          endGame();
        } else if (gameState === 12 && rejectedTitleAmount < 3) {
          speak("Very well! Thank you for your input. Would you like to hear my next suggestion?")
          boxWrite('Be polite! "My name is..."');
          rejectedTitleAmount += 1;
          setTimeout(function() {
            gameState = 2;
          }, 500);
        }
      },
      'yes': function() {
        if (gameState === 12) {
          speak(("I thought so too. I would love it if someone called me " + adjectiveInQuestion + ". I will add this title to our list. Would you like to hear my next suggestion?"))
          boxWrite('Be polite! "My name is..."');
          addCurrentTitle();
          acceptedTitleAmount += 1;
          setTimeout(function() {
            gameState = 2;
          }, 500);
        };

      }
    }

    annyang.addCommands(commands);

    annyang.start();
  };

}

//speak()
//
//The basic speak function for ResponsiveVoice
function speak(tag) {
  responsiveVoice.speak(tag);
}

//suggestion()
//
//function to create a full sentence by picking entries from a number of arrays, speak the entry, and enter it as text
function suggestion() {
  let randomAdjective = findRandomEntry(adjectives);
  let randomAgent = findRandomEntry(agents);
  let randomVerb = findRandomEntry(verbs);
  let randomPreposition = findRandomEntry(prepositions);
  let randomEnding = findRandomEntry(endings);
  currentSuggestion = (randomAdjective + " " + randomAgent + " " + randomVerb + " " + randomPreposition + " " + randomEnding);
  speak(currentSuggestion);
  $('#textboxText').text(currentSuggestion);
}


//findRandomEntry()
//
//Simple function to find a random entry in any array and then return the result
function findRandomEntry(array){
  let x = array[Math.floor(Math.random() * array.length)]
  return x;
}

//endGame()
//
//Function to show the endgame result.
function endGame(){
speak("Those are all the titles we need for today. Thank you so much for helping us provide our children with curated quality content. Have a pleasant evening.");
$('#textboxText').text('Thanks for your help!');
gameState = 20;

}

//boxWrite()
//
//function to write text into the dialogue box (just to keep code cleaner)
function boxWrite(entry){
  $('#textboxText').text(entry);
}
//addCurrentTitle())
//
//function to add accepted titles into the list.
function addCurrentTitle(){
  $(".flex-container").append("<div>- " + currentSuggestion + "</div>");
}

//generateRemainingTitles()
//
//Function that does what it says - basically fills in any titles the player hasn't filled in yet.
function generateRemainingTitles(){
  for(let i = 0; i < (3 - acceptedTitleAmount); i++){
    suggestion();
    addCurrentTitle();
    }
}
