const fs = require('fs');

function getCountFilesInDirectory(dir) {
  // fs.readdir(dir, (err, files) => {
  //   //console.log(files.length);
  //   return files.length;
  // });
  var files = fs.readdirSync(dir);
  return files.length;
}

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
