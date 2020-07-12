const img = ["ales-nesetril-Im7lZjxeLhg-unsplash.jpg", "alexandru-acea--WBYxmW4yuw-unsplash.jpg", "amar-yashlaha-sAGXVK6bNFc-unsplash.jpg", "bradley-dunn-OJgG2IpkNrI-unsplash.jpg","debbie-molle-6DSID8Ey9-U-unsplash.jpg","fernando-hernandez-JdoofvUDUwc-unsplash.jpg","gustas-brazaitis-MF2_-N7Bcp4-unsplash.jpg","hitesh-choudhary-pMnw5BSZYsA-unsplash.jpg", "izabelle-acheson-MPNfbF4lpww-unsplash.jpg", "jesus-kiteque-wn-KYaHwcis-unsplash.jpg", "linnea-sandbakk-HQqIOc8oYro-unsplash.jpg", "nahel-abdul-hadi-flha0KwRrRc-unsplash (1).jpg", "shannon-litt-zsW9_CNrlL8-unsplash.jpg"]

// whe the page loads
document.addEventListener("DOMContentLoaded", addPhoto);

// when the button is clicked
document.querySelector("button").addEventListener("click", changePhoto)

// to hold the list of indices of photo src
let currentNum =[];

function addPhoto(){
    // generate a random number lower than the length of img
    let randomNum = Math.floor(Math.random()*((img.length)));

    // add the new number to the list
    currentNum.push(randomNum)

    // input the src of the img
    document.querySelector("img").src = `img/${img[randomNum]}`
}

function changePhoto(e){

    // generate a random number
    const randomNum = generateRandomNumber();

    // input the src of the img
    document.querySelector("img").src = `img/${img[randomNum]}`


    e.preventDefault();
}


function generateRandomNumber(){
    // generate a random number lower than the length of img
    let randomNum = Math.floor(Math.random()*((img.length)));

    // while the new number is same as any of the last 3, generate another random number
    while (randomNum === currentNum[(currentNum.length)-1] || randomNum === currentNum[(currentNum.length)-2]||randomNum === currentNum[(currentNum.length)-3]){
        randomNum = Math.floor(Math.random()*((img.length)));
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