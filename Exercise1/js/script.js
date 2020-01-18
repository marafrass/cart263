"use strict";

/********************************************************************

Pixel painter
Pippin Barr
with edits and additions by
Martin Hanses

Pixel painting remains a touchy subject for pixel purists. Some believe that
pixels should remain their natural color; the deep crimson blue they are
generally associated with at the time of harvest. As regulations hit pixel
plantations and farms harder and harder, many landowners and farmers have chosen to
genetically modify their pixels, giving off new, interesting and eye-catching
colors that surprise and intrigue the market. Among these are variations of
the typical reds and blues, but also the highly unusual and, some say, unnatural
green.

  With the pixel market booming due to trending hashtags and Steam Direct,
consumers may find themselves asking for a natural alternative - something
pixel and RGB-producers consider troublesome. "It's just not financially
viable," says Barracuda "Scorched Earth" Pinsley, a local third-generation pixel
farmer who just happened to stumble into the newsroom while we we're investigating
the story. He was promptly escorted out after being violently tased, as is
tradition, but his charming yokel slurring coupled with this somehow coherent sentence
was still relevant enough to make it into this article. You can argue that this
kind of circumstantial reporting is poor journalism, but we're not to blame -
this has been the state of news media since the early 90s.

*********************************************************************/

// Constants
const NUM_PIXELS = 1000;
const PIXEL_REVERT_DELAY = 1000;
const DEFAULT_COLOR = 'black';

let rotation = 0;
let currentKey = "";

// Set up our starting function for when the page loads
window.onload = setup;

// setup
//
// Adds DIVs to the page along with event listeners that will allow
// then to change color on mouseover.
function setup() {
  // A loop that runs once per pixel we need
  for (let i = 0; i < NUM_PIXELS; i++) {
    // Create a DIV and store it in a variable
    let pixel = document.createElement('div');
    // Add the 'pixel' class to the new element
    pixel.setAttribute('class', 'pixel');
    // Add two mouseover handlers to the new element,
    // one to paint and one to add text
    pixel.addEventListener('mouseover', paint);
    pixel.addEventListener('mouseover', addText);

    // Add a click handler to the new element
    pixel.addEventListener('click', remove);
    // Add two keydown handlers to the new element,
    //one to rotate and one to add text to currentKey
    document.addEventListener('keydown', rotate);
    document.addEventListener('keydown', typed);


    // Add the element to the body of the page
    document.body.appendChild(pixel);
  }
}

// paint
//
// Called by the mouseover event handler on each pixel. Changes
// the pixel's color and sets a timer for it to revert
function paint(e) {
  // e.target contains the specific element moused over so let's
  // save that into a variable for clarity.
  let pixel = e.target;

  // Create a random color
  let r = (Math.floor(Math.random() * 255));
  let g = (Math.floor(Math.random() * 255));
  let b = (Math.floor(Math.random() * 255));
  //assign those values into a single variable
  let rgbValue = `rgb(${r},${g},${b})`;

  // Change the background color of the randomized rgbValue
  pixel.style.backgroundColor = rgbValue;

  // Set a timeout to call the reset function after a delay
  // When we pass additional parameters (like 'pixel' below) they
  // are passed to the callback function (resetPixel)
  setTimeout(resetPixel, PIXEL_REVERT_DELAY, pixel);


}

// resetPixel
//
// Takes the provided pixel element and sets its color back to default
function resetPixel(pixel) {
  pixel.style.backgroundColor = DEFAULT_COLOR;
}

// remove
//
//removes (sets alpha) a tile on click
function remove(e) {
  //find the pixel clicked and set it as the target for our HEINOUS MANIPULATIONS
  let pixel = e.target;
  //set opacity to 0, rendering pixel invisible (or white in this case, since the browser background is)
  pixel.style.opacity = '0';

}

// keyDown
//
//Reacts to key presses
function rotate(buttonPressed) {

  //find all pixels in the scene
  let pixels = document.getElementsByClassName('pixel');

  //for the left arrow
  if (buttonPressed.keyCode === 37) {
    //change the rotation variable
    rotation += -2;
    // update the rotation for all pixels
    for (let i = 0; i < pixels.length; i++) {
      pixels[i].style.transform = `rotate(${rotation}deg)`;
    }
  }
  //for the right arrow
  if (buttonPressed.keyCode === 39) {
    //change the rotation variable
    rotation += 2;
    // update the rotation for all pixels
    for (let i = 0; i < pixels.length; i++) {
      pixels[i].style.transform = `rotate(${rotation}deg)`;
    }
  }
}

//typed()
//
//Finds the key pressed and sets currentKey variable on that basis
function typed(e) {
  currentKey = e.keyCode;
  console.log(currentKey);
}

//addText()
//
// Adds text to pixel elements (is this separate function neccessary?
// Adding it as instructed, but couldnt I just place this in the paint function?)
function addText(e) {
  //add the currentKey as a string
  e.target.innerHTML = String.fromCharCode(currentKey);
}
