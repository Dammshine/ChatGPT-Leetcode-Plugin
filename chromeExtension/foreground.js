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
async function hintStored() {
  let ans = await chrome.storage.sync.get('hint');
  return ans;
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

function processLine(line, limit) {
  let words = line.split(' ');
  let ret = [];
  let currStr = "";
  for (let word of words) {
    if (currStr.length + word.length > limit) {
      ret.push(currStr);
      currStr = word;
    } else {
      currStr += " " + word;
    }
  }
  if (currStr.length > 0) {
    ret.push(currStr);
  }
  
  return ret;
}

/**
 * Convert a string to a array of elements
 */
function processHint(hint) {
  // Break the string by line
  let hints = hint.split('\n');

  let retHints = [];
  for (let h of hints) {
    // Check the length
    let lines = processLine(h, 50);
    for (let line of lines) {
      retHints.push(line);
    }
    // For line break, add a whole break
    retHints.push("");
  }
  return retHints;
}

async function main() {
  if (checkAnswerExist()) {
    // get the hint from the storage
    var hints = await hintStored();
    
    // Then put it in
    // Wow there is asynchronously involved very very sad
    setTimeout(() => {  
      console.log(hints);
      var hint = hints['hint']['text'];
      var processedHint = processHint(hint);
      console.log("Here");
      // console.log(processedHint);
      chrome.storage.sync.set({'ProcessedHint': processedHint})

      writeInBoxes(processedHint); 
    }, 2000);
  }
}

main();


