/**
 * Get the description of question on leetcode page
 */ 
function preprocess_question(paragraph) {
  // if 
  var question = paragraph.replace(/<[^>]*>/g, "");
  question = question.replace('&nbsp;, ""');
  return question;
}

// get hint from leetcode
function getQuestion() {
  const domView = document.querySelector("._1l1MA");
  const elem = domView.getElementsByTagName('p');
  const question = preprocess_question(elem[0].innerHTML);
  // first paragraph
  return question;
}

// const question = document.querySelector('meta[name="description"]').content;
chrome.storage.sync.set({ 'question': getQuestion() });
