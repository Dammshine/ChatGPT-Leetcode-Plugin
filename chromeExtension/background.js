// chrome.runtime.message

// connect with the content.js page
chrome.runtime.onMessage.addListener( 
  function(request, response) {
    if (request.heading == "something") {
      // make a handler later on
      const api_key = chrome.storage.sync.get('api_key');
      // promises
      // if (api_key is invalid, then reject it and error message otherwise resole)
    }

    const openai = " url"
    // do a post request and get a response back from openai (hint)

    // send this response back to the content.js 
    //do chrome scripting in scipt.js
  }
)



