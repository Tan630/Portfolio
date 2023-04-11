/**
 * This script attempts to synchronize chagnes that occurs in one navigatuon
 *    bar to all navigation bars. The synchronizations are visual and achieved
 *    solely by applying the appropriate classes.
 * No pseudoclass activation occurs - doing so would not be standard-compliant.
 */

let navbarArr = Array.from(document.getElementsByClassName('s-tab-bar'));
let buttonsMatrix = [];


/**
 * buttonsMatrix holds an array of arrays. Each index corresponda a button type.
 * Each row is a buttone type, each column is a tab. E.g. index [2][1] is the
 *    Portfolio button in the Contact tab.
 *        ---- Tabs ----     | Buttons |s
 *    Cont. Port. Abou. Home.|         |
 *   [ []    []    []    [], Home button
 *     []    []    []    [], Contact button
 *     []    []    []    [], About button
 *     []    []    []    []  Home button
 */

navbarArr.forEach((navbar) => {
  let buttons = navbar.children[1].children;
  for (let i = 0; i < buttons.length; i++) {
    if (buttonsMatrix[i]===undefined) {
      buttonsMatrix[i] = [];
      buttonsMatrix[i].push(buttons[i]);
    } else {
      buttonsMatrix[i].push(buttons[i]);
    }
  }
});

buttonsMatrix.forEach ((buttonTypeArray) => {
  buttonTypeArray.forEach ((typedButton) => {
    typedButton.addEventListener('mouseenter', () => {
      buttonTypeArray.forEach ((callbackhell) => {
        callbackhell.classList.add('tab-bar__item-hover');
      });
    });
    
    typedButton.addEventListener('mouseleave', () => {
      buttonTypeArray.forEach (
        (callbackhell) => {callbackhell.classList.remove('tab-bar__item-hover');
      });
    });
  });
});

