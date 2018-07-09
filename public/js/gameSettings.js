//path of page declaration
var path = window.location.pathname.toString();
path = path.replace('/customizeMoneyGame', '').replace(/\/id.*/, '');

// game elems declaration
var backBtn = document.getElementById('game-back');
var nextBtn = document.getElementById('game-next');
var statusBar = document.getElementById('game-statusBar');
var againBtn = document.getElementById('game-again');
var parnet;
var basket;

// changers declaration
var backBtnChanger = document.getElementById('backBtnChanger');
var statusBarChanger = document.getElementById('statusBarChanger');
var nextBtnChanger = document.getElementById('nextBtnChanger');
var againBtnChanger = document.getElementById('againBtnChanger');
var parnetChanger = document.getElementById('parnetChanger');
var basketChanger = document.getElementById('basketChanger');

// main part
disableByURL(path);

//end of main part

// function declaration part
function disable(elem) {
    elem.classList.add('disabled');
    elem.setAttribute('disabled', 'disabled');

    var label = elem.parentElement;
    label.classList.add('disabled');
}

function disableByURL(path) {
    switch (path) { //disable elems by path
        case '/collectionMoney':
            disable(backBtnChanger);
            disable(againBtnChanger);
            disable(basketChanger);
            break;
    
        case '/selectionGoods':
            disable(againBtnChanger);
            disable(parnetChanger);
            break;
    
        case '/paymentPurchase':
            disable(againBtnChanger);
            disable(basketChanger);
            break;
    
        case '/takeChangee':
            disable(nextBtnChanger);
            disable(basketChanger);
            break;
    
        default:
            break;
    }
}