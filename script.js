let timezoneArr;
let selTime;


let interval = 0;

let currentWatchesElements = [];
currentWatchesElements.push({
    hour_el: "clock_hour",
    min_el: "clock_min",
    sec_el: "clock_sec"
});

let noConnection = document.getElementById("no_connect");
let drawWindow = document.getElementById("draw_window");
let add_watch_btn = document.getElementById("add_watch");

let plus_text = document.getElementById("plus_text");
let plus_icon = document.getElementById("plus_icon");
let select_timezone_text = document.getElementById("select_timezone_text");
select_timezone_text.style.visibility = "hidden";

let currentWatchesTime = [];
let cur_secs = new Date().getSeconds();
let cur_mins = new Date().getMinutes();
let cur_hours = new Date().getHours();
currentWatchesTime.push({ hour: cur_hours, min: cur_mins, sec: cur_secs });

let watches_count = 1;

getTimeZones();
setArrowsStartPosition();
startLoop();

function setArrowsStartPosition() {
    let i = watches_count - 1;

    console.log(currentWatchesElements);
    console.log(currentWatchesTime);

    let s_el = document.getElementById(currentWatchesElements[i].sec_el);
    let m_el = document.getElementById(currentWatchesElements[i].min_el);
    let h_el = document.getElementById(currentWatchesElements[i].hour_el);

    s_el.style.transform = "rotate(" + currentWatchesTime[i].sec * 6 + "deg";
    s_el.style.transition = "transform 0.1s";

    m_el.style.transform = "rotate(" + currentWatchesTime[i].min * 6 + "deg";
    m_el.style.transition = "transform 0.5s";


    console.log(getTwelveHourFormat(currentWatchesTime[i].hour));

    if (currentWatchesTime[i].hour > 12) {
        h_el.style.transform = "rotate(" + getTwelveHourFormat(currentWatchesTime[i].hour) * 30 + "deg";
    } else {
        h_el.style.transform = "rotate(" + currentWatchesTime[i].hour * 30 + "deg";
    }
    h_el.style.transition = "transform 1s";

}

function startLoop() {
    if (interval > 0) clearInterval(interval);
    interval = setInterval("nextArrowsPosition()", 1000);
}

function getTwelveHourFormat(number) {
    switch (number) {
        case 13:
            return 1;
        case 14:
            return 2;
        case 15:
            return 3;
        case 16:
            return 4;
        case 17:
            return 5;
        case 18:
            return 6;
        case 19:
            return 7;
        case 20:
            return 8;
        case 21:
            return 9;
        case 22:
            return 10;
        case 23:
            return 11;
        case 24:
            return 12;
    }
}

function nextArrowsPosition() {

    for (var i = 0; i <= currentWatchesTime.length - 1; i++) {

        let seconds_element = document.getElementById(currentWatchesElements[i].sec_el);
        let minutes_element = document.getElementById(currentWatchesElements[i].min_el);
        let hours_element = document.getElementById(currentWatchesElements[i].hour_el);

        if (currentWatchesTime[i].sec != 0) {
            seconds_element.style.transform = "rotate(" + currentWatchesTime[i].sec * 6 + "deg";
        } else {
            seconds_element.style.transform = "rotate(" + 1 * 6 + "deg";
        }

        minutes_element.style.transform = "rotate(" + currentWatchesTime[i].min * 6 + "deg";

        seconds_element.style.transition = "transform 0.005s";
        minutes_element.style.transition = "transform 0.01s";

        if (currentWatchesTime[i].hour > 12) {
            hours_element.style.transform = "rotate(" + getTwelveHourFormat(currentWatchesTime[i].hour) * 30 + "deg";
        } else {
            hours_element.style.transform = "rotate(" + currentWatchesTime[i].hour * 30 + "deg";
        }
        hours_element.style.transition = "transform 0.01s";



        if (currentWatchesTime[i].sec == 60) {
            currentWatchesTime[i].sec = 0;
            currentWatchesTime[i].min += 1;
        }

        if (currentWatchesTime[i].hour == 60) {
            currentWatchesTime[i].min = 0;
            currentWatchesTime[i].hour += 1;
        }

        currentWatchesTime[i].sec += 1;
    }

}

function addWatch() {
    watches_count++;
    let drawWindowWidth = drawWindow.offsetWidth;
    draw_window.style.width = drawWindowWidth + 250 + "px";
    draw_window.style.margin = "-150px 0 0 -" + drawWindow.offsetWidth / 2 + "px";

    let clockDiv = document.createElement('div');
    clockDiv.className = 'new_Clock';
    clockDiv.style.float = 'right';
    clockDiv.style.position = 'relative';
    clockDiv.addClass = "noselect";

    let clockHourImg = document.createElement('img');
    clockHourImg.className = 'clock';
    clockHourImg.id = 'clock_hour' + watches_count;
    clockHourImg.src = "images/clock_hour.png";

    let clockMinImg = document.createElement('img');
    clockMinImg.className = 'clock';
    clockMinImg.id = 'clock_min' + watches_count;
    clockMinImg.src = "images/clock_min.png";

    let clockSecImg = document.createElement('img');
    clockSecImg.className = 'clock';
    clockSecImg.id = 'clock_sec' + watches_count;
    clockSecImg.src = "images/clock_sec.png";

    let form = document.createElement('select');
    form.className = "timezone_form";
    form.style.width = "150px";

    let options = '';
    options += '<option value="Not selected">Not selected</option>';
    for (i = 0; i < timezoneArr.length; i++) {
        options += '<option value=' + timezoneArr[i] + '>' + timezoneArr[i] + '</option>';
    }

    form.innerHTML = options;
    form.setAttribute("onchange", "getSelectedTime(this.value)");

    currentWatchesElements.push({
        hour_el: clockHourImg.id + "",
        min_el: clockMinImg.id + "",
        sec_el: clockSecImg.id + ""
    })

    console.log(currentWatchesElements);

    clockDiv.appendChild(clockHourImg);
    clockDiv.appendChild(clockMinImg);
    clockDiv.appendChild(clockSecImg);
    clockDiv.appendChild(form);

    drawWindow.appendChild(clockDiv);

    plus_text.style.visibility = "hidden";
    plus_icon.style.visibility = "hidden";
    select_timezone_text.style.visibility = "visible";

    if (watches_count == 3) {
        add_watch_btn.style.display = "none";
    }
}

function addSelTimeToCurretWatches(time) {
    let h = time.substr(11, 2);
    let m = time.substr(14, 2);
    let s = time.substr(17, 2);
    currentWatchesTime.push({ hour: parseInt(h, 10), min: parseInt(m, 10), sec: parseInt(s, 10) })
    setArrowsStartPosition();

    plus_text.style.visibility = "visible";
    plus_icon.style.visibility = "visible";
    select_timezone_text.style.visibility = "hidden";
}

function getSelectedTime(selZone) {
    let xmlhttp = new XMLHttpRequest();
    let url = "https://worldtimeapi.org/api/timezone/" + selZone;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            noConnection.style.visibility = "hidden";
            let obj = JSON.parse(this.responseText);
            addSelTimeToCurretWatches(obj.datetime);
        } else {
            noConnection.style.visibility = "visible";
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getTimeZones() {
    let xmlhttp = new XMLHttpRequest();
    let url = "https://worldtimeapi.org/api/timezone";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            noConnection.style.visibility = "hidden";
            let arr = JSON.parse(this.responseText);
            setTimezones(arr);
        } else {
            noConnection.style.visibility = "visible";
            console.log("ConnectionError")
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function setTime(time) {
    selTime = time;
}

function setTimezones(zones) {
    timezoneArr = zones;
}