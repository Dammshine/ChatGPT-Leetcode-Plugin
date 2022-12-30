/**
 * Get the description of question on leetcode page
 */
 
const question = document.querySelector('meta[name="description"]').content;
chrome.storage.sync.set({ question: question });
console.log(api_key = chrome.storage.sync.get('api_key'));

// M1: 
// sends a message to background.js like request[{'heading: done'}, {response: "(the leetcode question)"}]
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
