// list of days and months
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"],
    days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];


// create a constructor of each note
function Note(note, topic, date, time){
    this.note = note,
    this.topic = topic,
    this.date = date,
    this.time = time;
}

runEventListeners();
function runEventListeners(){
    // to the document on load
    document.addEventListener("DOMContentLoaded", getNotesFromLS);

    // to the form for 
    document.getElementById("submit-btn").addEventListener("click", addNote);

    // to the card and delegate to different btns
    document.getElementById("note-card__container").addEventListener("click", delegate);

}


function getListFromLS(){
    // set a list of note objects
   let notes;
   // check if there is a list available for note ogjects
   if (localStorage.getItem("notes") === null){
       // if it is not, make a new array
       notes = [];
   }else{
       // if it is, get the array from the LS
       notes = JSON.parse(localStorage.getItem("notes"));
   }
   
   return notes
}

// everytime the page loads
function getNotesFromLS(){
    //get list from LS
    const notes = getListFromLS();

    notes.forEach(function(noteOBJ){
        if (noteOBJ.topic=== ""){
            noteOBJ.topic = "Unset";
        }
        // console.log(note, topic, date,time)
        // create note card
        const noteCard = document.createElement("div");
    
        // give it a note class of note-card
        noteCard.className  = "note-card";
    
        // text node
        const inner = `<div class="date">${noteOBJ.date}</div>
                    <div class="time">${noteOBJ.time}</div>
                    <h3 class="topic-text">Topic: ${noteOBJ.topic}</h3>
                    <p class="note-text">${noteOBJ.note}</p>
                    <div class="btn-container">
                        <i class="far fa-edit" title="Edit note"></i>
                        <button title="Delete note" class="delete-btn">X</button>
                    </div>`
        
        // append text to the notecard
        noteCard.innerHTML = inner;
        
        // append note card to container
        document.getElementById("note-card__container").appendChild(noteCard);
    });

}

// when the submit button is clicked
function addNote(e){    
    // get values input fields
    const topic = document.getElementById("topic").value,
          note = document.getElementById("note").value;

    // get time and date
    const date = getDate(),
          time = getTime();

    // create an instance of the Note constructor
    const noteOBJ = new Note(note, topic, date, time);

    // check if note input is empty before inserting to DOM
    if (note === ""){ 
        alert("Input your note!")
    }else{
        createNote(noteOBJ);

         // store in LS
        storageToLS(noteOBJ);

        // empty the input
        document.getElementById("topic").value = "";
        document.getElementById("note").value = "";
    }

    
   


    e.preventDefault();
}
// get time and date
function getDate(){
    // get day, date, month and year
    const day = days[new Date().getUTCDay()],
        month = months[new Date().getUTCMonth()],
        dateNum = new Date().getUTCDate(),
        year = new Date().getUTCFullYear();

    
    const date = `${day}, ${month} ${dateNum}, ${year}.`;
    
    return date;
}
function getTime(){
    let hour, minute;

    if (String(new Date().getHours()).length === 1){
        hour = `0${new Date().getHours()}`;
    }else{
        hour = `${new Date().getHours()}`;
    }

    if (String(new Date().getMinutes()).length === 1){
        minute = `0${new Date().getMinutes()}`;
    }else{
        minute = `${new Date().getMinutes()}`;
    }
    
    return `${hour}:${minute}`;
}

 // store in LS
function storageToLS(noteOBJ){
    // get list from LS
    let notes = getListFromLS(); 

   // append items to the list
   notes.push(noteOBJ);

   // stored to local storage
   localStorage.setItem("notes", JSON.stringify(notes));
}
// create note and insert in the DOM
function createNote(noteOBJ){
    if (noteOBJ.topic=== ""){
        noteOBJ.topic = "Unset";
    }
    // console.log(note, topic, date,time)
    // create note card
    const noteCard = document.createElement("div");

    // give it a note class of note-card
    noteCard.className  = "note-card";

    // text node
    const inner = `<div class="date">${noteOBJ.date}</div>
                <div class="time">${noteOBJ.time}</div>
                <h3 class="topic-text">Topic: ${noteOBJ.topic}</h3>
                <p class="note-text">${noteOBJ.note}</p>
                <div class="btn-container">
                        <i class="far fa-edit" title="Edit note"></i>
                        <button title="Delete note" class="delete-btn">X</button>
                </div>`
    
    // append text to the notecard
    noteCard.innerHTML = inner;
    
    // append note card to container
    document.getElementById("note-card__container").appendChild(noteCard);
}
// event delegated
function delegate(e){
    if(e.target.className === "delete-btn"){
        e.target.parentElement.parentElement.remove();

        // remove from LS
        removeFromLS(e.target.parentElement.previousElementSibling.textContent);
    }else if(e.target.className.includes("fa-edit")){
        // get the note and topic text
        let note =  e.target.parentElement.previousElementSibling.textContent,
            topic=e.target.parentElement.previousElementSibling.previousElementSibling.textContent.split("Topic: ")[1];

        // remove from UI
        e.target.parentElement.parentElement.remove();
        
        // remove from LS
        removeFromLS(e.target.parentElement.previousElementSibling.textContent);
        
        // assign the note and topic values to the inputs
        document.getElementById("note").value = note;
        if (topic !== "Unset"){
            document.getElementById("topic").value = topic;
        }

        // focus on the notes
        document.getElementById("note").focus();
    }
}

function removeFromLS(text){
    // get list from LS
    let notes = getListFromLS();

    notes.forEach(function(note, index){
        if (note.note === text){
            notes.splice(index,1);
        }
    })
    
    //set notes back to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
}