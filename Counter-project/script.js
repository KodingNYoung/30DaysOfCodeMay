// a count project
// default value of count is Zero
// when the increase button is pressed, count increases by 1
// when the decrease button is pressed, count decreases by 1
// when count is greater than zero color turns green
// when count is lesser than zero color turns red

// get the required UI elements
let count= document.querySelector(".count"),
    increase = document.querySelector(".add"),
    decrease = document.querySelector(".subtract"),
    container = document.querySelector(".counter")
    count_value = Number(count.innerText);


function checkAndGiveColor(count, count_value){
    count.innerText = count_value;
    checkValueToColor(count.innerText, count);
}
//when the increase button is pressed increase the .count
increase.addEventListener("click", function increaseCount(){
    count_value += 1 ;
    checkAndGiveColor(count, count_value)
})
//when the decrease button is pressed decrease the .count
decrease.addEventListener("click", function decreaseCount(){
    count_value -= 1 ;
    checkAndGiveColor(count, count_value)
})

// checks the value of the count and give the corresponding
//color
function checkValueToColor(countValue, count){
    if (countValue < 0){
        count.style.color ="red";
        container.style.borderColor = "red";
    }else if (countValue > 0){
        count.style.color ="green";
        container.style.borderColor = "green";
    }else{
        count.style.color ="black";
        container.style.borderColor = "#f5f5f5";
    }
}