
let localData = {
    staic: {},
    performance: {},
    activity: {event:[]},
};


function collectStaic() {
    localData.staic.userAgent = navigator.userAgent;
    localData.staic.userLanguage = navigator.language;
    localData.staic.cookiesEnabled = navigator.cookieEnabled;
    localData.staic.javaScriptEnabled = true;
    localData.staic.imagesEnabled = document.images.length > 0;
    /* localData.staic.cssEnabled = document.getElementById('cssCheck').offsetWidth; */
    localData.staic.screenDimensions = {
        width: screen.width,
        height: screen.height
    };
    localData.staic.windowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    localData.staic.networkConnection = navigator.connection.effectiveType;
}

function collectPerormance() {
    const performanceTiming = performance.getEntriesByType('navigation')[0];
    if (performanceTiming) {
        localData.performance.pageLoadStart = performanceTiming.startTime;
        localData.performance.pageLoadEnd = performanceTiming.responseEnd;
        localData.performance.totalLoadTime = performanceTiming.responseEnd - performanceTiming.startTime;
    }
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
        body: JSON.stringify(localData.staic)
    };
    const PerformanceRequestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(localData.performance)
    };

    fetch("https://greyluo.online/api/static", StaticRequestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));
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
    collectStaic();
    collectPerormance();
    collectActivity();
    sendStaticData();
    setInterval(sendActivityData, 5000);
});

window.addEventListener('beforeunload', () => {
    sendActivityData();
});
