let quotes;

// an array of objects having the quotes and author properties
document.addEventListener("DOMContentLoaded", function(){
    // get the jokes in from quotes.json file
    // instantiate an xhr object
    const xhr = new XMLHttpRequest();

    // initiate request
    xhr.open("GET","quotes.json", true);

    //onload what to do
    xhr.onload = function (){
        // if requested file is available
        if (this.status === 200){
            quotes = JSON.parse(this.responseText)
            //every 30 secs, change quote
            setInterval(changeQuote, 30000);
        }
    } 
    xhr.send();
    
    
})
let currentNum =[];
function changeQuote(){
    // get the quote and author elements from the UI
    const textUI = document.querySelector(".quote-text"),
          authorUI = document.querySelector(".quote-author");

    // generate any random from 0 to less than the length of quote array
    let randomNum = generateRandomNumber();
    
    // insert the quote and author corresponding to the random number from quotes in the DOM...
    textUI.textContent = quotes[randomNum].quote;
    authorUI.textContent = quotes[randomNum].author;
}

function generateRandomNumber(){
    // generate a random number lower than the length of quotes
    let randomNum = Math.floor(Math.random()*((quotes.length)));

    // while the new number is same as any of the last 3, generate another random number
    while (randomNum === currentNum[(currentNum.length)-1] || randomNum === currentNum[(currentNum.length)-2]||randomNum === currentNum[(currentNum.length)-3]){
        randomNum = Math.floor(Math.random()*((quotes.length)));
    }

    // add the new number to the list
    currentNum.push(randomNum)

    // chop of the list remaining the last 4 to save memory
    if (currentNum.length>3){
        currentNum.splice(0, currentNum.length-4);
    }
    // return the new number
    return randomNum;
}