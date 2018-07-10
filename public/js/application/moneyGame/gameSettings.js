
// //path of page declaration
// var path = window.location.pathname.toString();
// path = path.replace("/customizeMoneyGame", "").replace(/\/id.*/, "");

// // game elems declaration
// var backBtn = document.getElementById("backBtn");
// var progressBar = document.getElementById("progressBar");
// var nextBtn = document.getElementById("nextBtn");
// var againBtn = document.getElementById("againBtn");
// var parnet = document.getElementById("parnet");
// var basket = document.getElementById("basket");

// // changers declaration
// var backBtnChanger = document.getElementById("backBtnChanger");
// var progressBarChanger = document.getElementById("progressBarChanger");
// var nextBtnChanger = document.getElementById("nextBtnChanger");
// var againBtnChanger = document.getElementById("againBtnChanger");
// var parnetChanger = document.getElementById("parnetChanger");
// var basketChanger = document.getElementById("basketChanger");

// // main part
// switch (path) {
//     case "/collectionMoney":
//         disableChanger(backBtnChanger);
//         disableChanger(againBtnChanger);
//         disableChanger(basketChanger);

//         // changeElem(progressBarChanger, progressBar);
//         // changeElem(nextBtnChanger, nextBtn);
//         // changeElem(parnetChanger, parnet);
//         break;

//     case "/selectionGoods":
//         disableChanger(againBtnChanger);
//         disableChanger(parnetChanger);

//         // changeElem(backBtnChanger, backBtn);
//         // changeElem(progressBarChanger, progressBar);
//         // changeElem(nextBtnChanger, nextBtn);
//         // changeElem(basketChanger, basket);
//         break;

//     case "/paymentPurchase":
//         disableChanger(againBtnChanger);
//         disableChanger(basketChanger);

//         // changeElem(backBtnChanger, backBtn);
//         // changeElem(progressBarChanger, progressBar);
//         // changeElem(nextBtnChanger, nextBtn);
//         // changeElem(parnetChanger, parnet);
//         break;

//     case "/takeChangee":
//         disableChanger(nextBtnChanger);
//         disableChanger(basketChanger);

//         // changeElem(backBtnChanger, backBtn);
//         // changeElem(progressBarChanger, progressBar);
//         // changeElem(againBtnChanger, againBtn);
//         // changeElem(parnetChanger, parnet);
//         break;

//     default:
//         break;
// }

// //listeners of changers
// backBtnChanger.addEventListener('change', changeElem);
// progressBarChanger.addEventListener('change', changeElem);
// nextBtnChanger.addEventListener('change', changeElem);
// againBtnChanger.addEventListener('change', changeElem);
// parnetChanger.addEventListener('change', changeElem);
// basketChanger.addEventListener('change', changeElem);

// console.log('<%=student%>')
// //end of main part

// // function declaration part
// function disableChanger(elem) {
//     elem.classList.add("disabled");
//     elem.setAttribute("disabled", "disabled");

//     var label = elem.parentElement;
//     label.classList.add("disabled");
// }

// function changeElem() {
//     if (this.getAttribute('type') == 'checkbox')
//         this.checked ? progressBar.classList.remove('none') : progressBar.classList.add('none');

//     else {
//         var searchId = this.id.toString().replace('Changer', '');
//         document.querySelector(searchId);

//         console.log(document.getElementById(searchId));
//     }
// }


