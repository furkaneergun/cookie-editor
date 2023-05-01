function changeWindow(message) {
    document.querySelector('html').innerHTML = message.content;
    for(let script of message.contentScripts) {
        var scriptChild = document.createElement('script');
        scriptChild.innerHTML = script.trim();
        document.body.appendChild(scriptChild);
    }
}


browser.runtime.onMessage.addListener(receiveMessage);

function receiveMessage(message) {
    switch (message.type) {
        case "contentDelivery":
            changeWindow(message);
    }
}

function requestContent() {
    browser.runtime.sendMessage({
        type: "contentRequest"
    });
}



requestContent();


document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

