

var path = window.location.pathname.toString();
path = path.replace('/customizeMoneyGame', '').replace(/\/id.*/, '');

console.log(path);

switch (path) {
    case '/collectionMoney':
        disable(document.getElementById('backBtnChanger'));
        disable(document.getElementById('againBtnChanger'));
        disable(document.getElementById('basketChanger'));
        break;

    case '/selectionGoods':
        disable(document.getElementById('againBtnChanger'));
        disable(document.getElementById('parnetChanger'));
        break;

    case '/paymentPurchase':
        disable(document.getElementById('againBtnChanger'));
        disable(document.getElementById('basketChanger'));
        break;

    case '/takeChangee':
        disable(document.getElementById('nextBtnChanger'));
        disable(document.getElementById('basketChanger'));

    default:
        break;
}

function disable(elem) {
    elem.classList.add('disabled');
    elem.setAttribute('disabled', 'disabled');

    var label = elem.parentElement;
    label.classList.add('disabled');
}