// an array of objects having the quotes and author properties
const quotes = [
    {
        quote:"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author:"- Martin Fowler"
    },
    {
        quote:"First, solve the problem. Then, write the code.",
        author: "– John Johnson"
    },
    {
        quote: "Experience is the name everyone gives to their mistakes.",  
        author: "– Oscar Wilde"
    },
    {
        quote: "Java is to JavaScript what car is to Carpet.",
        author: "- Chris Heilmann"
    },
    {   
        quote: "Ruby is rubbish! PHP is phpantastic!",
        author: "- Nikita Popov"
    },
    {
        quote: "Code is like humor. When you have to explain it, it’s bad.",
        author: "- Cory House"
    },
    {
        quote: "Simplicity is the soul of efficiency.",
        author:"- Austin Freeman"
    },
    {
        quote:"Optimism is an occupational hazard of programming: feedback is the treatment.",
        author:"- Kent Beck"
    },
    {
        quote: "Before software can be reusable it first has to be usable.",
        author: "– Ralph Johnson"
    },
    {
        quote: "Talk is cheap. Show me the code.",  
        author: "- Linus Torvalds"
    },
    {
        quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
        author:"- Harold Abelson, Structure and Interpretation of Computer Programs"
    }
]

document.addEventListener("DOMContentLoaded", function(){
    //every 30 secs, change quote
    setInterval(changeQuote, 30000);
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