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
});


// Listen for changes in the toggle state
chrome.storage.sync.onChanged.addListener(function(changes, namespace) {
    if (changes.toggleState) {
        const enable = changes.toggleState.newValue;
        // Send message to content script with the new toggle state
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log("in background.js:", enable);
            chrome.tabs.sendMessage(tabs[0].id, {message: enable});
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
