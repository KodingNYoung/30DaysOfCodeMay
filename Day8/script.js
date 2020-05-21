const cells = Array.from(document.querySelectorAll(".input"));

for (let i =0; i < cells.length; i++){
    cells[i].addEventListener("click", handleClick)
}

function handleClick(){
    console.log("click")
}