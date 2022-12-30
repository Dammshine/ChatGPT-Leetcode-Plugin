// connect with the content.js page
const openAiUrl = 'https://api.openai.com/v1/edits'

chrome.runtime.onMessage.addListener( 
  async function(request) {
    console.log(request);
    // A hint request
    if (request['message_type'] !== undefined) {
      console.log(`tabId: ${request.tabId}`);
      // make a handler later on
      const api_key = await chrome.storage.sync.get('api_key');
      
      // doing promises later
      if (api_key === {}) {
        console.error('Could not get API key');
      } else {
        // console.log(api_key);
        const res = await process_opnenai(api_key.api_key);
        console.log(api_key);

        if (res.error !== undefined) {
          
        } else {
          await chrome.storage.sync.set({'hint': res['choices'][0]});
          const tabId = await chrome.storage.sync.get('tabId');

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

/*function preprocess_question(paragraph) {
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
*/

async function process_opnenai(api_key) {
  let leet_q;
  chrome.runtime.sendMessage('get-question', (response) => {
    // get an asynchronous response with the data from the content.js
    console.log('received question', response);
    leet_q = response;
  });

  console.log(leet_q);

  const request_body = {
    "model": "text-davinci-edit-001",
    "input": leet_q,
    "instruction": "Give me an verbal answer"
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


