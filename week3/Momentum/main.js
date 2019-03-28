var mode = true;

// document.cookie = null;

var token = setInterval(showTime, 1000);

start();

$('.question').keypress(function(e) {
    
    if(e.which == 13) {
        var username = e.target.value;
        
        if(!username) return;
        
        $('.ask').fadeOut( 
            function(){
                $('.greeting').html(`<h1>Hello, ${username}</h1>`);
                $('.greeting').fadeIn(
                    function(){
                        setCookie('username', username, 365);
                    });
            });
    }
});


$("#btn").click(function(e) {
    if (mode) {
        e.target.style.background = "rgba(218, 7, 7, 0.836)";
        
        mode = false;
    }
    else {
        e.target.style.background = 'rgb(18, 240, 30)';

        mode = true;
    }

    start();
});

function start() {
    showDate();
    showTimeFirst();
    
    if (mode) {
        const username = getCookie('username');
        console.log(username);
        
        $('.todo').css('display', 'none');
    
        if (username) {
            $('.greeting').css('display', 'flex');
            $('.ask').css('display', 'none');
            $('.greeting').html(`<h1>hello, ${username}</h1>`);
        }
        else {
            $('.greeting').css('display', 'none');
            $('.ask').css('display', 'flex');
        }
    }
    else {
        $('.greeting').css('display', 'none');
        $('.ask').css('display', 'none');
        $('.todo').css('display', 'flex');
    }
    
}

function showTimeFirst() {
    const currentDate = new Date();

    const splittedDate = currentDate.toString().split(" ");

    const hms = splittedDate[4].split(":");     // hours minutes seconds

    const time = document.getElementById("time");

    let postfix = currentDate.getHours() > 12 ? 'AM' : 'PM';

    time.innerHTML = hms[0] + " : " + hms[1] + "   " + postfix;

    // console.log(hms[0] + " : " + hms[1] + "   " + postfix);
}

function showTime() {
    const currentDate = new Date();

    const splittedDate = currentDate.toString().split(" ");

    const hms = splittedDate[4].split(":");     // hours minutes seconds
    
    if (hms[2] == '00') {
        const time = document.getElementById("time");

        let postfix = currentDate.getHours() > 12 ? 'AM' : 'PM';

        time.innerHTML = hms[0] + " : " + hms[1] + "   " + postfix;
    
        // console.log(hms[0] + " : " + hms[1] + "   " + postfix);

        if (hms[0] == "00" && hms[1] == "00") {
            showDate();
        }
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

    const key = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
    const expires = 'expires=' + date.toGMTString() + ';';
    
    document.cookie = key + expires + 'path=/';

    console.log(key + expires + 'path=/');
    console.log(document.cookie);
}

function getCookie(name) {
    name += "=";

    console.log(decodeURIComponent(document.cookie));

    const decodedCookie = decodeURIComponent(document.cookie);

    const splittedCookie = decodedCookie.split(';');
    
    for(let i = 0; i < splittedCookie.length; i++) {
        let c = splittedCookie[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}