/* =========================
   LOVE PROPOSAL WEBSITE
========================= */


/* ---------- Screens ---------- */

const startScreen =
    document.getElementById("startScreen");

const scratchScreen =
    document.getElementById("scratchScreen");

const poemScreen =
    document.getElementById("poemScreen");

const proposalScreen =
    document.getElementById("proposalScreen");

const resultScreen =
    document.getElementById("resultScreen");


/* ---------- Music ---------- */

const music =
    document.getElementById("loveSong");

const startBtn =
    document.getElementById("startBtn");


startBtn.addEventListener("click", () => {

    music.volume = 0.7;

    music.play().catch(() => {});

    startScreen.classList.remove("active");

    scratchScreen.classList.add("active");

    createScratchCard();

});


/* ---------- Floating Hearts ---------- */

const heartContainer =
    document.getElementById("hearts");


function createHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart";

    const emojis = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘",
        "💝",
        "💓"
    ];

    heart.innerHTML =
        emojis[
            Math.floor(
                Math.random() * emojis.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 30) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 7) + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 12000);
}


setInterval(createHeart, 350);


/* ---------- Scratch Photos ---------- */

const photos = [

    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg"

];


let currentPhoto = 0;

let scratching = false;

let scratchedPixels = 0;

const progressText =
    document.getElementById("progressText");

const scratchContainer =
    document.getElementById("scratchContainer");


function createScratchCard() {

    scratchContainer.innerHTML = "";

    scratchedPixels = 0;

    progressText.innerText =
        `Memory ${currentPhoto + 1} of 9`;


    const card =
        document.createElement("div");

    card.className =
        "scratch-card";


    const image =
        document.createElement("img");

    image.src =
        photos[currentPhoto];


    const canvas =
        document.createElement("canvas");

    canvas.className =
        "scratchCanvas";


    card.appendChild(image);

    card.appendChild(canvas);

    scratchContainer.appendChild(card);


    setupCanvas(canvas);
}


function setupCanvas(canvas) {

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        rect.width * dpr;

    canvas.height =
        rect.height * dpr;

    const ctx =
        canvas.getContext("2d");

    ctx.scale(dpr, dpr);


    /* Scratch cover */

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            rect.width,
            rect.height
        );

    gradient.addColorStop(
        0,
        "#bdbdbd"
    );

    gradient.addColorStop(
        1,
        "#757575"
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );


    ctx.fillStyle =
        "white";

    ctx.font =
        "bold 24px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "Scratch Here ❤️",
        rect.width / 2,
        rect.height / 2
    );


    function scratch(e) {

        if (!scratching)
            return;

        const bounds =
            canvas.getBoundingClientRect();

        let x;
        let y;


        if (e.touches) {

            x =
                e.touches[0].clientX -
                bounds.left;

            y =
                e.touches[0].clientY -
                bounds.top;

        } else {

            x =
                e.clientX -
                bounds.left;

            y =
                e.clientY -
                bounds.top;
        }


        ctx.globalCompositeOperation =
            "destination-out";


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            35,
            0,
            Math.PI * 2
        );

        ctx.fill();


        scratchedPixels++;

        if (
            scratchedPixels > 100
        ) {

            nextPhoto();

        }
    }


    canvas.addEventListener(
        "mousedown",
        () => scratching = true
    );

    canvas.addEventListener(
        "mouseup",
        () => scratching = false
    );

    canvas.addEventListener(
        "mouseleave",
        () => scratching = false
    );

    canvas.addEventListener(
        "mousemove",
        scratch
    );


    canvas.addEventListener(
        "touchstart",
        (e) => {

            e.preventDefault();

            scratching = true;

            scratch(e);
        },
        { passive: false }
    );


    canvas.addEventListener(
        "touchend",
        () => scratching = false
    );


    canvas.addEventListener(
        "touchmove",
        (e) => {

            e.preventDefault();

            scratch(e);

        },
        { passive: false }
    );
}


/* ---------- Next Photo ---------- */

function nextPhoto() {

    if (currentPhoto >= 9)
        return;


    currentPhoto++;


    if (currentPhoto >= 9) {

        setTimeout(() => {

            scratchScreen.classList.remove(
                "active"
            );

            poemScreen.classList.add(
                "active"
            );

        }, 700);

        return;
    }


    createScratchCard();
}


/* ---------- Proposal ---------- */

const proposalBtn =
    document.getElementById("proposalBtn");


proposalBtn.addEventListener(
    "click",
    () => {

        poemScreen.classList.remove(
            "active"
        );

        proposalScreen.classList.add(
            "active"
        );

    }
);


/* ---------- YES / NO ---------- */

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");


yesBtn.addEventListener(
    "click",
    () => {

        sendResult("YES");

        showResult(
            "YES ❤️",
            "You just made my heart the happiest! 💍❤️"
        );

    }
);


/* Fun NO button */

noBtn.addEventListener(
    "mouseover",
    moveNoButton
);

noBtn.addEventListener(
    "touchstart",
    moveNoButton
);


function moveNoButton(e) {

    e.preventDefault();

    const maxX =
        window.innerWidth - 150;

    const maxY =
        window.innerHeight - 80;


    noBtn.style.position =
        "fixed";

    noBtn.style.left =
        Math.random() * maxX + "px";

    noBtn.style.top =
        Math.random() * maxY + "px";
}


/* ---------- Result ---------- */

function showResult(title, message) {

    proposalScreen.classList.remove(
        "active"
    );

    resultScreen.classList.add(
        "active"
    );

    document.getElementById(
        "resultEmoji"
    ).innerHTML = "💖";

    document.getElementById(
        "resultTitle"
    ).innerText = title;

    document.getElementById(
        "resultMessage"
    ).innerText = message;
}


/* ---------- Formspree ---------- */

async function sendResult(answer) {

    const formspreeURL =
        "https://formspree.io/f/YOUR_FORM_ID";


    const data = {

        answer: answer,

        date:
            new Date().toLocaleString(),

        page:
            window.location.href

    };


    try {

        await fetch(
            formspreeURL,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Accept":
                        "application/json"

                },

                body:
                    JSON.stringify(data)

            }
        );

    } catch (error) {

        console.log(
            "Result sending failed"
        );

    }
}
