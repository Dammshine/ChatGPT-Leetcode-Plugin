'use strict';

// collects the input and stores the apikey

const submit = document.getElementById('submit-button');

submit.addEventListener("click", function(event) {
    event.preventDefault();
    const api_key = document.getElementById('apikey');
    console.log(api_key.value);
    chrome.storage.sync.set({'api_key': api_key.value});
});

function findTabId() {
    // const gettingCurrent = browser.tabs.getCurrent();
    chrome.tabs.query({active: true, currentWindow: true }, function(tabs){
        for (let tab of tabs) {
            if (tab.url.includes('leetcode.com/problems') !== true) {
                console.error('wrong tab');
            } else {
                console.log(tab.id);
                chrome.storage.sync.set({'tabId': tab.id});
            } 
        }
        
        // chrome.storage.sync.set({'tabId': tab.id});
    });
}

// on clicking the buttons, sends a message to background.js for the hint

const simple = document.getElementById('simple-button');

simple.addEventListener("click", function(event) {
    event.preventDefault();
    console.log('simple hint button');
    findTabId();
    chrome.runtime.sendMessage({message_type: "simple"});
});

const medium = document.getElementById('medium-button');

medium.addEventListener("click", function(event) {
    event.preventDefault();
    console.log('medium hint button');
    findTabId();
    chrome.runtime.sendMessage({message_type: "medium"});
});

const full = document.getElementById('full-button');

full.addEventListener("click", function(event) {
    event.preventDefault();
    console.log('full hint button');
    findTabId();
    chrome.runtime.sendMessage({message_type: "full"});
});

// in background.js, if request.message_type == "_" ... 
// then get the leetcode question and hint
