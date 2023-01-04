// connect with the content.js page
const openAiUrl = 'https://api.openai.com/v1/completions'

chrome.runtime.onMessage.addListener( 
  async function(request) {
    console.log(request);
    // A hint request
    if (request['message_type'] !== undefined) {
      // make a handler later on
      const api_key = await chrome.storage.sync.get('api_key');
      
      // doing promises later
      if (api_key === {}) {
        console.error('Could not get API key');
      } else {
        // console.log(api_key);
        const tabId = await chrome.storage.sync.get('tabId');
        console.log(tabId);
        if (tabId.tabId === undefined) {
          console.error("Unable to get tabID");
          return;
        }

        await chrome.scripting
          .executeScript({
            target: {
              tabId: tabId.tabId,
            },
            files: ["./content.js"], 
        });

        const res = await process_opnenai(api_key.api_key);
        console.log(res);

        if (res.error !== undefined) {
          
        } else {
          await chrome.storage.sync.set({'hint': res['choices'][0]});
          

          chrome.scripting
            .executeScript({
              target: {
                tabId: tabId.tabId,
              },
              files: ["./foreground.js"], 
          }).then((result) => {
            console.log(`Parsed result ${JSON.stringify(result)}`);
          });
        }
      }
      // promises
      // if (api_key is invalid, then reject it and error message otherwise resole)
    }
    // send this response back to the content.js 
    // do chrome scripting in scipt.js
  }
)

function hintFormatEasy() {
  return "\n\n Give two possible question tags:";
}

function hintFormatMedium() {
  return "\n\n Give two possible question tags and a line of explanation:";
}

function hintFormatHard() {
  return "\n\n Write psueodocode for this question with comment:";
}

async function process_opnenai(api_key) {
  let leet_q = await chrome.storage.sync.get('question');
  console.log({"leet_q": leet_q});

  const request_body = {
    "model": "text-davinci-003",
    "prompt": leet_q.question + hintFormatEasy(),
    "max_tokens": 2048,
    "temperature": 0,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "logprobs": null
  };

  try {
    const response = fetch(openAiUrl, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`,
      },
      body: JSON.stringify(request_body)
    });
    return (await response).json();
  } catch (err) {
    console.log(err);
    return -1;
  };
}


