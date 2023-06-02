
let localData = {
    static: {},
    performance: {},
    activity: {event:[]},
};


function collectStatic() {
    console.log(localData.static.id);
    localData.static.userAgent = navigator.userAgent;
    localData.static.userLanguage = navigator.language;
    localData.static.cookiesEnabled = navigator.cookieEnabled;
    localData.static.javaScriptEnabled = true;
    function checkImageSupport(callback) {
        var img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }
    checkImageSupport(function(isSupported) {
        localData.static.imagesEnabled = isSupported;
    });

    var testElement = document.createElement('div');
    // Apply some CSS to it
    testElement.style.display = 'none';

    // Add to body
    document.body.appendChild(testElement);

    // Check if CSS is enabled
    localData.static.cssEnabled  = (testElement.offsetHeight === 0);

    // Clean up
    document.body.removeChild(testElement);

    localData.static.screenDimensions = {
        width: screen.width,
        height: screen.height
    };
    localData.static.windowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    localData.static.networkConnection = navigator.connection.effectiveType;
}

function collectPerormance() {
    setTimeout(function() {
        const timing = window.performance.timing;
        console.log(timing);
        localData.performance.timing = window.performance.timing;

    // When the page started loading
        localData.performance.startLoading = timing.navigationStart;

    // When the page ended loading
        localData.performance.endLoading = timing.loadEventEnd;

    // The total load time
        localData.performance.loadTime = localData.performance.endLoading - localData.performance.startLoading;
    },0);
}

function collectActivity() {
    window.addEventListener('error', (error) => {
        localData.activity.event.push({
            eventType: 'error',
            message: error.message,
            time: Date.now(),
        });

    });

    window.addEventListener('mousemove', (event) => {
        localData.activity.event.push({
            eventType: 'mousemove',
            x: event.clientX,
            y: event.clientY,
            time: Date.now(),
        });

    });

    window.addEventListener('mousedown', (event) => {
        localData.activity.event.push({
            eventType: 'mousedown',
            button: event.button,
            x: event.clientX,
            y: event.clientY,
            time: Date.now(),
        });

    });

    window.addEventListener('keydown', (event) => {
        localData.activity.event.push({
            eventType: 'keydown',
            key: event.key,
            time: Date.now(),
        });

    });

    window.addEventListener('scroll', () => {
        localData.activity.event.push({
            eventType: 'scroll',
            x: window.scrollX,
            y: window.scrollY,
            time: Date.now(),
        });

    });
}

function sendStaticData(){
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const StaticRequestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(localData.static)
    };

    fetch("https://greyluo.online/api/static", StaticRequestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));


}
function sendPerformanceData(){
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const PerformanceRequestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(localData.performance)
    };
    fetch("https://greyluo.online/api/performance", PerformanceRequestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));

}
let count = 0;
let activityId;
function sendActivityData() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const ActivityRequestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(localData.activity)
    };

    if (count === 0) {
        fetch("https://greyluo.online/api/activity", ActivityRequestOptions)
        .then(response => response.json())
        .then(data => {
            // save the ID for later
            activityId = data.id;
            console.log(data)
            count += 1;
        })
        .catch(error => console.log('error', error));
    } else {
        // append the ID to the URL
        const url = "https://greyluo.online/api/activity/" + activityId;

        ActivityRequestOptions.method = 'PUT';
        ActivityRequestOptions.body = JSON.stringify(localData.activity);
        fetch(url, ActivityRequestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));
    }

}

window.addEventListener('load', () => {
    localData.activity.event.push({
        eventType: 'pageEnter',
        time: Date.now(),

    })
    localData.activity.currentPage = window.location.href;
    collectStatic();
    collectPerormance();
    collectActivity();
    setTimeout(function() {
        sendStaticData();
        sendPerformanceData();
        setInterval(sendActivityData, 5000);
    },1);
});

window.addEventListener('beforeunload', () => {
    localData.activity.event.push({
        eventType: 'pageLeave',
        time: Date.now(),

    })
    sendActivityData();
});
