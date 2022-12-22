// connect with the content.js page
const openAiUrl = 'https://api.openai.com/v1/edits'

chrome.runtime.onMessage.addListener( 
  function(request) {
    if (request['heading'] != NULL) {
      // make a handler later on
      const api_key = chrome.storage.sync.get('api_key');
      // promises
      // if (api_key is invalid, then reject it and error message otherwise resole)
    }

    // do a post request and get a response back from openai (hint)

    // send this response back to the content.js 
    //do chrome scripting in scipt.js
  }
)
// how to get the content from leetcode???


function process_opnenai() {
  var leet_q = function() {
    return "yes"
  };

  const data = {
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
      body: JSON.stringify(data)
  });

  } catch (err) {
    console.log(err);
  };

}



