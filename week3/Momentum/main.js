showDate();

showTimeFirst();

var token = setInterval(showTime, 1000);

function showTimeFirst() {
    const splittedDate = new Date().toString().split(" ");

    const hms = splittedDate[4].split(":");     // hours minutes seconds

    const time = document.getElementById("time");

    time.innerHTML = hms[0] + " : " + hms[1];

    console.log(hms[0] + ":" + hms[1]);
}

function showTime() {
    const splittedDate = new Date().toString().split(" ");

    const hms = splittedDate[4].split(":");     // hours minutes seconds
    
    if (hms[2] == '00') {
        const time = document.getElementById("time");

        time.innerHTML = hms[0] + " : " + hms[1];

        console.log(hms[0] + ":" + hms[1]);

    }
}

function showDate() {
    const date = document.getElementById("date");

    const splittedDate = new Date().toString().split(" ");

    date.innerHTML = splittedDate[2] + " " + splittedDate[1].toUpperCase() + " " + splittedDate[3];
}

function setCookie(name, value, duration) {
    let date = new Date();

    date.setTime(date.getTime() + duration * 24 * 60 * 60 * 1000);      // in milliseconds

    const key = name + '=' + value + ';';
    const expires = 'expires=' + date.toGMTString() + ';';
    
    document.cookie = key + expires + 'path=/';
}

function getCookie(name) {
    
}