/*
 * When an .article-title is clicked, check if the .article-beacon that precedes it is :checked.
 * If so, then the article is to be collapsed; otherwise, it is to be expanded.
 * This script overrites the default collapsible behaviour, which is implemented by abusing selectors.
 * The behaviours specified in this script take precednece, as it uses inline styles
 *    (which supercede selectors).
*/
function getActualHeight (elem) {
  let styles = window.getComputedStyle(elem);
  
  return parseFloat(styles.height) 
    + parseFloat(styles.paddingTop) 
    + parseFloat(styles.paddingBottom)
    + (parseFloat(styles.marginTop)
      + parseFloat(styles.marginBottom))/2;
}

let articleContentArr = Array.from(document.getElementsByClassName('article-content'));
articleContentArr.forEach((content) => {
  let newDiv = document.createElement("div");
  Array.from(content.children).forEach ((childNode) => {
    newDiv.appendChild(childNode);
  });
  content.appendChild(newDiv);
  content.style.setProperty('height', getActualHeight(content.children[0])+'px');
});

let articleTitleArr = Array.from(document.getElementsByClassName('article-title'));
articleTitleArr.forEach((elem) => {
  let articleContent = elem.nextElementSibling;
  elem.addEventListener('click', () => {
    if (elem.previousElementSibling.checked) {
      elem.nextElementSibling.style.setProperty('height', 0);
    } else {
      elem.nextElementSibling.style.setProperty('height', 
      getActualHeight(articleContent.children[0])+'px');
    }
  });
});
