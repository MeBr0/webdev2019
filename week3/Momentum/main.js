var mode = true;

start();

function start() {
    showDate();
    showTimeFirst();
    
    var token = setInterval(showTime, 1000);

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
    
        $('.question').keypress(function(e) {
            console.log("qwe");
            if(e.which == 13) {
                var username = e.target.value;
                
                if(!username) return;
                
                $('.ask').fadeOut( 
                    function(){
                        $('.greeting').html(`<h1>Hello, ${username}</h1>`);
                        $('.greeting').fadeIn(
                            function(){
                                setCookie('username', username,365);
                            });
                    });
            }
        });
    }
    else {
        $('.greeting').css('display', 'none');
        $('.ask').css('display', 'none');
        $('.todo').css('display', 'flex');
    }
    
}

// $("#btn").click(switchMode());

function switchMode() {
    if (mode) {
        btn.style.background = "rgba(218, 7, 7, 0.836)";
        
        mode = false;
    }
    else {
        btn.style.background = 'rgb(18, 240, 30)';

        mode = true;
    }

    start();
}

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
    name += "=";

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