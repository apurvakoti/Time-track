// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

var startTime;

var url = "https://piazza.com/class/j5ikrl702j637r"

var timeElapsed = 0;
var endTime;

var tabWithUrlId = 0;
var fromTab;
var toTab;

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });


//set time elapsed in local storage
function setElapsed() {
    var time = endTime - startTime;
    timeElapsed += time;
    //var oldTime = chrome.storage.local.get("totalTime", function(items) {
    //    return items.totalTime;
    //});
    chrome.storage.local.set({"totalTime": timeElapsed}, function() {
    });
    console.log(timeElapsed);
}

function setStart() {
    startTime = Date.now();
}

function setEnd() {
    endTime = Date.now();
}

function HandleUrlSet(tabId, changeInfo, tab) {
        var newUrl = changeInfo.url;
        if (newUrl.includes(url)) {
            setStart();
            tabWithUrlId = tabId;
            fromTab = tabId;
            chrome.tabs.onActivated.addListener(HandleTabSwitch);
            //chrome.tabs.onRemoved.addListener(HandleTabRemoved);
        }
        else if (!newUrl.includes(url) && fromTab === tabWithUrlId) {
            tabWithUrlId = 0;
            setEnd();
            setElapsed();

        }
}

//function HandleTabRemoved(tabId, removeInfo) {
//    if (tabId === tabWithUrlId) {
//        setEnd();
//        setElapsed();
//    }
//}

function HandleTabSwitch(activeInfo) {
    toTab = activeInfo.tabId;
    if (toTab !== tabWithUrlId) {
        if (fromTab === tabWithUrlId) {
            setEnd();
            setElapsed();
        }
        else {

        }
    }

    else {
        if (fromTab !== tabWithUrlId) {
            setStart();
        }
    }

    fromTab = activeInfo.tabId;
}

function blankFunction() {

}

//handle idle state
function HandleIdleChange(newState) {
    chrome.idle.setDetectionInterval(7);
    switch(newState) {
        case chrome.idle.IdleState.active:
            if (currentTabId === tabWithUrlId) {
                setStart();
            }
            break;
        case chrome.idle.IdleState.idle:
            setEnd();
            setElapsed();
            break;
        case chrome.idle.IdleState.locked:
            setEnd();
            setElapsed();
            break;
        default:
            break;

    }
}

function reset() {
    timeElapsed = 0;
}


chrome.tabs.onUpdated.addListener(HandleUrlSet);
