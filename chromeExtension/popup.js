// collects the input and stores the apikey

const submit = document.getElementById('submit-button');

submit.addEventListener("click", function(event) {
    event.preventDefault();
    const api_key = document.getElementById('apikey');
    console.log(api_key.value);
    chrome.storage.sync.set({'api_key': api_key});
});

function findTabId() {
    chrome.tabs.query({active: true}, function(tabs){
        console.log(tabs[0].id);
        return tabs[0].id;
    });
}

// on clicking the buttons, sends a message to background.js for the hint

const simple = document.getElementById('simple-button');

simple.addEventListener("click", function(event) {
    event.preventDefault();
    console.log('simple hint button');
    chrome.runtime.sendMessage({greeting: "simple", tabId: findTabId()});
});

const medium = document.getElementById('medium-button');

medium.addEventListener("click", function(event) {
    event.preventDefault();
    console.log('medium hint button');
    chrome.runtime.sendMessage({greeting: "medium", tabId: findTabId()});
});

const full = document.getElementById('full-button');

full.addEventListener("click", function(event) {
    event.preventDefault();
    console.log('full hint button');
    chrome.runtime.sendMessage({greeting: "full", tabId: findTabId()});
});

// in background.js, if request.greeting == "_" ... 
// then get the leetcode question and hint
