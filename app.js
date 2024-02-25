// Get the URL
const site = window.location.hostname;

// Add custom CSS - function
const Add_Custom_Style = (font, size, lineSpace, charSpace) => {
  // default values for font, size, line spacing, and character spacing
  const defaultOptions = {
    fontFamily: 'Arial, sans-serif',
    fontSize: 16,
    lineSpacing: 1.5,
    characterSpacing: 2,
  };

  const options = {
    fontFamily: font !== 'default' ? font : defaultOptions.fontFamily,
    fontSize: size !== 'default' ? parseInt(size) : defaultOptions.fontSize,
    lineSpacing: lineSpace !== 'default' ? parseFloat(lineSpace) : defaultOptions.lineSpacing,
    characterSpacing:
      charSpace !== 'default' ? parseFloat(charSpace) : defaultOptions.characterSpacing,
  };

  const css = `
        body {
            font-family: ${options.fontFamily}, sans-serif;
            font-size: ${options.fontSize}px;
            line-height: ${options.lineSpacing};
            letter-spacing: ${options.characterSpacing}px;
        }
    `;

  const styleElement = document.createElement('style');
  // add the data-custom attribute
  styleElement.setAttribute('data-custom', 'true');
  // add the <style> element to the document
  document.head.appendChild(styleElement).innerHTML = css;
};

// Remove custom CSS - function
const Remove_Custom_Style = () => {
  console.log('Removing custom styles...');
  const customStyles = document.querySelectorAll('style[data-custom]');
  console.log('found custom styles:', customStyles.length);
  customStyles.forEach((style) => {
    console.log('Removing style:', style);
    style.remove();
  });
};

// Create Custom Element - Function
function Create_Custom_Element(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag);
  custom_element.setAttribute(attr_tag, attr_name);
  custom_element.innerHTML = value;
  document.body.append(custom_element);
}

// listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('received by app.js:', message);
  if (message.message === 'on') {
    console.log('turning on color!');
    // this is where we insert custom style
    // send a message to background.js to request data from chrome.storage.sync
    chrome.runtime.sendMessage({ action: 'getSyncData' }, function (response) {
      if (response && response.syncData) {
        console.log('Retrieved data from chrome.storage.sync:', response.syncData);
        const Data = response.syncData;
        let font = 'default';
        let size = 'default';
        let lineSpace = 'default';
        let charSpace = 'default';
        if (Data.prevLineSpacing) {
          lineSpace = Data.prevLineSpacing;
        }
        if (Data.prevCharSpacing) {
          charSpace = Data.prevCharSpacing;
        }
        // insert custom style
        Add_Custom_Style(font, size, lineSpace, charSpace);
      } else {
        console.log('Failed to retrieve data from chrome.storage.sync');
      }
    });
  } else if (message.message === 'off') {
    console.log('turning off color!');
    Remove_Custom_Style();
  }
});

// I think what we should do is:
// 1. scrape off the user's preference
// 2. put the user's preference into Add_Custom_Style
// 3. need to import url for all the different language
// 4. need to figure out how to let any website work

// listen for messages form the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.lineSpacingValue !== undefined) {
        console.log("received line spacing value:", message.lineSpacingValue);
        // send a message to background.js to request data from chrome.storage.sync
        chrome.runtime.sendMessage({ action: "getSyncData" }, function(response) {
            if (response && response.syncData) {
                console.log("Retrieved data from chrome.storage.sync because line spacing changed:", response.syncData);
                const Data = response.syncData;
                let font = "default";
                let size = "default";
                let lineSpace = "default";
                let charSpace = "default";
                if (Data.prevLineSpacing) {
                    lineSpace = Data.prevLineSpacing;
                }
                if (Data.prevCharSpacing) {
                    charSpace = Data.prevCharSpacing;
                }
                // insert custom style
                Add_Custom_Style(font, size, lineSpace, charSpace);
            } else {
                console.log("Failed to retrieve data from chrome.storage.sync (line spacing)");
            }
        });
    }  
    if (message.charSpacingValue !== undefined) {
        console.log("received char spacing value:", message.charSpacingValue);
        // send a message to background.js to request data from chrome.storage.sync
        chrome.runtime.sendMessage({ action: "getSyncData" }, function(response) {
          if (response && response.syncData) {
              console.log("Retrieved data from chrome.storage.sync because char spacing changed:", response.syncData);
              const Data = response.syncData;
              let font = "default";
              let size = "default";
              let lineSpace = "default";
              let charSpace = "default";
              if (Data.prevLineSpacing) {
                  lineSpace = Data.prevLineSpacing;
              }
              if (Data.prevCharSpacing) {
                  charSpace = Data.prevCharSpacing;
              }
              // insert custom style
              Add_Custom_Style(font, size, lineSpace, charSpace);
          } else {
              console.log("Failed to retrieve data from chrome.storage.sync (char spacing)");
          }
      });
    }
    if (message.numConvertToggleState !== undefined) {
        console.log("received num convert toggle state:", message.numConvertToggleState);
    }
    if (message.cloudToggleState !== undefined) {
        console.log("received cloud toggle state:", message.cloudToggleState);
    }
});
