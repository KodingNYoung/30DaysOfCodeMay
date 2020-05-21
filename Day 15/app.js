const findBtn = document.querySelector(".find-btn");

const updateUI = (user) => {
    // create the ui
    const card = document.createElement("div");

    // give it a class
    card.className = "github-user-card card";

    // define the inner text
    card.innerHTML =  `
    <!-- fullname as header -->
    <h2 class="fullname">${user.name}</h2>
    <div class="card-info">
        <!-- avatar -->
        <div class="avatar">
            <img src="${user.avatar_url}">
        </div>
        <div class="other-info">
            <!-- username -->
            <div class="username__card"><span>Username:</span> ${user.login}</div>
            <!-- email -->
            <div class="email__card"><span>Email:</span> ${user.email}</div>
            <!-- followers -->
            <div class="followers__card"><span>Followers:</span> ${user.followers}</div>
            <!-- profile link -->
            <div class="profile-link">
                <a href="${user.html_url}" target="__blank"> Visit github profile</a>
            </div>
        </div>
    </div>
    `
    // attach it to the DOM
    document.body.append(card);
}
const errorDisappear = () => {
    const errorMessage = document.querySelector(".error");
    
    // make the error message disappear gradually
    errorMessage.style.opacity = 0;
}
const showError= (user) => {
    // create the ui
    const card = document.createElement("div");

     // give it a class
     card.className = "github-user-card error card";

     // define the inner text
    card.textContent =  `Enter a valid github username!`
    
    // attach it to the DOM
    document.body.append(card);

    // make it disappear after 3secs
    setTimeout(errorDisappear, 3000);
}
const insertPreloader = () => {
    // add a preloader
    const preloader = document.createElement("div");

    // add class
    preloader.className = "preloader";
    
    // create img
    const image = document.createElement("img");
    image.src = "25.gif";

    // append the img to div
    preloader.appendChild(image);

    // append preloader to DOM
    document.body.appendChild(preloader);

}

const removePreloeader = () => {
    document.querySelector(".preloader").remove();
}

const getUser = (e) => {
    // delete a card if there is any
    if(document.querySelector(".card")){
        document.querySelector(".card").remove();
    }
    
    // insert preloader to DOM
    insertPreloader();

    // get the value of the username input
    const UIusername = document.getElementById("username").value;

    // if the input is empty just stop
    if (!UIusername) {
        alert("Please, enter a github username!");
        return
    };

    // if not continue with sending the request containing the username
    fetch(`https://api.github.com/users/${UIusername}`)
        .then(res => res.json())
        .then(user => {
            removePreloeader();
            if (user.login){
                updateUI(user);
            }else{

                // show error message
                // console.log("booo!")
                showError(user);
            }
        })
        .catch(err => console.log(err))

    document.getElementById("username").value = "";  
}


findBtn.addEventListener("click", getUser)