self.window = self;
importScripts('./jsrsasign-all-min.js');

let user_signed_in = false;

const CLIENT_ID = encodeURIComponent('363457913264-fo25p9iacok2l7p9nsanv4rkp1f7jtl1.apps.googleusercontent.com');
const RESPONSE_TYPE = encodeURIComponent('id_token');
const REDIRECT_URI = encodeURIComponent('https://poeomcecglpboapdobgaibdgendljfcd.chromiumapp.org');
const STATE = encodeURIComponent('read3ase');
const SCOPE = encodeURIComponent('openid');
const PROMPT = encodeURIComponent('consent');

function create_oauth2_url() {
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

    let url = 
    `https://accounts.google.com/o/oauth2/v2/auth
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URI}
&state=${STATE}
&scope=${SCOPE}
&prompt=${PROMPT}
&nonce=${nonce}
    `;

    return url;
}

function is_user_signed_in() {
    return user_signed_in;
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // login stuff
    if (request.message === 'login') {
        if (is_user_signed_in()) {
            console.log("User is already signed in.");
        } else {
            chrome.identity.launchWebAuthFlow({
            url: create_oauth2_url(),
            interactive: true
            }, function (redirect_url) {
                // take out id_token parameter from redirect_url
                let id_token = redirect_url.substring(redirect_url.indexOf('id_token=') + 9);
                id_token = id_token.substring(0, id_token.indexOf('&'));

                const user_info = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(id_token.split(".")[1]));

                if ((user_info.iss === 'https://accounts.google.com' || user_signed_in.iss === 'accounts.google.com')
                    && user_info.aud === CLIENT_ID) {
                    chrome.action.setPopup({ popup: 'preferences-popup.html'}, function() {
                        user_signed_in = true;
                        sendResponse('success');
                    });
                } else {
                    console.log("Could not authenticate.");
                }
            });
            return true;
        }
    }
    // logout stuff
    if (request.message === 'logout') {
        chrome.storage.local.remove('accessToken', function() {
            user_signed_in = false;
            console.log('Access token removed');
            chrome.action.setPopup({ popup: 'login-popup.html'}, function() {
            });
        });
    }

    // save button stuff
    if (request.message === 'saveFont') {
        console.log("Font preferences saved!");
        sendResponse('success');
    }
    if (request.message === 'saveSpacing') {
        console.log("Spacing preferences saved!");
        sendResponse('success');
    }
    if (request.message === 'saveNumber') {
        console.log("Number preferences saved!");
        sendResponse('success');
    }
});


// Listen for changes in the big toggle state
chrome.storage.sync.onChanged.addListener(function(changes, namespace) {
    if (changes.toggleState) {
        const enable = changes.toggleState.newValue;
        // Send message to content script with the new toggle state
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log("in background.js:", enable);
            chrome.tabs.sendMessage(tabs[0].id, {message: enable});
        });
    }
    if (changes.numConvertToggleState) {
        const enable = changes.numConvertToggleState.newValue;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log("in background.js:", enable);
            chrome.tabs.sendMessage(tabs[0].id, {numConvertToggleState: enable});
        });
    }
    if (changes.cloudToggleState) {
        const enable = changes.cloudToggleState.newValue;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log("in background.js:", enable);
            chrome.tabs.sendMessage(tabs[0].id, {cloudToggleState: enable});
        });
    }
});

// Listen for page refresh events
chrome.webNavigation.onCommitted.addListener(function(details) {
    if (details.transitionType === 'reload') {
        chrome.storage.sync.get('toggleState', function(data) {
            const enable = data.toggleState;
            console.log("refreshed:", enable);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                console.log("in background.js:", enable);
                chrome.tabs.sendMessage(tabs[0].id, {message: enable});
            });
        });
    }
});






chrome.storage.sync.onChanged.addListener(function(changes, namespace) {
    // listen for chnages in the line spacing pref
    if (changes.prevLineSpacing) {
        console.log("line spacing changed!");
        const lineSpacing = changes.prevLineSpacing.newValue;
        chrome.storage.sync.get('toggleState', function (data) {
            if (data.toggleState === 'on') {
                // send message to app.js with the new  value
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    console.log("in background.js (line spacing):", lineSpacing);
                    chrome.tabs.sendMessage(tabs[0].id, {lineSpacingValue: lineSpacing});
                });
            }
        });
    }

    // listen for changes in the char spacing pref
    if (changes.prevCharSpacing) {
        console.log("char spacing changed!");
        const charSpacing = changes.prevCharSpacing.newValue;
        chrome.storage.sync.get('toggleState', function (data) {
            if (data.toggleState === 'on') {
                // send message to app.js with the new  value
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    console.log("in background.js (char spacing):", charSpacing);
                    chrome.tabs.sendMessage(tabs[0].id, {charSpacingValue: charSpacing});
                });
            }
        });
    }
});


// listen for request message from app.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getSyncData") {
        console.log("got sync data request...");
        // retrieve data from chrome.storage.sync
        chrome.storage.sync.get(null, function(data) {
            console.log(data);
            // send the retrieved data back to app.js
            sendResponse({ syncData: data });
        });
        return true;
    }
});


// font stuff
chrome.storage.sync.onChanged.addListener(function(changes, namespace) {
    if (changes.prevFontSize) {
        console.log("font size changed!");
        const fontSize = changes.prevFontSize.newValue;
        chrome.storage.sync.get('toggleState', function (data) {
            if (data.toggleState === 'on') {
                // send message to app.js with the new  value
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    console.log("in background.js (font size):", fontSize);
                    chrome.tabs.sendMessage(tabs[0].id, {fontSizeValue: fontSize});
                });
            }
        });
    }
    if (changes.prevFontType) {
        console.log("font type changed!");
        const fontType = changes.prevFontType.newValue;
        chrome.storage.sync.get('toggleState', function (data) {
            if (data.toggleState === 'on') {
                // send message to app.js with the new  value
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    console.log("in background.js (font type):", fontType);
                    chrome.tabs.sendMessage(tabs[0].id, {fontTypeValue: fontType});
                });
            }
        });
    }
});