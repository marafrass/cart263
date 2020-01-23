"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let $spans;
let score = 0;

let secretsFound = 0;
let secretsTotal;

const UPDATEINTERVAL = 500;
const PROBABILITYTORESET = 0.1;

$(document).ready(setup);

function setup() {

  secretsTotal = $('.secret').length;
  console.log(secretsTotal);

  $spans = $('span');

  console.log("testing");
  setInterval(update, UPDATEINTERVAL);
  $spans.on('click', spanClicked);
  $('.secret').on('mouseover', revealSecret)

  $('#displayScore').text("Find the secrets! You've found " + secretsFound + " out of " + secretsTotal);


}


function update() {

  $spans.each(updateSpan);
  console.log("update");
  console.log(secretsFound);


}

function updateSpan() {

  let x = Math.random();
  if (x < PROBABILITYTORESET) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');

  }
  console.log("updating spans");
}

function spanClicked() {

  $(this).addClass('redacted');
  $(this).removeClass('revealed');

}

function revealSecret() {

  $(this).addClass('found');
  secretsFound += 1;
  $(this).off();

  if (secretsFound < secretsTotal) {
    $('#displayScore').text("You've found " + secretsFound + " out of " + secretsTotal);
  } else if (secretsFound === secretsTotal) {
    $('#displayScore').text("You've done it! You've only gone and done it!");
  }
}
