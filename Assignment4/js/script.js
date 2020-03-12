$(document).ready(setup);

//greate global variable to save the JSON data in
let dataInUse;

//setup()
//
//Runs whenever the page has loaded
function setup() {
  //load JSON "data"
  $.getJSON("assets/data/data.json")
    .done(dataLoaded)
    .fail(dataError)

  //Add click handler to the body that refreshes the message
  $('body').click(function() {
    createMessage(dataInUse);
  });
}

//dataLoaded()
//
//Creates a message to display
function dataLoaded(data) {

  createMessage(data);
  dataInUse = data;
}

//dataError()
//
//Displays error message when the JSON doesnt load
function dataError(request, textStatus, error) {
  console.error(error);
}

//getRandomElement()
//
//Picks a random element from an array
function getRandomElement(array) {

  let element = array[Math.floor(Math.random() * (array.length))]
  return element;
}

//createMessage()
//
//Puts together a message to display by picking from the stored arrays in the data JSON
function createMessage(data) {

  //find a random condiment from the array
  let randomCondiment = getRandomElement(data.condiments)
  console.error(randomCondiment);
  //Switch between "is" and "are" depending on the end of the randomized condiment
  let verb = "is";
  if (randomCondiment.charAt(randomCondiment.length - 1) === "s") {
    verb = "are";
  }
  //find a random cat from the array
  let randomCat = getRandomElement(data.cats)

  //Set the preposition based on whether or not the cat starts with a vowel
  let preposition = "a";
  if (isFirstLetterVowel(randomCat)) {
    preposition = "an";
  }
  //find random room from array
  let randomRoom = getRandomElement(data.rooms)
  console.error(randomRoom);
  //find random music genre from array
  let randomGenre = getRandomElement(data.genres)
  console.error(randomGenre);
  //find random book and then title of that book
  let randomBook = getRandomElement(data.books).title;
  console.error(randomBook.title);

  // put together the message based on the randomized entries
  let message = `${randomCondiment} ${verb} like ${preposition} ${randomCat} in ${randomRoom}, listening to ${randomGenre} while reading ${randomBook}. It's dumb and I don't like it.`;

  //add the message to the page
  $('body').text(message);
};

//isFirstLetterVowel()
//
// Check whether or not the entry begins with a vowel - returns a boolean
function isFirstLetterVowel(entry) {
  let vowels = ["A", "E", "I", "O", "U", "Å", "Ä", "Ö"];
  return vowels.includes(entry.charAt(0));
}
