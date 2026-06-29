// ===============================
// ELEMENTS
// ===============================

const boxes = document.querySelectorAll(".box");

const modeScreen = document.querySelector("#mode-screen");
const gameScreen = document.querySelector("#game-screen");

const singleBtn = document.querySelector("#single-btn");
const doubleBtn = document.querySelector("#double-btn");

const resetBtn = document.querySelector("#reset-btn");
const homeBtn = document.querySelector("#home-btn");
const newBtn = document.querySelector("#new-btn");

const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

const turnText = document.querySelector("#turn");

const scoreX = document.querySelector("#score-x");
const scoreO = document.querySelector("#score-o");
const scoreDraw = document.querySelector("#score-draw");

// ===============================
// VARIABLES
// ===============================

let gameMode = "";
let currentPlayer = "X";
let gameOver = false;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

// ===============================
// WIN PATTERNS
// ===============================

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

// ===============================
// MODE BUTTONS
// ===============================

singleBtn.addEventListener("click",()=>{

    gameMode="single";

    startGame();

});

doubleBtn.addEventListener("click",()=>{

    gameMode="double";

    startGame();

});

// ===============================
// START GAME
// ===============================

function startGame(){

    modeScreen.classList.add("hide");

    gameScreen.classList.remove("hide");

    resetBoard();

}

// ===============================
// RESET BOARD
// ===============================

function resetBoard(){

    currentPlayer="X";

    gameOver=false;

    turnText.innerText="Player X Turn";

    boxes.forEach(box=>{

        box.innerText="";

        box.disabled=false;

    });

}

// ===============================
// BOX CLICK
// ===============================

boxes.forEach((box,index)=>{

    box.addEventListener("click",()=>{

        if(gameOver) return;

        if(box.innerText!="") return;

        makeMove(box,index);

    });

});

// ===============================
// MAKE MOVE
// ===============================

function makeMove(box,index){

    box.innerText=currentPlayer;

    box.disabled=true;

    checkWinner();

    if(gameOver) return;

    if(gameMode==="double"){

        currentPlayer=currentPlayer==="X" ? "O":"X";

        turnText.innerText=`Player ${currentPlayer} Turn`;

    }

    else{

        currentPlayer="O";

        turnText.innerText="Computer Thinking...";

        setTimeout(computerMove,500);

    }

}

// ===============================
// COMPUTER MOVE
// ===============================

function computerMove(){

    if(gameOver) return;

    let empty=[];

    boxes.forEach((box,index)=>{

        if(box.innerText===""){

            empty.push(index);

        }

    });

    if(empty.length===0){

        checkWinner();

        return;

    }

    let random=Math.floor(Math.random()*empty.length);

    let move=empty[random];

    boxes[move].innerText="O";

    boxes[move].disabled=true;

    checkWinner();

    if(gameOver) return;

    currentPlayer="X";

    turnText.innerText="Player X Turn";

}

// ===============================
// RESET BUTTON
// ===============================

resetBtn.addEventListener("click",()=>{

    resetBoard();

});

// ===============================
// PLAY AGAIN
// ===============================

newBtn.addEventListener("click",()=>{

    msgContainer.classList.add("hide");

    resetBoard();

});

// ===============================
// HOME BUTTON
// ===============================

homeBtn.addEventListener("click",()=>{

    msgContainer.classList.add("hide");

    gameScreen.classList.add("hide");

    modeScreen.classList.remove("hide");

    resetBoard();

});
// ===============================
// CHECK WINNER
// ===============================

function checkWinner() {

    for (let pattern of winPatterns) {

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {

            if (pos1 === pos2 && pos2 === pos3) {

                gameOver = true;

                if (pos1 === "X") {
                    xScore++;
                    scoreX.innerText = xScore;
                } else {
                    oScore++;
                    scoreO.innerText = oScore;
                }

                showWinner(pos1);

                return;
            }
        }
    }

    checkDraw();

}

// ===============================
// DRAW
// ===============================

function checkDraw() {

    let filled = 0;

    boxes.forEach((box) => {

        if (box.innerText !== "") {

            filled++;

        }

    });

    if (filled === 9 && !gameOver) {

        gameOver = true;

        drawScore++;

        scoreDraw.innerText = drawScore;

        showDraw();

    }

}

// ===============================
// WINNER POPUP
// ===============================

function showWinner(player){

    boxes.forEach(box=>box.disabled=true);

    msg.innerHTML=`

        <h1>🏆 Winner</h1>

        <h2>${player}</h2>

        <p>Congratulations 🎉</p>

    `;

    msgContainer.classList.remove("hide");

}

// ===============================
// DRAW POPUP
// ===============================

function showDraw() { 
    boxes.forEach(box=>{
        box.disabled=true;
    });

    msg.innerHTML = `

        <h2>🤝 Match Draw </h2>

        <br>

        Thanks For Playing ❤️

        <br><br>

        ━━━━━━━━━━━━━━

        <br><br>

        <strong>Developed by Ali</strong>

        <br>

        HTML • CSS • JavaScript

    `;

    msgContainer.classList.remove("hide");

}