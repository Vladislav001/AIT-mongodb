const fs = require('fs');

// переделать в асинхрон(как ниже)
function getCountFilesInDirectory(dir, callback) {
  var files = fs.readdirSync(dir);
  return files.length;
}

// function getCountFilesInDirectory(path, callback) {
//     fs.readdir(path, function (err, content) {
//         if (err) return callback(err)
//         callback(null, content)
//     })
// }

// Вернем кол-во файлов для приложения MoneyGame
function getCountFilesInDirectoryMoneyGame() {
  const dirNextBtn = './public/application/applicationImages/MoneyGame/nextBtn';
  const dirBackBtn = './public/application/applicationImages/MoneyGame/backBtn';
  const dirAgainBtn = './public/application/applicationImages/MoneyGame/againBtn';
  const dirBasket = './public/application/applicationImages/MoneyGame/basket';
  const dirWallet = './public/application/applicationImages/MoneyGame/wallet';

  var countFiles = {};
  countFiles.againBtn = getCountFilesInDirectory(dirAgainBtn);
  countFiles.basket = getCountFilesInDirectory(dirBasket);
  countFiles.wallet = getCountFilesInDirectory(dirWallet);

  var countNextBtn = getCountFilesInDirectory(dirNextBtn);
  var countBackBtn = getCountFilesInDirectory(dirBackBtn);
  if(countNextBtn >= countBackBtn)
    countFiles.nextBack = countBackBtn;
  else
    countFiles.nextBack = countNextBtn;

  return countFiles;
}

module.exports.getCountFilesInDirectory = getCountFilesInDirectory;
module.exports.getCountFilesInDirectoryMoneyGame = getCountFilesInDirectoryMoneyGame;
