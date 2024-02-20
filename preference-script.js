// tab things
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

// save button things
var fontSave = document.getElementById('fontSave');
fontSave.addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'saveFont' }, function (response) {
        if (response === 'success') window.close();
    });
});

var spacingSave = document.getElementById('spacingSave');
spacingSave.addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'saveSpacing' }, function (response) {
        if (response === 'success') window.close();
    });
});

var numberSave = document.getElementById('numberSave');
numberSave.addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'saveNumber' }, function (response) {
        if (response === 'success') window.close();
    });
});


// functions
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
