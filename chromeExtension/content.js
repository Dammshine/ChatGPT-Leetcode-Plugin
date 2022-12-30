/**
 * Get the description of question on leetcode page
 */
 
const question = document.querySelector('meta[name="description"]').content;
chrome.storage.sync.set({ question: question });

// background.js sends a message to content and content sends the question to background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // a page requests a hint, respond with a copy of the question
  if (message === 'get-question') {
      sendResponse(question);
  }
});