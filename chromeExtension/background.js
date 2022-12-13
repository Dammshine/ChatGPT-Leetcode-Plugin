// chrome.runtime.message

// Listen to the message from user clicking popup botton
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Sending request to openAI (async)
  // - Keep a state
  // Update it on frontend


  // tabId is the unique identifier for the tab
  console.log(tab.url);
  if (leetcodeExp.test(tab.url) && changeInfo.status === "complete") {
    // console.log("Check");
    chrome.scripting
        .executeScript({
            target: {
                tabId: tabId,
            },
            files: ["./foreground.js"], 
    }).then((result) => {
        console.log(`Parsed result ${JSON.stringify(result)}`);
    });

  }
  console.log("Skip");
});