/* =====================================================
   LOVE PROPOSAL WEBSITE
   Formspree:
   https://formspree.io/f/xzepljrz
===================================================== */


/* ================= SCREEN ELEMENTS ================= */

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


/* ================= MUSIC ================= */

const loveSong =
    document.getElementById("loveSong");

const startBtn =
    document.getElementById("startBtn");


/* ================= START ================= */

startBtn.addEventListener("click", async () => {

    /*
       Browser autoplay restriction:
       Music starts after user taps the button.
    */

    try {

        loveSong.volume = 0.65;

        await loveSong.play();

    } catch (error) {

        console.log(
            "Music could not autoplay:",
            error
        );
    }


    startScreen.classList.remove("active");

    scratchScreen.classList.add("active");


    currentPhoto = 0;

    createScratchCard();

});



/* =====================================================
   FLOATING LOVE EMOJIS
===================================================== */

const heartContainer =
    document.getElementById("heartContainer");


const loveEmojis = [

    "❤️",
    "💕",
    "💗",
    "💖",
    "💘",
    "💝",
    "💓",
    "💞",
    "💟",
    "🥰",
    "😍",
    "😘"

];


function createFloatingEmoji() {

    const emoji =
        document.createElement("div");

    emoji.className =
        "floatingEmoji";


    emoji.textContent =
        loveEmojis[
            Math.floor(
                Math.random() *
                loveEmojis.length
            )
        ];


    emoji.style.left =
        Math.random() * 100 + "%";


    emoji.style.fontSize =
        (18 + Math.random() * 32) + "px";


    emoji.style.animationDuration =
        (6 + Math.random() * 7) + "s";


    emoji.style.animationDelay =
        (Math.random() * 1) + "s";


    heartContainer.appendChild(emoji);


    setTimeout(() => {

        emoji.remove();

    }, 15000);
}


/*
   Hearts start immediately when
   website opens.
*/

setInterval(
    createFloatingEmoji,
    450
);


/*
   Initial hearts
*/

for (
    let i = 0;
    i < 8;
    i++
) {

    setTimeout(
        createFloatingEmoji,
        i * 200
    );
}



/* =====================================================
   SCRATCH PHOTOS
===================================================== */

const photos = [
    "photo1.jpg",
    "photo2.jpg",
    "photo3.jpg",
    "photo4.jpg",
    "photo5.jpg",
    "photo6.jpg",
    "photo7.jpg",
    "photo8.jpg",
    "photo9.jpg"
];


let currentPhoto = 0;

let scratchCompleted = false;

let isDrawing = false;

let lastPoint = null;


const progressText =
    document.getElementById("progressText");

const scratchContainer =
    document.getElementById(
        "scratchContainer"
    );



/* ================= CREATE SCRATCH CARD ================= */

function createScratchCard() {

    scratchCompleted = false;

    isDrawing = false;

    lastPoint = null;


    scratchContainer.innerHTML = "";


    progressText.textContent =
        "Memory " +
        (currentPhoto + 1) +
        " of 9";


    const card =
        document.createElement("div");

    card.className =
        "scratchCard";


    /* Photo */

    const image =
        document.createElement("img");

    image.className =
        "scratchImage";

    image.src =
        photos[currentPhoto];

    image.alt =
        "Love Memory " +
        (currentPhoto + 1);


    image.onerror = function () {

        console.log(
            "Photo not found:",
            image.src
        );

    };


    /* Canvas */

    const canvas =
        document.createElement("canvas");

    canvas.className =
        "scratchCanvas";


    card.appendChild(image);

    card.appendChild(canvas);

    scratchContainer.appendChild(card);


    /*
       Wait until browser calculates
       the actual card size.
    */

    requestAnimationFrame(() => {

        setupScratch(canvas);

    });

}



/* ================= SETUP CANVAS ================= */

