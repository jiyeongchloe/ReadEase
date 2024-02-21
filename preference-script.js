var fontTab = document.getElementById('fontTab');
fontTab.addEventListener('click', function() {
    openPref('Font', fontTab);
});

var spacingTab = document.getElementById('spacingTab');
spacingTab.addEventListener('click', function() {
    openPref('Spacing', spacingTab);
});

var numbersTab = document.getElementById('numbersTab');
numbersTab.addEventListener('click', function() {
    openPref('Numbers', numbersTab);
});

function openPref(prefName, tabButton) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    var tablinksArray = Array.from(tablinks);
    tablinksArray.forEach(function(btn) {
        btn.classList.remove("active");
    });
    //for (i = 0; i < tablinks.length; i++) {
      //tablinks[i].classList.remove("active");
    //}
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(prefName).style.display = "block";
    tabButton.classList.add("active");
    //document.querySelector('[onclick="openPref(\'' + prefName + '\')"]').classList.add("active");
  }


// Listen for changes to the toggle switch
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');

    // Retrieve toggle state from chrome.storage.sync
    chrome.storage.sync.get('toggleState', function(data) {
        const toggleState = data.toggleState;
        // Set the toggle state based on chrome.storage.sync
        toggleButton.checked = toggleState === 'on';
    });

    // Listen for change event on toggle switch
    toggleButton.addEventListener('change', function() {
        const enable = toggleButton.checked;
        // Store the toggle state in chrome.storage.sync
        chrome.storage.sync.set({ 'toggleState': enable ? 'on' : 'off' });
    });
});
