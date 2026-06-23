const main = document.querySelector("main")
const btn = document.querySelector("button")
const timer = document.querySelector("#timer")
const scoree = document.querySelector("#score")
const overLay = document.querySelector(".overlay")

const box = document.createElement("div")
box.classList.add("box")

let time = 0;
let score = 0;
let interval;
let canClick = true;

const randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`;
}

const randomBox = () => {
    canClick = true;

    box.style.backgroundColor = randomColor()

    main.append(box)   // Adds box inside main.

    // clientHeight - height + padding (parent ki height)
    // offsetHeight - height + padding + border (box ki height)
    let mainH = main.clientHeight - box.offsetHeight;
    let mainW = main.clientWidth - box.offsetWidth;

    let ry = Math.random() * mainH;
    let rx = Math.random() * mainW;

    box.style.top = `${ry}px`;
    box.style.left = `${rx}px`;
}

btn.addEventListener("click", () => {
    btn.disabled = true;    // disable start button

    randomBox()

    clearInterval(interval);

    interval = setInterval(() => {
        randomBox()
        time += 1;
        timer.textContent = time
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
        overLay.style.display = "flex";

        setTimeout(() => {
            // hide game over
            overLay.style.display = "none";

            // reset values
            time = 0;
            score = 0;
            timer.textContent = time;
            scoree.textContent = score;

            // remove old box
            box.remove();

            btn.disabled = false;    // enable start button

        }, 3000)
    }, 10000);
});

box.addEventListener("click", () => {
    if (!canClick) return;
    canClick = false;

    score += 1;
    scoree.textContent = score;
})