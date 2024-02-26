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

// Function to blur numbers within a given element
function blurNumbers(element) {
  // Regular expression to match numbers
  var regex = /\b\d+\b/g;
  
  // Replace numbers with spans containing blur class
  element.innerHTML = element.innerHTML.replace(regex, function(match) {
      var digits = match.split('');
      var spannedDigits = digits.map(function (digit) {
          return "<span class='blur'>" + digit + "</span>";
      }); 
      return spannedDigits.join('');
  });
}

// Function to traverse through DOM and blur numbers
function blurNumbersOnPage() {
  console.log(" ");
  console.log("blurNumbersOnPage was called...");

  const styleBlur = document.createElement('style');
  // add the data-custom attribute
  styleBlur.setAttribute('data-custom', 'true');
  const blurCSS = `
          .blur {
            filter: blur(5px);
            cursor: pointer;
          }
          .blur:hover {
            filter: none;
          }
      `;
  // add the <style> element to the document
  document.head.appendChild(styleBlur).innerHTML = blurCSS;

  // Get all elements within the content area
  var elements = document.querySelectorAll('*'); // You might need to adjust the selector
  // Loop through each element
  elements.forEach(function(element) {
      blurNumbers(element);
  });
}

document.querySelectorAll('.blur').forEach((elem) => {
  elem.addEventListener('mouseover', function () {
    this.classList.add('hover');
  });
  elem.addEventListener('mouseout', function () {
    this.classList.remove('hover');
  });
});


// listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('received by app.js:', message);
  if (message.message === 'on') {
    // number blur thing
    // Call the function when the page loads
    blurNumbersOnPage();


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
        if (Data.prevFontSize) {
          size = Data.prevFontSize;
        }
        if (Data.prevFontType) {
          font = Data.prevFontType;
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
                if (Data.prevFontSize) {
                    size = Data.prevFontSize;
                }
                if (Data.prevFontType) {
                    font = Data.prevFontType;
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
              if (Data.prevFontSize) {
                size = Data.prevFontSize;
              }
              if (Data.prevFontType) {
                font = Data.prevFontType;
              }
              // insert custom style
              Add_Custom_Style(font, size, lineSpace, charSpace);
          } else {
              console.log("Failed to retrieve data from chrome.storage.sync (char spacing)");
          }
      });
    }
    if (message.fontSizeValue !== undefined) {
        console.log("received font size value:", message.fontSizeValue);
        // send a message to background.js to request data
        chrome.runtime.sendMessage({ action: "getSyncData" }, function(response) {
            if (response && response.syncData) {
                console.log("Retrieved data from chrome.storage.sync because font size changed:", response.syncData);
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
                if (Data.prevFontSize) {
                    size = Data.prevFontSize;
                }
                if (Data.prevFontType) {
                  font = Data.prevFontType;
                }
                // insert custom style
                Add_Custom_Style(font, size, lineSpace, charSpace);
            } else {
                console.log("Failed to retrieve data from chrome.storage sync (font size)");
            }
        });
    }
    if (message.fontTypeValue !== undefined) {
      console.log("received font type value:", message.fontTypeValue);
      // send a message to background.js to request data
      chrome.runtime.sendMessage({ action: "getSyncData" }, function(response) {
          if (response && response.syncData) {
              console.log("Retrieved data from chrome.storage.sync because font type changed:", response.syncData);
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
              if (Data.prevFontSize) {
                  size = Data.prevFontSize;
              }
              if (Data.prevFontType) {
                  font = Data.prevFontType;
              }
              // insert custom style
              Add_Custom_Style(font, size, lineSpace, charSpace);
          } else {
              console.log("Failed to retrieve data from chrome.storage sync (font size)");
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



