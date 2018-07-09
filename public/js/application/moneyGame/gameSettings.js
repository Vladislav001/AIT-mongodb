//path of page declaration
var path = window.location.pathname.toString();
path = path.replace("/customizeMoneyGame", "").replace(/\/id.*/, "");

// game elems declaration
var backBtn = document.getElementById("game-back");
var progressBar = document.getElementById("game-progressBar");
var nextBtn = document.getElementById("game-next");
var againBtn = document.getElementById("game-again");
var parnet = document.getElementById("game-parnet");
var basket = document.getElementById("game-basket");

// changers declaration
var backBtnChanger = document.getElementById("backBtnChanger");
var progressBarChanger = document.getElementById("progressBarChanger");
var nextBtnChanger = document.getElementById("nextBtnChanger");
var againBtnChanger = document.getElementById("againBtnChanger");
var parnetChanger = document.getElementById("parnetChanger");
var basketChanger = document.getElementById("basketChanger");

// main part
switch (
path //disable elems by path
) {
    case "/collectionMoney":
        disableChanger(backBtnChanger);
        disableChanger(againBtnChanger);
        disableChanger(basketChanger);

        // changeElem(progressBarChanger, progressBar);
        // changeElem(nextBtnChanger, nextBtn);
        // changeElem(parnetChanger, parnet);
        break;

    case "/selectionGoods":
        disableChanger(againBtnChanger);
        disableChanger(parnetChanger);

        // changeElem(backBtnChanger, backBtn);
        // changeElem(progressBarChanger, progressBar);
        // changeElem(nextBtnChanger, nextBtn);
        // changeElem(basketChanger, basket);
        break;

    case "/paymentPurchase":
        disableChanger(againBtnChanger);
        disableChanger(basketChanger);

        // changeElem(backBtnChanger, backBtn);
        // changeElem(progressBarChanger, progressBar);
        // changeElem(nextBtnChanger, nextBtn);
        // changeElem(parnetChanger, parnet);
        break;

    case "/takeChangee":
        disableChanger(nextBtnChanger);
        disableChanger(basketChanger);

        // changeElem(backBtnChanger, backBtn);
        // changeElem(progressBarChanger, progressBar);
        // changeElem(againBtnChanger, againBtn);
        // changeElem(parnetChanger, parnet);
        break;

    default:
        break;
}

//listeners of changers
// backBtnChanger.onChange = changeElem(backBtnChanger, backBtn);
// progressBarChanger.onchange = function() {
//     if (this.checked == true) progressBar.classList.remove('none');
//     else progressBar.classList.add('none');
// }

backBtnChanger.addEventListener('change', changeElem);
progressBarChanger.addEventListener('change', changeElem);
nextBtnChanger.addEventListener('change', changeElem);
againBtnChanger.addEventListener('change', changeElem);
parnetChanger.addEventListener('change', changeElem);
basketChanger.addEventListener('change', changeElem);
// nextBtnChanger.onChange = changeElem(nextBtnChanger, nextBtn);
// againBtnChanger.onChange = changeElem(againBtnChanger, againBtn);
// parnetChanger.onChange = changeElem(parnetChanger, parnet);
// basketChanger.onChange = changeElem(basketChanger, basket);
//end of main part

// function declaration part
function disableChanger(elem) {
    elem.classList.add("disabled");
    elem.setAttribute("disabled", "disabled");

    var label = elem.parentElement;
    label.classList.add("disabled");
}

function changeElem() {
    if (this.getAttribute('type') == 'checkbox') 
    this.checked ? progressBar.classList.remove('none') : progressBar.classList.add('none');

    else {
        console.log(this.id.toString().replace('Changer', ''));
    }
}

