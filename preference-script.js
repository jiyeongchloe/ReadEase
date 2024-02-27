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
    chrome.storage.sync.set({ prevFontType: selectedFont });
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
  const cloudToggleButton = document.getElementById('cloudToggleButton');

  // Retrieve toggle state from chrome.storage.sync
  chrome.storage.sync.get('toggleState', function (data) {
    const toggleState = data.toggleState;
    // Set the toggle state based on chrome.storage.sync
    toggleButton.checked = toggleState === 'on';
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

  // retrieve font type value from chrome.storage
  const fontType = document.getElementById('selectedFont');
  chrome.storage.sync.get('prevFontType', function (data) {
    const prevFontType = data.prevFontType;
    // set the font type based on chrome storage
    if (prevFontType !== undefined) {
        fontType.innerText = prevFontType;
    }
  });
});

// spacing save button things
function saveToPreset(newData, preset_name) {
  chrome.storage.sync.get('presets', function (data) {
    var name = preset_name;
    var presets = data.presets;
       // sending to background.js for debugging
       chrome.runtime.sendMessage({ debugging: presets[name] }, function () {
       });
       chrome.runtime.sendMessage({ debug: newData }, function () {});
       chrome.runtime.sendMessage({ name: name }, function() {});
       if (newData.prevCharSpacing) {
           presets[name].prevCharSpacing = newData.prevCharSpacing;
       }
       if (newData.prevLineSpacing) {
           presets[name].prevLineSpacing = newData.prevLineSpacing;
       }
       if (newData.numConvertToggleState) {
         presets[name].numConvertToggleState = newData.numConvertToggleState;
       }
       if (newData.cloudToggleState) {
           presets[name].cloudToggleState = newData.cloudToggleState;
       }
       chrome.storage.sync.set({'presets': presets}, function() {
       });
       alert("preset updated!");
   });
}

document.getElementById('space-save-button').addEventListener('click', function() {
    document.getElementById('save-dropdown').style.display = 'block';
});

// close dropdown when clicking outside
window.addEventListener('click', function (event) {
  if (!event.target.matches('.save-button')) {
    var dropdowns = this.document.getElementsByClassName('save-dropdown-content');
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === 'block') {
        openDropdown.style.display = 'none';
      }
    }
  }
});
// populate dropdown with preset options
var save_dropdown = document.getElementById('save-dropdown');
chrome.storage.sync.get('presets', function (data) {
  const presets = data.presets;
  for (var preset_name in presets) {
    (function (preset_name) {
      var option = document.createElement('a');
      option.href = '#';
      option.textContent = preset_name;
      option.onclick = function () {
        chrome.storage.sync.get(['prevLineSpacing', 'prevCharSpacing'], function (data) {
          saveToPreset(data, preset_name);
        });
      };
      save_dropdown.appendChild(option);
    })(preset_name);
  }
});
const createPresetLink = document.createElement('a');
createPresetLink.textContent = 'Create a new preset';
createPresetLink.addEventListener('click', createNewPreset);
save_dropdown.appendChild(createPresetLink);

function createNewPreset() {
  var presetName = prompt('Enter the name for the new preset:');
  if (presetName !== null && presetName.trim() !== '') {
    chrome.storage.sync.get(['prevLineSpacing', 'prevCharSpacing'], function (data) {
      savePresetToStorage(presetName, data);
    });
  } else {
    alert('Preset name cannot be empty!');
  }
}

