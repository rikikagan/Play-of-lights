//================ הקצאות משתנים============
let record = 0;
let saveNmes = JSON.parse(localStorage.getItem("Names"));
let savePassword = JSON.parse(localStorage.getItem("Passwords"));
let points = [];
points = JSON.parse(localStorage.getItem("Mypoints"));
const name = localStorage.getItem("Name");
const password = localStorage.getItem("Pass")
let random = 1, random2 = -1, random3 = -1;
let score = 0;
let time = 40;
let music;
let arr = ["../img/100 אחוז.png","../img/80אחוז.png", "../img/60 אחוז.png", "../img/40 אחוז.png", "../img/20 אחוז.png", "../img/5 אחוז.png"];
let index = 1;
let countbad = 0;
let numbers = document.getElementsByClassName("number");
let myLevel=0;

document.getElementById("level1").addEventListener("click", level1);
document.getElementById("level2").addEventListener("click", level2, startTime);
document.getElementById("level3").addEventListener("click", level3, startTime);

document.getElementById("again").addEventListener("click", doAgain);

//========================= הפעלה לפי שלב=========================
function level1() {
    display();
    set = setInterval("ChooseNumber(1)", 1200)
    music = document.getElementById("backMusic");
    music.play();
    myLevel=1;
}
function level2() {
    display();
    set = setInterval("ChooseNumber(2)", 1100)
    music = document.getElementById("backMusic");
    music.play();
    myLevel=2;
}
function level3() {
    display();
    set = setInterval("ChooseNumber(3)", 1000)
    music = document.getElementById("backMusic");
    music.play();
    myLevel=3;
}

// מאיר עיגולים לפי רמה===============
function ChooseNumber(level) {
    if (level >= 1) {
        random = Math.floor(Math.random() * 9) + 1;
        const number = document.getElementById(random);
        number.classList.add('active');
        setTimeout(() => {
            number.classList.remove('active');
        }, 1000);
        document.addEventListener('keydown', check);
        
    }
    if (level >= 2) {
        random2 = Math.floor(Math.random() * 9) + 1;
        const number = document.getElementById(random2);
        number.classList.add('active');
        setTimeout(() => {
            number.classList.remove('active');
        }, 1000);
        document.addEventListener('keydown', check);
        
    }
    if (level >= 3) {
        random3 = Math.floor(Math.random() * 9) + 1;
        const number = document.getElementById(random3);
        number.classList.add('active');
        setTimeout(() => {
            number.classList.remove('active');
        }, 1000);
        document.addEventListener('keydown', check);

    }
}

// =======================בדיקה האם לחיצה תקינה====================
function check() {
   let keysPressed=0;
    if (keysPressed<=1) {
        let press=event.key;
        if (press == random || press == random2 || press == random3) {
            let audio = document.getElementById("goodPress");
            audio.play();
            score += 5;
        }
        else {
            let audio = document.getElementById("badPress");
            audio.play()
            countbad++;
            if (score >= 5)
                score -= 5;
            else
                score = 0;
            goodOrBad();
        }
        keysPressed++;
       //  console.log(press);
    }
    
}
// ===============בודק אם יש 3 שגיאות -מוריד אחוזים===============
function goodOrBad() {
    if (countbad >= 3) {
        countbad = 0;
        if (index == arr.length) {
            youlose();
        }
        else {
            document.getElementById("percent").src = arr[index];
            index++;
        }
    }
}
// הפעלת הטיימר==========
function startTime() {
    setTime = setInterval("timer()", 1000);
}

// טיימר==================
function timer() {
    time--;
    if (time >= 0) {
        document.getElementById("time").innerHTML = time;
    }
    else {
        if (document.getElementById("lose").style.display != "block") {
            if (score > 100) {
                youWin();
            }
            else
                youlose();
        }
    }
}
// מעבר מדף שלבים למשחק=========
function display() {
    document.getElementById("level1").style.display = "none";
    document.getElementById("level2").style.display = "none";
    document.getElementById("level3").style.display = "none";
    document.getElementById("logolevel").style.display = "none";
    document.getElementById("percent").style.display = "block";
    document.getElementById("levels").style.display = "block";
    document.getElementById("again").style.display = "block";
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].style.display = "block";
    }
    document.getElementById("time").style.display = "block";
    startTime();
}
// ====================התחלת שלב שוב===================
function doAgain() {
    clearInterval(setTime);
    clearInterval(set);
    time = 41;
    document.getElementById("lose").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.getElementById("getMyScore").style.display="none";
    document.getElementById("getMyRecord").style.display="none";
    document.getElementById("percent").src = arr[0];
    index = 1;
    score = 0;
    countbad=0;
    if(myLevel==1)
        level1();
    else if(myLevel==2)
        level2();
    else if(myLevel==3)
        level3();
}
// ניצחון========================
function youWin() {
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].style.display = "none";
    }
    document.getElementById("time").style.display = "none";
    document.getElementById("percent").style.display = "none";
    document.getElementById("win").style.display = "block";
    document.getElementById("getMyScore").style.display="block";
    document.getElementById("getMyRecord").style.display="block";
    clearInterval(set);
    clearInterval(setTime);
    document.getElementById("backMusic").load();
    getRecord();
    getScore();
    return;
}
//כישלון===========================
function youlose() {
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].style.display = "none";
    }
    document.getElementById("time").style.display = "none";
    document.getElementById("percent").style.display = "none";
    document.getElementById("lose").style.display = "block";
    document.getElementById("getMyScore").style.display="block";
    document.getElementById("getMyRecord").style.display="block";
    clearInterval(set);
    document.getElementById("backMusic").load();
    getRecord();
    getScore();
}
// שיא==============================
function getRecord() {
    for (let i = 0; i < saveNmes.length; i++) {
        if (saveNmes[i] == name && password == savePassword[i]) {
            if (points == null) {
                points = [0];
                localStorage.setItem("Mypoints", JSON.stringify(points))
            }
            if (score > points[i]) {
                record = score;
                points[i] = score;
                localStorage.setItem("Mypoints", JSON.stringify(points))
            }
            else {
                record = points[i];
            }
        }
    }
    
}
// הצגת הניקוד על המסך============================
function getScore() {
    var newP = document.createElement("p");
    var s = document.createTextNode(score);
    newP.appendChild(s);
    newP.setAttribute("id", "myScore");
    document.getElementById("getMyScore").appendChild(newP);

    var newR = document.createElement("div");
    var r = document.createTextNode(record);
    newR.appendChild(r);
    newR.setAttribute("id", "myRecord");
    document.getElementById("getMyRecord").appendChild(newR);
    // console.log(score);
}