function setupScratch(canvas) {

    const rect =
        canvas.getBoundingClientRect();


    const width =
        Math.round(rect.width);

    const height =
        Math.round(rect.height);


    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;


    const ctx =
        canvas.getContext("2d");


    ctx.scale(dpr, dpr);


    /*
       Scratch cover
    */

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            width,
            height
        );


    gradient.addColorStop(
        0,
        "#c0c0c0"
    );


    gradient.addColorStop(
        0.5,
        "#8d8d8d"
    );


    gradient.addColorStop(
        1,
        "#5f5f5f"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /*
       Cover text
    */

    ctx.fillStyle =
        "rgba(255,255,255,.95)";


    ctx.font =
        "bold 24px Arial";


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.fillText(
        "Scratch Here ❤️",
        width / 2,
        height / 2
    );


    /*
       Scratch effect
    */

    ctx.globalCompositeOperation =
        "destination-out";



    function getPosition(event) {

        const bounds =
            canvas.getBoundingClientRect();


        let clientX;
        let clientY;


        if (
            event.touches &&
            event.touches.length > 0
        ) {

            clientX =
                event.touches[0].clientX;

            clientY =
                event.touches[0].clientY;

        } else {

            clientX =
                event.clientX;

            clientY =
                event.clientY;
        }


        return {

            x:
                clientX -
                bounds.left,

            y:
                clientY -
                bounds.top

        };

    }



    function scratch(event) {

        if (!isDrawing)
            return;


        const point =
            getPosition(event);


        ctx.lineWidth = 65;

        ctx.lineCap =
            "round";

        ctx.lineJoin =
            "round";


        ctx.beginPath();


        if (lastPoint) {

            ctx.moveTo(
                lastPoint.x,
                lastPoint.y
            );

        } else {

            ctx.moveTo(
                point.x,
                point.y
            );
        }


        ctx.lineTo(
            point.x,
            point.y
        );


        ctx.stroke();


        lastPoint =
            point;


        /*
           Check scratched area
           after enough movement.
        */

        checkScratchProgress(
            canvas,
            ctx
        );

    }



    /* ================= MOUSE ================= */

    canvas.addEventListener(
        "mousedown",
        (event) => {

            isDrawing = true;

            lastPoint =
                getPosition(event);

            scratch(event);

        }
    );


    canvas.addEventListener(
        "mousemove",
        scratch
    );


    canvas.addEventListener(
        "mouseup",
        stopDrawing
    );


    canvas.addEventListener(
        "mouseleave",
        stopDrawing
    );



    /* ================= TOUCH ================= */

    canvas.addEventListener(
        "touchstart",
        (event) => {

            event.preventDefault();

            isDrawing = true;

            lastPoint =
                getPosition(event);

            scratch(event);

        },
        {
            passive: false
        }
    );


    canvas.addEventListener(
        "touchmove",
        (event) => {

            event.preventDefault();

            scratch(event);

        },
        {
            passive: false
        }
    );


    canvas.addEventListener(
        "touchend",
        (event) => {

            event.preventDefault();

            stopDrawing();

        },
        {
            passive: false
        }
    );


    function stopDrawing() {

        isDrawing = false;

        lastPoint = null;

    }

}



/* =====================================================
   CHECK SCRATCH PROGRESS
===================================================== */

let lastCheck = 0;


function checkScratchProgress(
    canvas,
    ctx
) {

    if (scratchCompleted)
        return;


    /*
       Don't check every single pixel movement.
    */

    const now =
        Date.now();


    if (
        now - lastCheck <
        350
    ) {

        return;
    }


    lastCheck =
        now;


    const width =
        canvas.width;

    const height =
        canvas.height;


    /*
       Read alpha channel
    */

    const imageData =
        ctx.getImageData(
            0,
            0,
            width,
            height
        );


    const pixels =
        imageData.data;


    let transparent =
        0;


    /*
       Check every 16th pixel
       for performance.
    */

    for (
        let i = 3;
        i < pixels.length;
        i += 64
    ) {

        if (
            pixels[i] === 0
        ) {

            transparent++;

        }

    }


    const total =
        Math.floor(
            pixels.length / 64
        );


    const percentage =
        (transparent / total) * 100;


    /*
       If around 55% scratched,
       automatically reveal photo.
    */

    if (
        percentage >= 55
    ) {

        revealCurrentPhoto();

    }

}



/* ================= REVEAL PHOTO ================= */

