"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
//Create variable for spans
let $redacteds;
//Create secret variables (found and total)
let secretsFound = 0;
let $secretsTotal;
let $redactedTotal;
let $redactedRevealed;

//Set constants instead of hard coded numbers
const UPDATEINTERVAL = 500;
const PROBABILITYTORESET = 0.1;

//(run setup() when page has loaded)
$(document).ready(setup);

//setup()
//
//Starting functions to set up our document
function setup() {

  //Find the total amount of secrets and log in console
  $secretsTotal = $('.secret').length;
  console.log($secretsTotal);

  $redactedTotal = $('.redacted').length;
  $redactedRevealed = $('.revealed').length;

  //Assign all .redacteds to a variable for easy access
  $redacteds = $('.redacted');

  //Set interval for re-rolling whether or not redacted's are revealed (great grammar here martin you fucking idiot)
  setInterval(update, UPDATEINTERVAL);
  //Create handler for when you click a 'span'
  $redacteds.on('click', spanClicked);
  //Create handler for revealing secrets on mouseover
  $('.secret').on('mouseover', revealSecret)
  //Display initial text to display amount of secrets and player objective
}

//update()
//
//Basic update of every span - runs every interval
function update() {
  //call updateSpan function for every span
  $redacteds.each(updateSpan);
  //Log a bunch of crap in the console because that's just how I know it works.
  console.log("update");
  console.log(secretsFound);


  //Display different messages based on how many secrets the player's found

  if ($redactedRevealed >= $redactedTotal) {
    $('#displayScore').text("You blew it! You fool!");
  } else if (secretsFound < $secretsTotal) {
    $('#displayScore').text("You've found " + secretsFound + " out of " + $secretsTotal + " but oh shit, " + $redactedRevealed + " secrets are visible!");
  } else if (secretsFound === $secretsTotal) {
    $('#displayScore').text("You've done it! You've only gone and done it!");
  }

}

//updateSpan()
//
//Basically a dice roll to see whether or not we reveal a secret,
//has a 10% chance of triggering
function updateSpan() {


  let x = Math.random();
  if (x < PROBABILITYTORESET) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
    //Update the array variable
    $redactedRevealed = $('.revealed').length;

  }
  //log that we're updating spans
  console.log("updating spans");
}

//spanClicked()
//
//Set a revealed passage back to being redacted
function spanClicked() {
  $(this).addClass('redacted');
  $(this).removeClass('revealed');



}

//revealSecret()
//
//On mouseover on a .secret span, set it to .found and add one to the amount of secrets found
function revealSecret() {

  $(this).addClass('found');
  secretsFound += 1;
  //update the total and turn off the span 
  $secretsTotal = $('.secret').length;
  $(this).off();




}
