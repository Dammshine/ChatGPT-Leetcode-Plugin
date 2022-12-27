/**
 * Get the description of question on leetcode page
 */

// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
// document.getElementsByTagName('head')[0].appendChild(script);

const question = document.querySelector('meta[name="description"]').content;
chrome.storage.sync.set({ question: question });

// M1: 
// sends a message to background.js like ("transfer system")
// onConnect() // finished with parsing the quesiton
// send a message saying something done with scraping leetcode

// M2: background.js sends a message to content and content sends the question to background
let myPort = browser.runtime.connect({name:"port-from-cs"});
myPort.postMessage({greeting: "hello from content script"});

myPort.onMessage.addListener((m) => {
  console.log("In content script, received message from background script: ");
  console.log(m.greeting);
  myPort.postMessage({question: question});
});
