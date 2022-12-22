

// connect with the content.js page
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

function process_opnenai() {
  const openAiUrl = " url"
  const data = {
    "model":request.paragraph,
    "prompts": {tokens, etc}
  };

  try {
    const response = fetch(url, method: 'POST', {resquest:body})
  }
  catch (err) {

  }

}



