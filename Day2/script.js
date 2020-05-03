// initialize required variables
let canvas, clock;


// function to run all functions
runAllFunctions();
function runAllFunctions(){
    setUpCanvas();
}
// select canvas and get context to 2d
function setUpCanvas(){
    canvas = document.querySelector("#canvas");
    clock = canvas.getContext("2d");

    // set dimensions
    canvas.width = window.innerWidth;
    canvas.height = 450;

    // update clock every 1 secs
    setInterval(UpdateClock, 1000);
}

function UpdateClock(){
    // get the time
    
    // getTime();
    function getTime(){
        // get midnight, at 00:00
        let startOfDay = new Date();
        startOfDay.setHours(0);
        startOfDay.setMinutes(0);
        startOfDay.setSeconds(0);
        startOfDay.setMilliseconds(0);

        //to get the amount of milliseconds that has elapsed from 00:00
        return Date.now() - startOfDay.getTime();
    }
    let timeInMillseconds = getTime();


    // get hours, to minutes, to seconds
    let hours = timeInMillseconds / (60 * 60 * 1000),
        minutes = (hours * 60) % 60,
        seconds = (minutes * 60) % 60,
        //get the center of the circle
        center = {x:canvas.width/2 ,y: canvas.height/2};
        
    
    // clear the whole canvas
    clock.clearRect(0,0,canvas.width, canvas.height);

    // make the cap round
    clock.lineCap = "round";

    // get minuteHand();
    drawHourHand();
    // get minuteHand();
    drawMinuteHand();
    // get secondHand();
    drawSecondHand();

    // draw the face of the clock
    drawClockFace();
    
    function drawClockFace(){
        // draw border
        clock.lineWidth = 5;
        clock.strokeStyle = "white";
        clock.beginPath();
        clock.arc(center.x, center.y, 150, 0, Math.PI * 2);
        clock.stroke();

        // for the dashes
        clock.lineWidth = 2;
        for (let i =0; i < 60; i++){

            let radius = 135,
                length =5;
            clock.strokeStyle = "#000";
            if (i%5 ===0){
                radius -= length,
                length *= 2;
                clock.strokeStyle = "white" 
            }
            let angle = (Math.PI * 2 *(i/60)) - (Math.PI /2);
            //instantiate a Vector class
            const vector = new Vector(radius, angle);
            clock.beginPath();

            clock.moveTo(vector.getXCoordinate() + center.x, vector.getYCoordinate() + center.y);
            
            // add the length
            vector.changeMagnitude(radius+length);

            clock.lineTo(vector.getXCoordinate() + center.x, vector.getYCoordinate() + center.y);

            clock.stroke();
        }

        // for the numbers
        clock.font = "19px sans-serif";
        clock.fillStyle = "#ccc";
        clock.textAlign ="center";
        clock.textBaseline ="middle";
        for (let i =1; i <=12 ; i++){
            let radius = 115,
                angle = (Math.PI * 2 *(i/12)) - (Math.PI /2),
                vector = new Vector(radius, angle);
            
            clock.fillText(i, vector.getXCoordinate() + center.x, vector.getYCoordinate() + center.y)
        }

        // draw center button
        clock.beginPath();
        clock.arc(center.x, center.y, 4, 0,Math.PI *2);
        clock.fillStyle = "white";
        clock.strokeStyle = "black";
        clock.lineWidth = 5;
        clock.stroke();
        clock.fill();

    }

    // draw the hands
    
    
    function drawSecondHand(){
        // width of the second hand
        clock.lineWidth = 1.5;
        
        // set the color
        clock.strokeStyle = "#ccc";
        
        // start drawing
        clock.beginPath();
        
        // get angle of rotation from the 12 mark (this implis -90degs from the gotten angle)
        let angle = (Math.PI * 2 * (seconds/ 60))- (Math.PI/2);
        
        //instantiate a vector object, it takes in magnitude(length of hand) and angle
        let vector = new Vector(95, angle);
        
        // instantiate another vector object for the tail
        let vectorTail = new Vector(-20, angle);
        //minute hannd starts from center 
        clock.moveTo(vectorTail.getXCoordinate() + center.x, vectorTail.getYCoordinate() + center.y);


        // draw hand to (x coordinate of the length +center of the clock on x axis, y coordinate of the length + center of the clock on y axis)
        clock.lineTo(vector.getXCoordinate() + center.x, vector.getYCoordinate() + center.y);

        // draw line
        clock.stroke();
    }
    
    
    
     function drawMinuteHand(){
         // width of the second hand
         clock.lineWidth = 4;
         
         // set the color
         clock.strokeStyle = "#fff";
         
         // start drawing
         clock.beginPath();
         
         // get angle of rotation from the 12 mark (this implies -90degs from the gotten angle)
         let angle = (Math.PI * 2 * (minutes/ 60)) - (Math.PI/2);
         
         //instantiate a vector object takes in magnitude(length of hand) and angle
         let vector = new Vector(95, angle);
         
         //minute hannd starts from center 
         clock.moveTo(center.x, center.y);
 
         // draw hand to (x coordinate of the length +center of the clock on x axis, y coordinate of the length + center of the clock on y axis)
         clock.lineTo(vector.getXCoordinate() + center.x, vector.getYCoordinate() + center.y);
 
         // draw line
         clock.stroke();
     }
     

    
    
     function drawHourHand(){
         // width of the second hand
         clock.lineWidth = 4;
         
         // set the color
         clock.strokeStyle = "#fff";
         
         // start drawing
         clock.beginPath();
         
         // get angle of rotation from the 12 mark (this implies -90degs from the gotten angle)
         let angle = (Math.PI * 2 * (hours/ 12)) - (Math.PI/2);
         
         //instantiate a vector object takes in magnitude(length of hand) and angle
         let vector = new Vector(60, angle);
         
         //minute hannd starts from center 
         clock.moveTo(center.x, center.y);
 
         // draw hand to (x coordinate of the length +center of the clock on x axis, y coordinate of the length + center of the clock on y axis)
         clock.lineTo(vector.getXCoordinate() + center.x, vector.getYCoordinate() + center.y);
 
         // draw line
         clock.stroke();
     }
    
}

// all the calculations in form of functions
class Vector{
    constructor(mag,ang){
        this.mag = mag,
        this.ang = ang;
    }
    getXCoordinate(){
        return this.mag * Math.cos(this.ang);
    }
    
    getYCoordinate(){
        return this.mag * Math.sin(this.ang);
    }
    
    changeMagnitude(mag){
        this.mag = mag;
    }
}