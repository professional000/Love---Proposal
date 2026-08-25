/* =====================================================
   OUR LITTLE LOVE STORY
   ===================================================== */


/* ================= CONFIG ================= */

const FORM_ENDPOINT =
    "https://formspree.io/f/xzepljrz";


/* ================= PHOTOS ================= */

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


/* ================= POEMS ================= */

const poems = [

    {
        emoji: "💗",
        title: "The First Time I Saw You...",
        text:
`Online-la oru naal unnai paarthen...
Adhu verum oru paarvai-nu ninaichen,

Aana andha oru paarvaiye
En manasula oru pudhu kathaiya
aarambichiduchu... ❤️`
    },


    {
        emoji: "✨",
        title: "Something About You...",
        text:
`Un profile-ai paarkka paarkka,
Enakku theriyama oru sirippu vandhadhu...

Unna pathi edhuvum theriyama irundhaalum,
Unnai therinjukkanum-nu
oru aasai vandhadhu... 💕`
    },


    {
        emoji: "💌",
        title: "Our First Conversation...",
        text:
`Mudhal message anuppumbodhu
En viralgal mattum illa...

En manasum konjam nadungichu...

Un reply vandha andha nodi,
Enakku romba special-a maariduchu... ❤️`
    },


    {
        emoji: "🥰",
        title: "Getting To Know You...",
        text:
`Konjam konjama pesinom,
Konjam konjama sirichom...

Eppo unnoda message-kaaga
En manasu wait panna aarambichadho
Enakkே theriyala... 💗`
    },


    {
        emoji: "💭",
        title: "I Started Missing You...",
        text:
`Un message illaadha naalum,
Un ninaivu mattum irundhudhu...

Appothaan purinjadhu,
Nee en life-la konjam konjam-a
mukkiyama maaritta-nu... 🥺❤️`
    },


    {
        emoji: "❤️",
        title: "Maybe It Was Love...",
        text:
`Unna online-la paartha oru naal,
En manasula oru feeling vandhadhu...

Adhu friendship-aa,
Attraction-aa-nu yosichen...

Kaalam dhaan answer sonnadhu...

Adhu kaadhal. ❤️`
    },


    {
        emoji: "💖",
        title: "You Became Special...",
        text:
`Ulagathula pala perai paarkalam...

Aana en kannukku
Unnai mattum dhaan
theda thonudhu...

Yen endru kettaal,
En manasu sollum ore badhil...

"Aval dhaan." 💖`
    },


    {
        emoji: "🌹",
        title: "I Want You In My Life...",
        text:
`Online-la aarambicha namma kathai,
Inime online-la mattum irukka koodadhu...

Un sirippai pakkathula paakanum,
Un kaiya pidichu nadakkanum...

Un kooda oru vaazhkai
vaazhanum... ❤️`
    },


    {
        emoji: "💍",
        title: "One Last Thing...",
        text:
`Oru naal online-la unnai paarthen...

Indru en vaazhkai muzhuvadhum
unnai paarka aasai paduren...

Mudhalil oru stranger,
Piragu oru friend,
Ippodhu en manasoda
romba special-aana oruthar... ❤️

En kathaiyin next chapter-la
nee en kooda iruppiya? 💕`
    }

];


/* ================= ELEMENTS ================= */

const homeScreen =
    document.getElementById("homeScreen");

const scratchScreen =
    document.getElementById("scratchScreen");

const poemScreen =
    document.getElementById("poemScreen");

const proposalScreen =
    document.getElementById("proposalScreen");

const resultScreen =
    document.getElementById("resultScreen");


const openHeartBtn =
    document.getElementById("openHeartBtn");

const nextMemoryBtn =
    document.getElementById("nextMemoryBtn");

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");


const scratchImage =
    document.getElementById("scratchImage");

const scratchCanvas =
    document.getElementById("scratchCanvas");

const scratchContainer =
    document.getElementById("scratchContainer");

const progressText =
    document.getElementById("progressText");

const scratchStatus =
    document.getElementById("scratchStatus");

const poemNumber =
    document.getElementById("poemNumber");

const poemTitle =
    document.getElementById("poemTitle");

const poemText =
    document.getElementById("poemText");

const poemEmoji =
    document.getElementById("poemEmoji");

const loveSong =
    document.getElementById("loveSong");

const heartContainer =
    document.getElementById("heartContainer");

const resultTitle =
    document.getElementById("resultTitle");

const resultMessage =
    document.getElementById("resultMessage");

const resultEmoji =
    document.getElementById("resultEmoji");


/* ================= VARIABLES ================= */

let currentMemory = 0;

let ctx = null;

let isDrawing = false;

let scratchCompleted = false;

let scratchMoves = 0;

let lastCheck = 0;


/* ================= SCREEN CHANGE ================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove("active");

        });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= MUSIC ================= */

function playLoveSong() {

    loveSong.volume = 0.65;

    const playPromise =
        loveSong.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {

            /*
             Browser autoplay blocked.
             It will play after user interaction.
            */

        });

    }
}


