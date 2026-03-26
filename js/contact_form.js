const form = document.querySelector("form");
const themeButton = document.getElementById("themeToggle");
form.addEventListener("submit", function(event){
     event.preventDefault();
    if(!idExtractor("name").length >= 2){
        document.getElementById("form-feedback").textContent = "Please enter a name with at least 2 characters, commander!";
        document.getElementById("form-feedback").style.color = "red";
    } else if(!idExtractor("email").includes("@")){
        document.getElementById("form-feedback").textContent = "Please enter a valid email, commander!";
        document.getElementById("form-feedback").style.color = "red";
    } else if(!idExtractor("message").length >= 10){
        document.getElementById("form-feedback").textContent = "Please enter a message with at least 10 characters, commander!";
        document.getElementById("form-feedback").style.color = "red";
    }else{
        document.getElementById("form-feedback").textContent = "Form submitted successfully, commander!";
        document.getElementById("form-feedback").style.color = "green";
    }
});
themeButton.addEventListener("click", () =>{
    document.body.classList.toggle("light-mode")
    if(document.body.classList.contains("light-mode"))
        themeButton.textContent = "Dark Mode";
    else
        themeButton.textContent = "Light Mode";
});
Personalize_Greeting();


function idExtractor(elementId) {
    return form.elements.namedItem(elementId).value;
}

function Personalize_Greeting(){
    const ore = new Date().getHours();
    const greeting = document.getElementById("greeting");
    if (ore < 12 && ore >= 6) {
        greeting.textContent = "Good morning, commander!";
    } else if (ore < 18 && ore >= 12) {
        greeting.textContent = "Good afternoon, commander!";
    } else {
        greeting.textContent = "Good evening, commander!";
    }
}

