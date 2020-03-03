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


function setup() {

  console.log("test");

  if (annyang) {

    var commands = {
      'start game': function() {
        speak("welcome to the quality and value monitoring bureau! Please, introduce yourself!");
        setTimeout(function() {
          gameState += 1;
        }, 200);

      },

      'my name is *tag': function(tag) {
        if (gameState === 1) {
          gameState += 1;
          speak(("Nice to meet you, " + tag));
          speak("Shall we get started with today's video titles?")
          console.log(gameState);
        }

      },

      'yes please': function() {
        if (gameState == 2) {
          speak("Alright, here's a video idea  I came up with!")
          suggestion();
          speak("What do you think? Good or bad?");
          gameState += 1;
        } else {
          console.log("wrong state");
        }
      },

      'Good': function() {
        if (gameState === 3) {
          speak("Great! I'll add that to the company channel. Would you like to hear my next suggestion?");
          gameState = 2;
        }
      },

      'Bad': function() {
        if (gameState === 3) {
          speak("Oh no! In one word, what would you say the major issue with this title is?")
          setTimeout(function() {
            gameState = 11;
          }, 1000);
        }
      },
      'it is *tag': function(tag) {
        if (gameState === 11) {
          adjectiveInQuestion = tag;
          speak("You don't think children would enjoy something " + tag + "?")
          setTimeout(function() {
            gameState += 1;
          }, 200);
        }
      },

      'no': function(){
        if(gameState === 12){
        speak("Very well! Thank you for your input. Would you like to hear my next suggestion?")
        setTimeout(function() {
          gameState = 2;
        }, 500);
      };
    },
    'yes': function(){
      if(gameState === 12){
      speak("I thought so too. I would love it if someone called me ${adjectiveInQuestion}")
      setTimeout(function() {
        gameState = 2;
      }, 500);
    };

    }
  }

    annyang.addCommands(commands);

    annyang.start();
  };

  $('body').click(speak);

}

function speak(tag) {

  responsiveVoice.speak(tag);
}

function suggestion() {

  let randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  let randomAgent = agents[Math.floor(Math.random() * agents.length)];
  let randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
  let randomPreposition = prepositions[Math.floor(Math.random() * prepositions.length)];
  let randomEnding = endings[Math.floor(Math.random() * endings.length)];

  let currentSuggestion = (randomAdjective + " " + randomAgent + " " + randomVerb + " " + randomPreposition + " " + randomEnding);
  speak(currentSuggestion);
  $('#textboxText').text(currentSuggestion);
}