/*
   Try autoplay immediately.
*/

window.addEventListener(
    "load",
    () => {

        playLoveSong();

    }
);


/*
   First touch/click will start music
   if browser blocked autoplay.
*/

document.addEventListener(
    "pointerdown",
    () => {

        playLoveSong();

    },
    {
        once: true
    }
);


/* ================= HOME ================= */

openHeartBtn.addEventListener(
    "click",
    () => {

        playLoveSong();

        currentMemory = 0;

        showScreen(
            scratchScreen
        );

        createScratchCard();

    }
);


/* ================= SCRATCH CARD ================= */

function createScratchCard() {

    scratchCompleted = false;

    isDrawing = false;

    scratchMoves = 0;

    lastCheck = 0;


    progressText.textContent =
        `Memory ${currentMemory + 1} of 9`;


    scratchStatus.textContent =
        "Keep scratching... ❤️";


    scratchImage.src =
        photos[currentMemory];


    /*
       Remove old canvas
    */

    const oldCanvas =
        document.getElementById(
            "scratchCanvas"
        );

    if (oldCanvas) {

        oldCanvas.remove();

    }


    /*
       Create fresh canvas
    */

    const canvas =
        document.createElement("canvas");

    canvas.id =
        "scratchCanvas";

    canvas.className =
        "scratchCanvas";


    scratchContainer
        .querySelector(".scratchCard")
        .appendChild(canvas);


    /*
       Wait for image/card size
    */

    requestAnimationFrame(
        () => {

            setupCanvas(canvas);

        }
    );
}


/* ================= CANVAS SETUP ================= */

function setupCanvas(canvas) {

    const rect =
        canvas.getBoundingClientRect();


    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        rect.width * dpr;

    canvas.height =
        rect.height * dpr;


    ctx =
        canvas.getContext("2d");


    ctx.scale(dpr, dpr);


    /*
       Scratch cover
    */

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            rect.width,
            rect.height
        );


    gradient.addColorStop(
        0,
        "#ffb6d9"
    );

    gradient.addColorStop(
        0.5,
        "#ff72ad"
    );

    gradient.addColorStop(
        1,
        "#c026d3"
    );


    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );


    /*
       Cover text
    */

    ctx.fillStyle =
        "rgba(255,255,255,0.95)";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.font =
        "bold 25px Arial";


    ctx.fillText(
        "Scratch Me ❤️",
        rect.width / 2,
        rect.height / 2 - 15
    );


    ctx.font =
        "18px Arial";


    ctx.fillText(
        "Our memory is waiting...",
        rect.width / 2,
        rect.height / 2 + 25
    );


    /*
       Drawing settings
    */

    ctx.globalCompositeOperation =
        "destination-out";


    /*
       Events
    */

    canvas.addEventListener(
        "pointerdown",
        startScratch
    );

    canvas.addEventListener(
        "pointermove",
        scratchMove
    );

    canvas.addEventListener(
        "pointerup",
        stopScratch
    );

    canvas.addEventListener(
        "pointercancel",
        stopScratch
    );

    canvas.addEventListener(
        "pointerleave",
        stopScratch
    );
}


/* ================= SCRATCH START ================= */

function startScratch(event) {

    if (scratchCompleted) {
        return;
    }

    isDrawing = true;

    scratchAt(event);

}


/* ================= SCRATCH MOVE ================= */

function scratchMove(event) {

    if (!isDrawing) {
        return;
    }

    scratchAt(event);

}


/* ================= SCRATCH END ================= */

function stopScratch() {

    isDrawing = false;

}


/* ================= SCRATCH DRAW ================= */

function scratchAt(event) {

    if (!ctx || scratchCompleted) {
        return;
    }


    const canvas =
        event.currentTarget;


    const rect =
        canvas.getBoundingClientRect();


    const x =
        event.clientX -
        rect.left;


    const y =
        event.clientY -
        rect.top;


    /*
       Bigger brush for mobile
    */

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        42,
        0,
        Math.PI * 2
    );

    ctx.fill();


    scratchMoves++;


    /*
       Fast reliable reveal
    */

    if (scratchMoves >= 30) {

        revealCurrentPhoto();

        return;

    }


    /*
       Percentage check
    */

    checkScratchProgress(
        canvas
    );
}


/* ================= CHECK SCRATCH ================= */

function checkScratchProgress(canvas) {

    if (scratchCompleted) {
        return;
    }


    const now =
        Date.now();


    if (
        now - lastCheck <
        400
    ) {

        return;

    }


    lastCheck = now;


    try {

        const width =
            canvas.width;

        const height =
            canvas.height;


        /*
           Sample pixels instead of
           checking every pixel.
        */

        const imageData =
            ctx.getImageData(
                0,
                0,
                width,
                height
            );


        const data =
            imageData.data;


        let transparent =
            0;

        let total =
            0;


        for (
            let i = 3;
            i < data.length;
            i += 40
        ) {

            total++;


            if (
                data[i] < 80
            ) {

                transparent++;

            }

        }


        const percentage =
            (
                transparent /
                total
            ) * 100;


        if (
            percentage >= 20
        ) {

            revealCurrentPhoto();

        }

    }
    catch (error) {

        /*
           If pixel checking fails,
           move count still reveals it.
        */

    }
}


