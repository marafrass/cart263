"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

let sequence = 0;
let $dialogue;

$(document).ready(setup);


function setup() {

  let $continue = $('#continue');
  $dialogue = $('#dialogue');
  $continue.click(logIt);


}

function logIt() {
  console.log("click found");
  sequence += 1;
  console.log(sequence);


  if (sequence === 1) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 2) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 3) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 4) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 5) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 6) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 7) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 8) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 9) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 10) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 11) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 12) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 13) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else if (sequence === 14) {
    $dialogue.text("TEST ONE - Alright, that worked!");
  } else {




  }
}
