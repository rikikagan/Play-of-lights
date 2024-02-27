// הקצאות
let saveNmes = JSON.parse(localStorage.getItem("Names"));
let savePassword = JSON.parse(localStorage.getItem("Passwords"));
let points=JSON.parse(localStorage.getItem("Mypoints"));


document.getElementById("arrow").addEventListener("click",popForm);

// החלפת החיצים
window.onload = function() {
var imageUrls = ["../img/חץ כחול.png", "../img/חץ סגול.png"];
var imageElement = document.getElementById("arrow");
var currentIndex = 0;
setInterval(function () {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    imageElement.src = imageUrls[currentIndex];
    console.log(imageElement.src);
}, 700);
}
// הוראות
var modal = document.getElementById('id01');
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// טופס
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    // Get the entered name and password
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    window.location.href = "game.html";
    alert("Registration successful!"); // Display a success message
      //המרת הנתונים למערכים
    let saveNmes = JSON.parse(localStorage.getItem("Names"));
    let savePassword = JSON.parse(localStorage.getItem("Passwords"));
    let points=JSON.parse(localStorage.getItem("Mypoints"));
    // שומרים את הנתון הנוכחי
     let currentName = document.querySelector("#name").value;
     let pass = document.querySelector("#password").value;
      //בדיקה אם המשתמש קיים
    let IsExsist = false;
    if (saveNmes) {
        for (let index = 0; index < saveNmes.length; index++) {
            if (saveNmes[index] == currentName && savePassword[index] == pass)
                IsExsist = true;
        }
    }
    else {
        saveNmes = [];
        savePassword = [];
        points=[];
    }
    if (!IsExsist) {
        saveNmes.push(currentName);
        savePassword.push(pass);
        points.push(0);
        // המרת כל הנתונים לתוך המישתנים על מנת שנוכל להתעסק איתם ב לוקל...
        localStorage.setItem("Names", JSON.stringify(saveNmes))
        localStorage.setItem("Passwords", JSON.stringify(savePassword))
        localStorage.setItem("Mypoints", JSON.stringify(points))
    }
       //שינוי הנתונים על מנת שנוכל להישתמש בהם אחר כך
       localStorage.setItem("Name", currentName);
       localStorage.setItem("Pass", pass);
    
});
// הקפצת טופס רישום
function popForm()
{
    document.getElementById("container").style.display="block";
}
