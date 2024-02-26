// tab things
var fontTab = document.getElementById('fontTab');
fontTab.addEventListener('click', function () {
  openPref('Font', fontTab);
});

var spacingTab = document.getElementById('spacingTab');
spacingTab.addEventListener('click', function () {
  openPref('Spacing', spacingTab);
});

var numbersTab = document.getElementById('numbersTab');
numbersTab.addEventListener('click', function () {
  openPref('Numbers', numbersTab);
});

var profileTab = document.getElementById('profileTab');
profileTab.addEventListener('click', function () {
  openPref('Profile', profileTab);
});

// save button things
var fontSave = document.getElementById('fontSave');
fontSave.addEventListener('click', function () {
  chrome.runtime.sendMessage({ message: 'saveFont' }, function () {});
});

var spacingSave = document.getElementById('spacingSave');
spacingSave.addEventListener('click', function () {
  chrome.runtime.sendMessage({ message: 'saveSpacing' }, function () {});
});

var numberSave = document.getElementById('numberSave');
numberSave.addEventListener('click', function () {
  chrome.runtime.sendMessage({ message: 'saveNumber' }, function () {});
});

// functions
function openPref(prefName, tabButton) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks');
  var tablinksArray = Array.from(tablinks);
  tablinksArray.forEach(function (btn) {
    btn.classList.remove('active');
  });

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(prefName).style.display = 'block';
  tabButton.classList.add('active');
  //document.querySelector('[onclick="openPref(\'' + prefName + '\')"]').classList.add("active");
}

// font dropdown
var fontDropdownItems = document.querySelectorAll('.dropdown-content a');
// loop through each dropdown item and add an event listener
fontDropdownItems.forEach(function (item) {
  item.addEventListener('click', function () {
    // get the selected font from the 'data-font' attribute
    var selectedFont = this.getAttribute('data-font');
    document.getElementById('selectedFont').innerText = selectedFont;
  });
});

//font size
document.addEventListener('DOMContentLoaded', function () {
    const increaseButton = document.getElementById('increase');
    increaseButton.addEventListener('click', function() {
        increaseValue();
    });
    const decreaseButton = document.getElementById('decrease');
    decreaseButton.addEventListener('click', function() {
        decreaseValue();
    });

});

function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
  var value_string = value.toString();
  chrome.storage.sync.set({ prevFontSize: value_string });
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : '';
  value--;
  document.getElementById('number').value = value;
  var value_string = value.toString();
  chrome.storage.sync.set({ prevFontSize: value_string });
}

// log out things
document.querySelector('#sign-out').addEventListener('click', function () {
  chrome.storage.sync.set({ toggleState: 'off' });
  chrome.runtime.sendMessage({ message: 'logout' }, function () {});
});

// Listen for changes to the toggle switches
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');
  const numConvertToggleButton = document.getElementById('numConvertToggleButton');
  const cloudToggleButton = document.getElementById('cloudToggleButton');

  // Retrieve toggle state from chrome.storage.sync
  chrome.storage.sync.get('toggleState', function (data) {
    const toggleState = data.toggleState;
    // Set the toggle state based on chrome.storage.sync
    toggleButton.checked = toggleState === 'on';
  });
  chrome.storage.sync.get('numConvertToggleState', function (data) {
    const numConvertToggleState = data.numConvertToggleState;
    numConvertToggleButton.checked = numConvertToggleState === 'on';
  });
  chrome.storage.sync.get('cloudToggleState', function (data) {
    const cloudToggleState = data.cloudToggleState;
    cloudToggleButton.checked = cloudToggleState === 'on';
  });

  // Listen for change event on toggle switch
  toggleButton.addEventListener('change', function () {
    const enable = toggleButton.checked;
    // Store the toggle state in chrome.storage.sync
    chrome.storage.sync.set({ toggleState: enable ? 'on' : 'off' });
  });
  numConvertToggleButton.addEventListener('change', function () {
    const enable = numConvertToggleButton.checked;
    chrome.storage.sync.set({ numConvertToggleState: enable ? 'on' : 'off' });
  });
  cloudToggleButton.addEventListener('change', function () {
    const enable = cloudToggleButton.checked;
    chrome.storage.sync.set({ cloudToggleState: enable ? 'on' : 'off' });
  });

  // spacing slider
  const lineSpacingSlider = document.getElementById('line-spacing-slider');
  const charSpacingSlider = document.getElementById('character-spacing-slider');

  // retrieve line spacing value from chrome.storage.sync
  chrome.storage.sync.get('prevLineSpacing', function (data) {
    const prevLineSpacing = data.prevLineSpacing;
    // set the line spacing based on chrome.storage.sync
    if (prevLineSpacing !== undefined) {
      lineSpacingSlider.value = prevLineSpacing;
    }
  });

  // retrieve char spacing value from chrome.storage
  chrome.storage.sync.get('prevCharSpacing', function (data) {
    const prevCharSpacing = data.prevCharSpacing;
    // set the char spacing based on chrome.storage
    if (prevCharSpacing !== undefined) {
      charSpacingSlider.value = prevCharSpacing;
    }
  });

  // listen for change event on line spacing slider
  lineSpacingSlider.addEventListener('change', function () {
    // store the line spacing pref in chrome.storage.sync
    chrome.storage.sync.set({ prevLineSpacing: lineSpacingSlider.value });
  });
  // listen for change event on char spacing slider
  charSpacingSlider.addEventListener('change', function () {
    // store the char spacing pref in chrome.storage
    chrome.storage.sync.set({ prevCharSpacing: charSpacingSlider.value });
  });


  // retrieve font size value from chrome.storage
  const fontSize = document.getElementById('number');
  chrome.storage.sync.get('prevFontSize', function (data) {
    const prevFontSize = data.prevFontSize;
    // set the font size based on chrome.storage
    if (prevFontSize !== undefined) {
      fontSize.value = prevFontSize;
    }
  });
});
