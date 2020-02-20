"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);


function setup() {

  let newDiv = (document).createElement('div');
  console.log("test");

  $('body').text("Testing Testing");

  if (annyang) {

  var commands = {
    'does it work': function() {
        $('body').text("it workds");
    },
    'this is *tag': function(tag) {
        $('body').text(tag);
    }

  };

  annyang.addCommands(commands);

   annyang.start();
}

$('body').click(speak);

}

function speak(){

  responsiveVoice.speak("hello world");
}
