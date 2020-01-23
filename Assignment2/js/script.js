"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let $spans;

$(document).ready(setup);



function setup(){

  $spans = $('span');

  console.log("testing");
  setInterval(update, 500);
  $spans.on('click', spanClicked);

}


function update(){

  $spans.each(updateSpan);
  console.log("update");

}

function updateSpan(){

  let x = Math.random();
  if (x < 0.1){
    $(this).removeClass('redacted');
    $(this).addClass('revealed');

  }
  console.log("updating spans");
}

function spanClicked(){

  $(this).addClass('redacted');
  $(this).removeClass('revealed');

}
