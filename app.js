// Get the URL
const site = window.location.hostname;

// alert
alert('Injector - JS has been injected to: ' + site);

// Add custom CSS - function
const Add_Custom_Style = (css) => {
    const styleElement = document.createElement('style');
    // add the data-custom attribute
    styleElement.setAttribute('data-custom', 'true');
    // add the <style> element to the document
    document.head.appendChild(styleElement).innerHTML = css
}

// Remove custom CSS - function
const Remove_Custom_Style = () => {
    console.log("Removing custom styles...");
    const customStyles = document.querySelectorAll('style[data-custom]');
    console.log("found custom styles:", customStyles.length);
    customStyles.forEach(style => {
        console.log("Removing style:", style);
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
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("received by app.js:", message);
    if (message.message === 'on') {
        console.log("turning on color!");
        // this is where we insert custom style
        Add_Custom_Style(`
            @import url("https://fonts.googleapis.com/css?family=Raleway");
            * {
                font-family: "Raleway" !important;
                color: #0000FF !important;
                letter-spacing: 2px;
            }
        `);
    } else if (message.message === 'off') {
        console.log("turning off color!");
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
    }  
});