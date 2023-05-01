/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Script that makes up the extension's background page.
*/
// Send a message to the native app extension from the background page.


let content = null;
let scripts = null;

//MARK: -Messaging between safari extension and ios app extension
browser.runtime.sendNativeMessage("application.id", {message: "Hello from background page"}, function(response) {
    if (response.content){
        setContent(response);
        deliverContent();
    }
});



//MARK: -Runtime Notify
function deliverContent() {
    browser.runtime.sendMessage({
        content: content,
        contentScripts: scripts,
        type: "contentDelivery"
    });
}

function setContent(message) {
    content = message.content;
    scripts = message.contentScripts;
}

browser.runtime.onMessage.addListener(receiveMessage);

function receiveMessage(message) {
    switch (message.type) {
        case "contentDelivery":
            console.log("Content Delivery Message Received");
            setContent(message);
            break;
        case "contentRequest":
            console.log("Content is Sent");
            deliverContent();
            break;
    }
}



// MARK: -Messaging between safari extension and safari background app
let port = browser.runtime.connectNative("application.id");
port.postMessage("Hello from JavaScript Port");
port.onMessage.addListener(function(message) {
    console.log("Received native port message:");
});
port.onDisconnect.addListener(function(disconnectedPort) {
    console.log("Received native port disconnect:");
    console.log(disconnectedPort);
});
