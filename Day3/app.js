// UI variables
const preloader = document.querySelector(".preloader-container"),
      range = document.querySelector(".value"),
      message = document.querySelector(".message");

document.getElementById("calculator-card").addEventListener("submit", loadAndCalculate);


// functions
function loadAndCalculate(e){
    // first hide the values of the last user
    // hide messsage
    message.style.display = "none";

    // reset range bar to 0 range
    range.style.width = "0.5%";

    // show preloader
    preloader.style.display = "flex";

    // start calculation after 2secs
    setTimeout(calculateBMI, 2000);

    e.preventDefault();
}

function calculateBMI(){
    // hide preloader
    preloader.style.display = "none";

    let percentageBMI, decimalBMI;

    const heightCM = document.getElementById("height").value,
          weightKG = document.getElementById("weight").value,
        // height in meters
          heightM = parseFloat(heightCM)/100;
        //   height in squared meters
          heightSq = Math.pow(heightM,2);
    
    // BMI in deccimal
    decimalBMI = parseFloat(weightKG)/heightSq;

    

    //if  decimal is finite get the percentage, display message and update range bar
    if (isFinite(decimalBMI)){
        // BMI value as percentage of the total length of the range bar,40.
        percentageBMI = (decimalBMI / 40) *100;
        // display message containing the decimal BMI
        displayMessage(decimalBMI);
        // increase width of range bar to appropriate percentage
        increaseRangeBarWidth(percentageBMI);

        // clear the input fields
        clearInput();
    }else{
        // shows error message for 3 secs
        showError();
    }
}

// increase width of range bar to appropriate percentage
function increaseRangeBarWidth(percentage){
    // if the value is more than 100% set it to 100%
    if (percentage>100){
        percentage = 100;
    }
    // set range bar to range
    range.style.width = `${percentage}%`;
}


// display message containing the decimal BMI
function displayMessage(BMI){
    if (BMI>=0 && BMI<= 18.4){
        // for underweight
        showMessage(BMI.toFixed(1), "underweight", "blue")
    }else if(BMI >=18.5 && BMI <= 24.9){
        // for normal
        showMessage(BMI.toFixed(1),"normal" ,"green")
    }else if(BMI >=25 && BMI <= 29.9){
        // for overweight
        showMessage(BMI.toFixed(1), "overweight","yellow")
    }else{
        // for obese
        showMessage(BMI.toFixed(1), "obese", "red")
    }
}

// clear inputs
function clearInput(){
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";

    // giev the focus to the height input field
    document.getElementById("height").focus();
}

// show message function
function showMessage(bmi, status, color){
    // set the BMI value in the DOM
    document.querySelector(".BMI-value").textContent = bmi;
    // Set the status
    document.querySelector(".status").textContent = status;
    // give it the reqiured color
    message.style.color = color;
    // make it visible with display: block
    message.style.display = "block";

}


// show error
function showError(){
    // create a new div element for the error message
    const errorMessage = document.createElement("div");
    // give it a class of error
    errorMessage.className = "error";
    // set text
    errorMessage.textContent = "Fill all fields!";
    // insert the error message into the DOM
    document.querySelector("#card-BMI").insertBefore(errorMessage, message);
    // clear the message after 2secs
    setTimeout(clearErrorMessage,2000);
}

function clearErrorMessage(){
    // remove the error message from the DOM
    document.querySelector(".error").remove();
}