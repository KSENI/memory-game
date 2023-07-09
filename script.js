'use strict'

//random icons on the cards' faces
function getRandomInteger (min,max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function SetIconInCardsAll () {
    let memojiArray = ['🐼', '🐱', '🐭', '🐹', '🐰', '🐻','🐼', '🐱', '🐭', '🐹', '🐰', '🐻'];
    for (let i=0; i<12; i++) {
        let randomIndexMemoji = getRandomInteger(0,memojiArray.length-1);
        document.getElementsByClassName('front')[i].textContent=memojiArray[randomIndexMemoji];
        memojiArray.splice(randomIndexMemoji,1);
    }
}

window.addEventListener('DOMContentLoaded', function (){
    SetIconInCardsAll();
}, false);

//flips
function FlipOnBack(number) {
    document.getElementsByClassName('front')[number].style.transform = 'rotateY(180deg)';
    document.getElementsByClassName('back')[number].style.transform = 'rotateY(360deg)';
    delete flippedCards[number];
}

function FlipOnFront(number) {
    document.getElementsByClassName('back')[number].style.transform = 'rotateY(180deg)';
    document.getElementsByClassName('front')[number].style.transform = 'rotateY(360deg)';  
    SaveFlippedCards(number);
}

// definition and displaying right couples
let flippedCards={}; 
let isCorrectPair = false;
let numberCorrectPair = 0;

function SaveFlippedCards (number) {
    if (Object.keys(flippedCards).length==0) {
        SaveFlippedCard(number);
        return;
    } 
    if  (Object.keys(flippedCards).length==1) {
        SaveFlippedCard(number);
        isCorrectPair = ComparePair(flippedCards);
        return isCorrectPair;
    }
    if (Object.keys(flippedCards).length == 2) {
        if (!isCorrectPair) {
            CloseWrongPair(flippedCards);
        } else {
            Clear(flippedCards);
        }
        SaveFlippedCard(number);
        return;
    }
}

function Clear(flippedCards) {
    for (let key in flippedCards) {
        delete flippedCards[key];
    }
    return flippedCards;
}

function ColorCorrectPair (flippedCards) {
    for (let key in flippedCards) {
        document.getElementsByClassName('front')[key].style.backgroundColor = '#5ad66f';
    }
}

function ColorWrongPair (flippedCards) {
    for (let key in flippedCards) {
        document.getElementsByClassName('front')[key].style.backgroundColor = '#f44336';
    }
}

function CloseWrongPair (flippedCards) {
    for (let key in flippedCards) {
        FlipOnBack(key);
        document.getElementsByClassName('front')[key].style.backgroundColor = '#fff';
    }
}

function ComparePair(flippedCards) {
    let firstNumber = Object.keys(flippedCards)[0];
    let secondNumber = Object.keys(flippedCards)[1];
    let firstSimbol = flippedCards[firstNumber];
    let secondSimbol = flippedCards[secondNumber];
    if (firstSimbol==secondSimbol) {
        ColorCorrectPair(flippedCards);
        numberCorrectPair++;
        if (numberCorrectPair==6) {
            document.getElementsByClassName('modal_text')[0].textContent = 'Win!'
            ShowModalWindow();
            clearTimeout(timerId);
            numberCorrectPair = 0;
        }
        return true;
    } else {
        ColorWrongPair(flippedCards);
        return false;
    }
} 

function SaveFlippedCard(number) {
    let simbol = document.getElementsByClassName('front')[number].textContent;
    flippedCards[number] = simbol;
}

//таймер
let hasTimerRuning = false;
let timerId;
function StartTimerOnFirstClick(){
    if (!hasTimerRuning) {
        Timer();
        hasTimerRuning = true;
        return hasTimerRuning;
    }
}

function Timer() {
    let counter = 59;
    (function delay(duration) {
    document.getElementsByClassName('timer')[0].textContent = (counter>9) ? '00:' + counter : '00:0' + counter;
    if(--counter >= 0)  {
       timerId = setTimeout(delay, duration, duration);
       return timerId;
    }
    else {
        document.getElementsByClassName('modal_text')[0].textContent = 'Lose';
        ShowModalWindow();
        return;
    }
    })(1000)  
}

// results
function ShowModalWindow() {
    document.getElementsByClassName('modal')[0].style.display = 'block';
    document.getElementsByClassName('shadow_layer')[0].style.display = 'block';
}

//restart
function RestartGame() {
    for (let i=0; i<12;i++) {
        FlipOnBack(i);
        document.getElementsByClassName('front')[i].style.backgroundColor='#fff';
    }
    SetIconInCardsAll();
    document.getElementsByClassName('modal')[0].style.display = 'none';
    document.getElementsByClassName('shadow_layer')[0].style.display = 'none';
    Timer();
}





