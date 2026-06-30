// =====================================
// SIMPLE CONFETTI ANIMATION
// =====================================

let confettiCanvas;
let confettiCtx;
let confettiPieces = [];
let animationId;

// =====================================
// CREATE CANVAS
// =====================================

function createConfettiCanvas(){

    confettiCanvas =
    document.createElement("canvas");

    confettiCanvas.id =
    "confetti-canvas";

    confettiCanvas.style.position =
    "fixed";

    confettiCanvas.style.top =
    "0";

    confettiCanvas.style.left =
    "0";

    confettiCanvas.style.width =
    "100vw";

    confettiCanvas.style.height =
    "100vh";

    confettiCanvas.style.pointerEvents =
    "none";

    confettiCanvas.style.zIndex =
    "9999";

    document.body.appendChild(
        confettiCanvas
    );

    resizeCanvas();

    confettiCtx =
    confettiCanvas.getContext("2d");

}

function resizeCanvas(){

    if(!confettiCanvas) return;

    confettiCanvas.width =
    window.innerWidth;

    confettiCanvas.height =
    window.innerHeight;

}

window.addEventListener(
    "resize",
    resizeCanvas
);

// =====================================
// CONFETTI PIECE
// =====================================

class ConfettiPiece{

    constructor(){

        this.x =
        Math.random() *
        window.innerWidth;

        this.y =
        Math.random() *
        -window.innerHeight;

        this.size =
        Math.random() * 10 + 5;

        this.speed =
        Math.random() * 3 + 2;

        this.rotation =
        Math.random() * 360;

        this.rotationSpeed =
        Math.random() * 8 - 4;

        const colors = [

            "#ff4d4d",
            "#ffcc00",
            "#00cc66",
            "#3399ff",
            "#cc66ff",
            "#ff66b2"

        ];

        this.color =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];

    }

    update(){

        this.y += this.speed;

        this.rotation +=
        this.rotationSpeed;

        if(
            this.y >
            window.innerHeight + 20
        ){

            this.y = -20;

            this.x =
            Math.random() *
            window.innerWidth;

        }

    }

    draw(){

        confettiCtx.save();

        confettiCtx.translate(
            this.x,
            this.y
        );

        confettiCtx.rotate(
            this.rotation *
            Math.PI / 180
        );

        confettiCtx.fillStyle =
        this.color;

        confettiCtx.fillRect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );

        confettiCtx.restore();

    }

}

// =====================================
// ANIMATE
// =====================================

function animateConfetti(){

    confettiCtx.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );

    confettiPieces.forEach(
        piece => {

            piece.update();

            piece.draw();

        }
    );

    animationId =
    requestAnimationFrame(
        animateConfetti
    );

}

// =====================================
// START CONFETTI
// =====================================

function startConfetti(){

    stopConfetti();

    if(
        !document.getElementById(
            "confetti-canvas"
        )
    ){
        createConfettiCanvas();
    }

    confettiPieces = [];

    for(
        let i = 0;
        i < 200;
        i++
    ){

        confettiPieces.push(
            new ConfettiPiece()
        );

    }

    animateConfetti();

    setTimeout(
        stopConfetti,
        5000
    );

}

// =====================================
// STOP CONFETTI
// =====================================

function stopConfetti(){

    cancelAnimationFrame(
        animationId
    );

    const canvas =
    document.getElementById(
        "confetti-canvas"
    );

    if(canvas){

        canvas.remove();

    }

}