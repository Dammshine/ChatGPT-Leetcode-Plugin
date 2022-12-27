// Check if answer being parsed
function checkAnswerExist() {
  return true;
}

/*
 * Get the hint stored, should be in the storage
 * @format as 
 * {
 *   ans: [string]
 * }
 */
function hintStored() {
  return {
    ans: ["// Yep this is the hint!!"]
  };
}

/**
 * Check if the url is valid 
 */
function validUrl(url) {
  return /^https:\/\/leetcode.com\/problems\/.+/.test(url);
}

/**
 * Write hint in code boxes
 */
function writeInBoxes(ans) {
  // Find the dom element
  const domViewLine = document.querySelector(".view-lines")
  if (!domViewLine) {
    return "A bug that need to be fixed.";
  }

  const lineElements = domViewLine.children;

  // A wise idea would be insert at the end
  // A good question would be how to do so????
  // Obviously I need the 
  let height = 8 + (18 * lineElements.length);
  for (let sentence of ans) {
    let divEle = document.createElement("div");
    divEle.style = `top:${height}px;height:18px;`;
    divEle.className = `view-line`;
    

    let spanEle = document.createElement("span");
    // Break sentence into words
    let words = sentence.split(" ");
    for (let word of words) {
      let wordEle = document.createElement("span");
      wordEle.className = 'mtk3';
      wordEle.innerText = word;
      spanEle.appendChild(wordEle);

      wordEle = document.createElement("span");
      wordEle.className = 'mtk1';
      wordEle.innerText = ' ';
      spanEle.appendChild(wordEle);
    }

    divEle.appendChild(spanEle);
    height += 18;
    domViewLine.appendChild(divEle)
    console.log(divEle);
  }
  console.log(lineElements.item(3));
}


if (checkAnswerExist()) {
  // get the hint from the storage
  let hints = hintStored();

  // Then put it in
  // Wow there is asynchronously involved very very sad
  setTimeout(() => {  writeInBoxes(hints.ans); }, 2000);
}

