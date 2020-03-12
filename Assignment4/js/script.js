$(document).ready(setup);

let dataInUse;

function setup() {

$.getJSON("assets/data/data.json")
  .done(dataLoaded)
  .fail(dataError)

  $('body').click(function (){

    createMessage(dataInUse);
  });

}



function dataLoaded(data){

createMessage(data);
dataInUse = data;
console.log(dataInUse);

}
function dataError(request, textStatus, error){
  console.error(error);
}

function getRandomElement(array){

  let element = array[Math.floor(Math.random()*(array.length))]
  return element;
}





function createMessage(data){

  let randomCondiment = getRandomElement(data.condiments)
  console.error(randomCondiment);

  let verb = "is";
  if(randomCondiment.charAt(randomCondiment.length - 1) === "s"){
    verb = "are";
  }



  console.error(verb);

  let randomCat = getRandomElement(data.cats)
  console.error(randomCat);

  let preposition = "a";
  if(isFirstLetterVowel(randomCat)){
    preposition = "an";
  }

  let randomRoom = getRandomElement(data.rooms)
  console.error(randomRoom);

  let message = `${randomCondiment} ${verb} like ${preposition} ${randomCat} in ${randomRoom}`;
  console.log(message);

  $('body').text(message);

};


function isFirstLetterVowel(entry){
  let vowels = ["A", "E", "I","O","U","Å","Ä","Ö"];
  return vowels.includes(entry.charAt(0));

}