/* ================= REVEAL PHOTO ================= */

function revealCurrentPhoto() {

    if (scratchCompleted) {
        return;
    }


    scratchCompleted = true;


    scratchStatus.textContent =
        "Memory revealed... ❤️";


    const canvas =
        document.getElementById(
            "scratchCanvas"
        );


    if (canvas) {

        canvas.style.transition =
            "opacity 0.7s ease";

        canvas.style.opacity =
            "0";

    }


    /*
       Show poem after
       small reveal animation.
    */

    setTimeout(
        () => {

            showPoem();

        },
        800
    );
}


/* ================= SHOW POEM ================= */

function showPoem() {

    const poem =
        poems[currentMemory];


    poemEmoji.textContent =
        poem.emoji;


    poemNumber.textContent =
        `Memory ${currentMemory + 1} of 9`;


    poemTitle.textContent =
        poem.title;


    /*
       Preserve line breaks
    */

    poemText.innerHTML =
        poem.text.replace(
            /\n/g,
            "<br>"
        );


    if (
        currentMemory ===
        poems.length - 1
    ) {

        nextMemoryBtn.textContent =
            "One Last Question 💍";

    }
    else {

        nextMemoryBtn.textContent =
            "Next Memory ❤️";

    }


    showScreen(
        poemScreen
    );
}


/* ================= NEXT MEMORY ================= */

nextMemoryBtn.addEventListener(
    "click",
    () => {

        /*
           Last poem
        */

        if (
            currentMemory >=
            poems.length - 1
        ) {

            showScreen(
                proposalScreen
            );

            return;

        }


        /*
           Next photo
        */

        currentMemory++;

        showScreen(
            scratchScreen
        );

        createScratchCard();

    }
);


/* ================= PROPOSAL ================= */


/*
   YES
*/

yesBtn.addEventListener(
    "click",
    () => {

        sendAnswer("YES ❤️");

    }
);


/*
   NO
*/

noBtn.addEventListener(
    "click",
    () => {

        sendAnswer("NO 😢");

    }
);


/* ================= SEND FORM ================= */

async function sendAnswer(answer) {

    /*
       Disable buttons
       to prevent duplicate submits.
    */

    yesBtn.disabled = true;

    noBtn.disabled = true;


    const formData =
        new FormData();


    formData.append(
        "answer",
        answer
    );


    formData.append(
        "message",
        `Love proposal answer: ${answer}`
    );


    formData.append(
        "date",
        new Date().toLocaleString()
    );


    try {

        const response =
            await fetch(
                FORM_ENDPOINT,
                {
                    method: "POST",

                    body: formData,

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (response.ok) {

            showResult(
                answer
            );

        }
        else {

            showResult(
                answer
            );

        }

    }
    catch (error) {

        /*
           Even if network response
           has a problem, don't expose
           the answer publicly.
        */

        showResult(
            answer
        );

    }

}


/* ================= RESULT ================= */

function showResult(answer) {

    showScreen(
        resultScreen
    );


    if (
        answer ===
        "YES ❤️"
    ) {

        resultEmoji.textContent =
            "💖";

        resultTitle.textContent =
            "You Made My Heart Smile ❤️";

        resultMessage.textContent =
            "Thank you for choosing me. Our beautiful journey starts here... 💍✨";

    }
    else {

        resultEmoji.textContent =
            "🥺";

        resultTitle.textContent =
            "Thank You For Your Answer";

        resultMessage.textContent =
            "Whatever your answer, thank you for being honest. ❤️";

    }

}


/* ================= FLOATING HEARTS ================= */

const heartEmojis = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💘",
    "💝",
    "💞",
    "💓",
    "✨",
    "🥰"
];


function createFloatingHeart() {

    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "floatingEmoji";


    heart.textContent =
        heartEmojis[
            Math.floor(
                Math.random() *
                heartEmojis.length
            )
        ];


    const size =
        20 +
        Math.random() * 40;


    const left =
        Math.random() * 100;


    const duration =
        5 +
        Math.random() * 7;


    heart.style.left =
        `${left}%`;


    heart.style.fontSize =
        `${size}px`;


    heart.style.animationDuration =
        `${duration}s`;


    heartContainer.appendChild(
        heart
    );


    setTimeout(
        () => {

            heart.remove();

        },
        duration * 1000 + 1000
    );
}


/*
   Hearts continuously.
*/

setInterval(
    createFloatingHeart,
    550
);


/*
   Initial hearts.
*/

for (
    let i = 0;
    i < 8;
    i++
) {

    setTimeout(
        createFloatingHeart,
        i * 250
    );

}
