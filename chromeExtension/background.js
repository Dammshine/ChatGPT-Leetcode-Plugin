// chrome.runtime.message

// connect with the content.js page
chrome.runtime.onMessage.addListener( 
  function(request, response) {
    console.log("Get the request");

    if (request.heading == "something") {
      // make a handler later on
      const api_key = chrome.storage.sync.get('api_key');
      // promises
      // if (api_key is invalid, then reject it and error message otherwise resole)
    }

    const openai = " url"
    // do a post request and get a response back from openai (hint)

    // tabId is the unique identifier for the tab
    // console.log("Check");
    /* chrome.scripting
      .executeScript({
        target: {
          tabId: tabId,
        },
        files: ["./foreground.js"], 
    }).then((result) => {
        console.log(`Parsed result ${JSON.stringify(result)}`);
    }); */

    // send this response back to the content.js 
    // do chrome scripting in scipt.js
  }
)



