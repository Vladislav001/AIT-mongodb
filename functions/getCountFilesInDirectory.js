const fs = require('fs');

function getCountFilesInDirectory(dir) {
  let files = fs.readdirSync(dir);
  return files.length;
}

// Вернем кол-во файлов для приложения MoneyGame
function getCountFilesInDirectoryMoneyGame() {
  const dirNextBtn = './public/applications/money_game/nextBtn';
  const dirBackBtn = './public/applications/money_game/backBtn';
  const dirAgainBtn = './public/applications/money_game/againBtn';
  const dirBasket = './public/applications/money_game/basket';
  const dirWallet = './public/applications/money_game/wallet';

  let countFiles = {};
  countFiles.againBtn = getCountFilesInDirectory(dirAgainBtn);
  countFiles.basket = getCountFilesInDirectory(dirBasket);
  countFiles.wallet = getCountFilesInDirectory(dirWallet);

  let countNextBtn = getCountFilesInDirectory(dirNextBtn);
  let countBackBtn = getCountFilesInDirectory(dirBackBtn);

  if (countNextBtn >= countBackBtn) {
    countFiles.nextBack = countBackBtn;
  }
  else {
    countFiles.nextBack = countNextBtn;
  }


  return countFiles;
}

module.exports.getCountFilesInDirectoryMoneyGame = getCountFilesInDirectoryMoneyGame;