function savePresetToStorage(presetName, data) {
    chrome.storage.sync.get('presets', function(result) {
        var presets = result.presets || {};
        presets[presetName] = data;
        chrome.storage.sync.set({ 'presets': presets}, function() {
            alert("preset created and updated!");
            location.reload;
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
  function fetchAndDisplayPresets() {
    chrome.storage.sync.get('presets', function (data) {
      var presets = data.presets;
      var presetNameList = Object.keys(presets);
      var displayArea = document.getElementById('presetDisplay');
      displayArea.innerHTML = ''; // Clear previous content

      // Check and display each preset
      presetNameList.forEach(function (presetName) {
        if (presets[presetName]) {
          var presetData = presets[presetName];
          var presetDiv = document.createElement('div'); // Create a new div for each preset
          var content =
            `<strong>Preset Name:</strong> ${presetName}<br>` +
            `<strong>Font Type:</strong> ${presetData.prevFontType}<br>` +
            `<strong>Font Size:</strong> ${presetData.prevFontSize}<br>` +
            `<strong>Character Spacing:</strong> ${presetData.prevCharSpacing}<br>` +
            `<strong>Line Spacing:</strong> ${presetData.prevLineSpacing}<br>` +
            `<strong>Cloud Over Number:</strong> ${presetData.cloudToggleState}<br>`;
          presetDiv.innerHTML = content;

          var deleteButton = document.createElement('button'); // Create a delete button
          deleteButton.textContent = 'Delete';
          deleteButton.onclick = function () {
            delete presets[presetName]; // Remove the preset from the object
            chrome.storage.sync.set({ presets: presets }, function () {
              // Update chrome.storage.sync
              fetchAndDisplayPresets(); // Refresh the display
            });
          };

          var applyButton = document.createElement('button'); // Create an apply button
          applyButton.textContent = 'Apply';
          applyButton.onclick = function () {
            // Implement the logic to apply the preset settings
            console.log('Applying preset:', presetName);
            // You might want to call a function here that applies the preset's settings
          };

          // Style the apply button similarly to how you style the delete button
          applyButton.className = 'apply-button'; // Assuming you have defined .apply-button styles in your CSS
          deleteButton.className = 'delete-button';

          presetDiv.appendChild(deleteButton); // Add the delete button to the div
          presetDiv.appendChild(applyButton); // Add the apply button to the div
          displayArea.appendChild(presetDiv); // Add the div to the display area
        }
      });

      if (presetNameList.length === 0) {
        displayArea.innerHTML = 'No presets found.'; // Display message if no presets
      }
    });
  }

  fetchAndDisplayPresets(); // Call the function to fetch and display presets
});


// num save button things
document.getElementById('num-save-button').addEventListener('click', function() {
  document.getElementById('num-save-dropdown').style.display = 'block';
});
// close dropdown when clicking outside
window.addEventListener('click', function(event) {
  if (!event.target.matches('.save-button')) {
      var dropdowns = this.document.getElementsByClassName('save-dropdown-content');
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.style.display === 'block') {
              openDropdown.style.display = 'none';
          }
      }
  }
});
// populate dropdown with preset options
populateNumSave();
function populateNumSave() {
  var save_dropdown = document.getElementById('num-save-dropdown');
  chrome.storage.sync.get('presets', function(data) {
    const presets = data.presets;
    for (var preset_name in presets) {
        (function(preset_name) {
            var option = document.createElement('a');
            option.href = '#';
            option.textContent = preset_name;
            option.onclick = function() {
                chrome.storage.sync.get(['cloudToggleState'], function(data) {
                    saveToPreset(data, preset_name);
                });
            };
            save_dropdown.appendChild(option);
        })(preset_name);        
    }
  });
  const createPresetLink = document.createElement('a');
  createPresetLink.textContent ='Create a new preset';
  createPresetLink.addEventListener('click', createNewNumPreset);
  save_dropdown.appendChild(createPresetLink);  
}

function createNewNumPreset() {
  var presetName = prompt("Enter the name for the new preset:");
  if (presetName !== null && presetName.trim() !== "") {
      chrome.storage.sync.get(['cloudToggleState'], function(data) {
          savePresetToStorage(presetName, data);
      });
  } else {
      alert("Preset name cannot be empty!");
  }
}


// text save button things
document.getElementById('text-save-button').addEventListener('click', function() {
  document.getElementById('text-save-dropdown').style.display = 'block';
});
// close dropdown when clicking outside
window.addEventListener('click', function(event) {
  if (!event.target.matches('.save-button')) {
      var dropdowns = this.document.getElementsByClassName('save-dropdown-content');
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.style.display === 'block') {
              openDropdown.style.display = 'none';
          }
      }
  }
});
// populate dropdown with preset options
populateTextSave();
function populateTextSave() {
  var save_dropdown = document.getElementById('text-save-dropdown');
  chrome.storage.sync.get('presets', function(data) {
    const presets = data.presets;
    for (var preset_name in presets) {
        (function(preset_name) {
            var option = document.createElement('a');
            option.href = '#';
            option.textContent = preset_name;
            option.onclick = function() {
                chrome.storage.sync.get(['prevFontSize', 'prevFontType'], function(data) {
                    saveToPreset(data, preset_name);
                });
            };
            save_dropdown.appendChild(option);
        })(preset_name);        
    }
  });
  const createPresetLink = document.createElement('a');
  createPresetLink.textContent ='Create a new preset';
  createPresetLink.addEventListener('click', createNewTextPreset);
  save_dropdown.appendChild(createPresetLink);  
}

function createNewTextPreset() {
  var presetName = prompt("Enter the name for the new preset:");
  if (presetName !== null && presetName.trim() !== "") {
      chrome.storage.sync.get(['prevFontSize', 'prevFontType'], function(data) {
          savePresetToStorage(presetName, data);
      });
  } else {
      alert("Preset name cannot be empty!");
  }
}

