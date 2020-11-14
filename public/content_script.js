/**
 * ==========================================================================================
 * Util
 * ==========================================================================================
 */

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendMessage(title, message, sound) {
  chrome.runtime.sendMessage({
    type: "sound",
    title,
    message,
    sound,
  });
}

/**
 * ==========================================================================================
 * Feature #1
 * Remove Uniswap Warning
 * ref: https://github.com/bo0st3r/UniswapWarningRemover/blob/master/uniswap_script.js
 * ==========================================================================================
 */

(async function () {
  var btn,
    i = 0;

  // Loops every 200ms until the button is found (because it is displayed after page has loaded)
  // If no button is found after 30 tries, stops
  while (!btn && i++ < 100) {
    await wait(200).then(() => {
      btn = document.querySelector(".token-dismiss-button");
    });
  }

  // Queries the "I understand" box
  let checkBoxParent = document.querySelector(".understand-checkbox")
    .parentElement;

  // Checks the "I understand" box, then clicks on the button
  if (btn && checkBoxParent) {
    checkBoxParent.click();
    btn.click();
  }

  wait(150).then(() => {
    document.querySelector(".flLCKI").click();
  });
})();

/**
 * ==========================================================================================
 * Feature #2
 * Add price alert
 * ==========================================================================================
 */

window.onload = fetch(chrome.extension.getURL("/disp.html"))
  .then((response) => response.text())
  .then((data) => {
    var mainDiv = document.createElement("div");
    mainDiv.id = "mainDiv";
    mainDiv.innerHTML = data;
    document.body.appendChild(mainDiv);

    var token1Value = 0;
    var token2Value = 0;
    var token1Symbol = "";
    var token2Symbol = "";
    var targetUpPriceToken2 = 0;
    var targetDownPriceToken2 = 0;
    var isNotified = false;
    var isInitialized = false;

    // input
    var inputUpEl = mainDiv.querySelector("#up-price");
    var inputDownEl = mainDiv.querySelector("#down-price");

    setInterval(() => {
      if (!isInitialized || isNotified) return;
      // token-amount-input
      var inputAmountEls = document.querySelectorAll(".token-amount-input");
      // token-symbol-container
      var inputSymbolEls = document.querySelectorAll(".token-symbol-container");
      if (inputAmountEls.length >= 2) {
        token1Value = inputAmountEls[0].value;
        token2Value = inputAmountEls[1].value;
        token1Symbol = inputSymbolEls[0].textContent;
        token2Symbol = inputSymbolEls[1].textContent;

        if (
          targetUpPriceToken2 &&
          Number(token2Value) > Number(targetUpPriceToken2)
        ) {
          sendMessage(
            `WINNING!`,
            `${token1Value} ${token1Symbol} is now worth ${token2Value} ${token2Symbol}`,
            "dominating"
          );
          isNotified = true;
        } else if (
          targetDownPriceToken2 &&
          Number(token2Value) < Number(targetDownPriceToken2)
        ) {
          sendMessage(
            `LOSING!`,
            `${token1Value} ${token1Symbol} is now worth ${token2Value} ${token2Symbol}`,
            "heyheyhey"
          );
          isNotified = true;
        }
      }
    }, 1000);

    inputUpEl.onchange = function (e) {
      isInitialized = true;
      isNotified = false;
      targetUpPriceToken2 = e.target.value;
    };
    inputDownEl.onchange = function (e) {
      isInitialized = true;
      isNotified = false;
      targetDownPriceToken2 = e.target.value;
    };
  })
  .catch((err) => {
    // handle error
  });

// var token1Value = 0;
// var token2Value = 0;
// var token1Symbol = "";
// var token2Symbol = "";
// var targetUpPriceToken2 = 0;
// var targetDownPriceToken2 = 0;
// var isNotified = false;
// var isInitialized = false;

// setInterval(() => {
//   if (!isInitialized || isNotified) return;
//   // token-amount-input
//   var inputAmountEls = document.querySelectorAll(".token-amount-input");
//   // token-symbol-container
//   var inputSymbolEls = document.querySelectorAll(".token-symbol-container");
//   if (inputAmountEls.length >= 2) {
//     token1Value = inputAmountEls[0].value;
//     token2Value = inputAmountEls[1].value;
//     token1Symbol = inputSymbolEls[0].textContent;
//     token2Symbol = inputSymbolEls[1].textContent;

//     if (
//       targetUpPriceToken2 &&
//       Number(token2Value) > Number(targetUpPriceToken2)
//     ) {
//       sendMessage(
//         `WINNING!`,
//         `${token1Value} ${token1Symbol} is now worth ${token2Value} ${token2Symbol}`,
//         "dominating"
//       );
//       isNotified = true;
//     } else if (
//       targetDownPriceToken2 &&
//       Number(token2Value) < Number(targetDownPriceToken2)
//     ) {
//       sendMessage(
//         `LOSING!`,
//         `${token1Value} ${token1Symbol} is now worth ${token2Value} ${token2Symbol}`,
//         "heyheyhey"
//       );
//       isNotified = true;
//     }
//   }
// }, 1000);

// var stylesheet = document.createElement("style");
// stylesheet.innerText = `
// #mainDiv {
//   background: #6c5ce7;
//   position:fixed;
//   padding:16px;
//   background:#6c5ce7;
//   bottom:0;
//   left:0;
//   cursor:pointer;
// }
// #mainDiv:hover {
//   background: #a29bfe;
// }
// `;
// document.body.append(stylesheet);
// var mainDiv = document.createElement("div");
// mainDiv.id = "mainDiv";
// mainDiv.style = "";
// document.body.appendChild(mainDiv);
// mainDiv.innerHTML = `<div style="font-size:20px;display:flex;flex-direction:column;">
//   <div style="display:flex;justify-content:space-between;">
//     <span>Big Moon: </span>
//     <input type="number" id="up-price" />
//   </div>
//   <div style="display:flex;justify-content:space-between;">
//     <span>Big Doom: </span>
//     <input type="number" id="down-price" />
//   </div>
// </div>`;
// // input
// var inputUpEl = document.querySelector("#up-price");
// var inputDownEl = document.querySelector("#down-price");

// inputUpEl.onchange = function (e) {
//   isInitialized = true;
//   isNotified = false;
//   targetUpPriceToken2 = e.target.value;
// };
// inputDownEl.onchange = function (e) {
//   isInitialized = true;
//   isNotified = false;
//   targetDownPriceToken2 = e.target.value;
// };