function revealCurrentPhoto() {

    if (scratchCompleted)
        return;


    scratchCompleted = true;


    const canvas =
        document.querySelector(
            ".scratchCanvas"
        );


    if (canvas) {

        canvas.style.transition =
            "opacity .7s ease";

        canvas.style.opacity =
            "0";


        setTimeout(() => {

            if (canvas)
                canvas.remove();

        }, 700);

    }


    /*
       Wait before next memory.
    */

    setTimeout(() => {

        currentPhoto++;


        if (
            currentPhoto >= 9
        ) {

            showPoem();

        } else {

            createScratchCard();

        }

    }, 1200);

}



/* =====================================================
   SHOW POEM
===================================================== */

function showPoem() {

    scratchScreen.classList.remove(
        "active"
    );


    poemScreen.classList.add(
        "active"
    );

}



/* =====================================================
   PROPOSAL BUTTON
===================================================== */

const proposalBtn =
    document.getElementById(
        "proposalBtn"
    );


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



/* =====================================================
   YES BUTTON
===================================================== */

const yesBtn =
    document.getElementById(
        "yesBtn"
    );


yesBtn.addEventListener(
    "click",
    async () => {

        /*
           Send result to owner.
        */

        await sendResult(
            "YES ❤️"
        );


        /*
           Show romantic result.
        */

        showFinalResult(
            "YES ❤️",
            "You just made my heart the happiest! 💍❤️"
        );


        createCelebration();

    }
);



/* =====================================================
   NO BUTTON
===================================================== */

const noBtn =
    document.getElementById(
        "noBtn"
    );


noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);


noBtn.addEventListener(
    "touchstart",
    moveNoButton,
    {
        passive: false
    }
);


function moveNoButton(event) {

    if (event) {

        event.preventDefault();

    }


    /*
       Make NO button move away.
    */

    const padding = 20;


    const maxX =
        window.innerWidth -
        noBtn.offsetWidth -
        padding;


    const maxY =
        window.innerHeight -
        noBtn.offsetHeight -
        padding;


    const x =
        Math.max(
            padding,
            Math.random() *
            maxX
        );


    const y =
        Math.max(
            padding,
            Math.random() *
            maxY
        );


    noBtn.style.position =
        "fixed";


    noBtn.style.left =
        x + "px";


    noBtn.style.top =
        y + "px";


    noBtn.style.zIndex =
        "9999";

}



/* =====================================================
   SEND RESULT TO FORMSPREE
===================================================== */

async function sendResult(answer) {

    const formspreeURL =
        "https://formspree.io/f/xzepljrz";


    const formData =
        new FormData();


    formData.append(
        "answer",
        answer
    );


    formData.append(
        "date",
        new Date().toLocaleString()
    );


    formData.append(
        "website",
        window.location.href
    );


    try {

        const response =
            await fetch(
                formspreeURL,
                {
                    method: "POST",

                    body: formData,

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (
            response.ok
        ) {

            console.log(
                "Result sent successfully."
            );

        } else {

            console.log(
                "Formspree error:",
                response.status
            );

        }

    } catch (error) {

        console.log(
            "Could not send result:",
            error
        );

    }

}



/* =====================================================
   FINAL RESULT
===================================================== */

function showFinalResult(
    title,
    message
) {

    proposalScreen.classList.remove(
        "active"
    );


    resultScreen.classList.add(
        "active"
    );


    document.getElementById(
        "resultTitle"
    ).textContent =
        title;


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;

}



/* =====================================================
   YES CELEBRATION
===================================================== */

function createCelebration() {

    const celebrationEmojis = [

        "❤️",
        "💖",
        "💕",
        "💗",
        "💍",
        "🥰",
        "✨",
        "💝"

    ];


    for (
        let i = 0;
        i < 40;
        i++
    ) {

        setTimeout(() => {

            const emoji =
                document.createElement(
                    "div"
                );


            emoji.className =
                "floatingEmoji";


            emoji.textContent =
                celebrationEmojis[
                    Math.floor(
                        Math.random() *
                        celebrationEmojis.length
                    )
                ];


            emoji.style.left =
                Math.random() * 100 +
                "%";


            emoji.style.bottom =
                "0";


            emoji.style.fontSize =
                (20 + Math.random() * 35) +
                "px";


            emoji.style.animationDuration =
                (3 + Math.random() * 4) +
                "s";


            heartContainer.appendChild(
                emoji
            );


            setTimeout(() => {

                emoji.remove();

            }, 8000);


        }, i * 80);

    }

}
