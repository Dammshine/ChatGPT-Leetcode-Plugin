// connect with the content.js page
const openAiUrl = 'https://api.openai.com/v1/edits'

chrome.runtime.onMessage.addListener( 
  function(request) {
    if (request['heading'] != NULL) {
      // make a handler later on
      const api_key = chrome.storage.sync.get('api_key');
      // doing promises later
      if (!api_key) {
        console.error('Could not get API key');
      } else {
        const res = process_opnenai(api_key);
        if (res.response.statusCode === 200) {
          chrome.storage.sync.set('hint', res.response.body);
        } else {
          console.error('Could not get hint');
        }
      }
      // promises
      // if (api_key is invalid, then reject it and error message otherwise resole)
    }
    // send this response back to foreground.js
    //do chrome scripting in scipt.js
    // chrome.tabs.sendMessage()
  }
)

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

// do a post request and get a response back from openai (hint)
async function process_opnenai(api_key) {
  leet_q = getQuestion();

  const request_body = {
    "model": "text-davinci:003",
    "inputs": leet_q,
    "instruction": "Give me an verbal answer"
  };

  try {
    const response = fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`,
      },
      body: JSON.stringify(request_body)
    });
    return (await response).json;

  } catch (err) {
    console.log(err);
    return -1;
  };

}



