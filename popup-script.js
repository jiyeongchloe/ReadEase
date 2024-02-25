document.querySelector('#sign-in').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login' }, function (response) {
        if (response === 'success') {
            alert("here");
            window.location.href = 'preferences-popup.html';
        }
    });
});

