document.addEventListener("DOMContentLoaded", function () {
    button = document.getElementById("main_button");

    button.addEventListener("click", () => {
        if (in_talking_timeout || in_thinking_timeout) { return; }

        let main_button_img = document.getElementById("main_timer_icon");
        if (paused) {
            button.style.backgroundColor = "#f44336";
            main_button_img.src = "/images/pause.png";
        } else {
            button.style.backgroundColor = "#04AA6D";
            main_button_img.src = "/images/play.png";
        }

        paused = !paused;
    });

    thinking_button = document.getElementById("thinking_timeout_button");
    thinking_button.addEventListener("click", () => {
        if (in_talking_timeout) { return; }

        let thinking_button_img = document.getElementById("thinking_timer_icon");
        if (in_thinking_timeout) {
            clearInterval(window.thinking_interval);
            thinking_button.style.backgroundColor = "#04AA6D";
            thinking_button_img.src = "/images/play.png";
            document.getElementById("thinking_timer").innerHTML = "4:00";

        } else {
            thinking_timer = 240;
            thinking_button.style.backgroundColor = "#f44336";
            thinking_button_img.src = "/images/stop.png";
            if (!paused) {
                button.dispatchEvent(new Event("click"));
            };

            thinking_interval = setInterval(() => {
                thinking_timer_func();
            }, 1)
        };

        in_thinking_timeout = !in_thinking_timeout;
    });

    talking_button = document.getElementById("talking_timeout_button");
    talking_button.addEventListener("click", () => {
        if (in_thinking_timeout) { return; }

        let talking_button_img = document.getElementById("talking_timer_icon");
        if (in_talking_timeout) {
            clearInterval(window.talking_interval);
            talking_button.style.backgroundColor = "#04AA6D";
            talking_button_img.src = "/images/play.png";
            document.getElementById("talking_timer").innerHTML = "4:00";

        } else {
            talking_timer = 240;
            talking_button.style.backgroundColor = "#f44336";
            talking_button_img.src = "/images/stop.png";
            if (!paused) {
                button.dispatchEvent(new Event("click"));
            };

            talking_interval = setInterval(() => {
                talking_timer_func();
            }, 1)
        };

        in_talking_timeout = !in_talking_timeout;
    });
});

var main_timer = 2400;
var thinking_timer = 240;
var talking_timer = 240;
var paused = true;
var in_talking_timeout = false;
var in_thinking_timeout = false;
var thinking_timeouts = 0;
var talking_timeouts = 0;

function timer() {
    if (paused) { return; }

    if (main_timer < 2) {
        new Audio('/sounds/timer.mp3').play()
        clearInterval(main_interval);
    }

    main_timer--;
    let timer_text = document.getElementById("main_timer");
    let minutes = Math.floor(main_timer / 60).toString().padStart(2, "0");
    let seconds = (main_timer % 60).toString().padStart(2, "0");
    timer_text.innerHTML = minutes + ":" + seconds;
};

function thinking_timer_func() {
    if (thinking_timer < 2) {
        new Audio('/sounds/timer.mp3').play()
        thinking_button.dispatchEvent(new Event("click"));
        button.dispatchEvent(new Event("click"));
        thinking_timeouts++;
        document.getElementById("thinking_timeouts").innerHTML = '(' + thinking_timeouts.toString() + ')'
        clearInterval(thinking_interval);
    }

    thinking_timer--;
    let timer_text = document.getElementById("thinking_timer");
    let minutes = Math.floor(thinking_timer / 60).toString().padStart(1, "0");
    let seconds = (thinking_timer % 60).toString().padStart(2, "0");
    timer_text.innerHTML = minutes + ":" + seconds;
}

function talking_timer_func() {
    if (talking_timer < 2) {
        new Audio('/sounds/timer.mp3').play()
        talking_button.dispatchEvent(new Event("click"));
        button.dispatchEvent(new Event("click"));
        talking_timeouts++;
        document.getElementById("talking_timeouts").innerHTML = '(' + talking_timeouts.toString() + ')'
        clearInterval(talking_interval);
    }

    talking_timer--;
    let timer_text = document.getElementById("talking_timer");
    let minutes = Math.floor(talking_timer / 60).toString().padStart(1, "0");
    let seconds = (talking_timer % 60).toString().padStart(2, "0");
    timer_text.innerHTML = minutes + ":" + seconds;
}

var main_interval = setInterval(() => {
    timer();
}, 1);