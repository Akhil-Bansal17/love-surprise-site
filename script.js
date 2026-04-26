let noCount = 0;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const catText = document.getElementById("catText");
const music = document.getElementById("bgMusic");
const transition = document.getElementById("transitionScreen");

/* loading */
let count = 3;
const countdown = document.getElementById("countdown");
const loadingInterval = setInterval(()=>{
    count--;
    countdown.innerText = count;

    if(count===0){
        clearInterval(loadingInterval);
        document.getElementById("loadingScreen").style.display="none";
        document.getElementById("screen1").classList.remove("hiddenStart");
    }
},1000);

/* quotes */
const quotes = [
    "I made this only for you 💌",
    "Don't break my tiny heart 🥺",
    "Please think carefully 😼",
    "One click can change everything 💖"
];
let q = 0;
setInterval(()=>{
    document.getElementById("changingQuote").innerText = quotes[q];
    q = (q+1)%quotes.length;
},2000);

/* mouse parallax + cursor hearts */
document.addEventListener("mousemove",(e)=>{
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;

    document.querySelector(".circle1").style.transform = `translate(${x*20}px,${y*20}px)`;
    document.querySelector(".circle2").style.transform = `translate(${-x*25}px,${-y*25}px)`;
    document.querySelector(".circle3").style.transform = `translate(${x*15}px,${-y*15}px)`;

    createCursorHeart(e.clientX,e.clientY);
});

function createCursorHeart(x,y){
    const heart=document.createElement("div");
    heart.innerHTML="💖";
    heart.style.position="fixed";
    heart.style.left=x+"px";
    heart.style.top=y+"px";
    heart.style.fontSize="14px";
    document.body.appendChild(heart);

    heart.animate([
        {opacity:1, transform:"translateY(0px)"},
        {opacity:0, transform:"translateY(-20px)"}
    ],{duration:600});

    setTimeout(()=>heart.remove(),600);
}

/* no button */
noBtn.addEventListener("click",()=>{
    noCount++;
    noBtn.style.animation="shake 0.3s";
    setTimeout(()=>noBtn.style.animation="",300);

    if(noCount===1){
        catText.innerText="Think again 😿";
    }else if(noCount===2){
        catText.innerText="That hurts 😭";
    }else{
        catText.innerText="No option for no 😤";
        startMovingButton();
    }
});

function startMovingButton(){
    noBtn.style.position="absolute";
    noBtn.addEventListener("mouseover",()=>{
        noBtn.style.left=Math.random()*window.innerWidth+"px";
        noBtn.style.top=Math.random()*window.innerHeight+"px";
    });
}

/* yes */
yesBtn.addEventListener("click",()=>{
    heartBurst();
    transition.style.display="flex";

    setTimeout(()=>{
        transition.style.display="none";
        document.getElementById("screen1").classList.remove("active");
        document.getElementById("screen2").classList.add("active");
        music.play();
    },2000);
});

function heartBurst(){
    for(let i=0;i<50;i++){
        let h=document.createElement("div");
        h.innerHTML=["💖","💘","💕","💗"][Math.floor(Math.random()*4)];
        h.style.position="fixed";
        h.style.left="50%";
        h.style.top="50%";
        h.style.fontSize=(20+Math.random()*20)+"px";
        document.body.appendChild(h);

        let x=(Math.random()-0.5)*800;
        let y=(Math.random()-0.5)*800;

        h.animate([
            {transform:"translate(0,0)",opacity:1},
            {transform:`translate(${x}px,${y}px)`,opacity:0}
        ],{duration:1200});

        setTimeout(()=>h.remove(),1200);
    }
}

/* gift */
const gift=document.getElementById("gift");
const content=document.getElementById("surpriseContent");

gift.addEventListener("click",()=>{
    gift.style.display="none";
    document.querySelector(".gift-text").style.display="none";
    document.querySelector(".gift-hearts").style.display="none";
    document.querySelector(".gift-glow").style.display="none";
    content.classList.remove("hidden");
    startSlideshow();
    typeEffect();
});

/* slideshow */
const images=["photo.jpeg","photo1.jpeg","photo2.jpeg"];
let currentIndex=0;

function startSlideshow(){
    const img=document.getElementById("slideImage");
    setInterval(()=>{
        currentIndex=(currentIndex+1)%images.length;
        img.style.opacity=0;
        setTimeout(()=>{
            img.src=images[currentIndex];
            img.style.opacity=1;
        },300);
    },2000);
}

/* typing */
const message="I had a feeling you'd say yes 😚💖 You are honestly the prettiest woman I have ever met, and this little page is just a small reminder of how special you are to me.";
function typeEffect(){
    let i=0;
    const el=document.getElementById("typedText");
    function type(){
        if(i<message.length){
            el.innerHTML += message.charAt(i);
            i++;
            setTimeout(type,30);
        }
    }
    type();
}

/* next screens */
document.getElementById("toReasons").addEventListener("click",()=>{
    document.getElementById("screen2").classList.remove("active");
    document.getElementById("screen3").classList.add("active");
});

document.getElementById("toGame").addEventListener("click",()=>{
    document.getElementById("screen3").classList.remove("active");
    document.getElementById("screen4").classList.add("active");
});

document.getElementById("finalPopupBtn").addEventListener("click",()=>{
    document.getElementById("finalPopup").style.display="flex";
});

/* particles */
function createMegaHeart(){
    const heart = document.createElement("span");
    heart.innerHTML = ["💖","💘","💕","💗","💓","💞"][Math.floor(Math.random()*6)];
    heart.style.left = Math.random()*100 + "vw";
    heart.style.fontSize = (15 + Math.random()*25) + "px";
    heart.style.animation = `floatUp ${4+Math.random()*6}s linear`;
    document.querySelector(".mega-hearts").appendChild(heart);
    setTimeout(()=>heart.remove(),10000);
}
setInterval(createMegaHeart,150);

function createSparkle(){
    const sparkle = document.createElement("span");
    sparkle.innerHTML = ["✨","⭐","🌟","💫"][Math.floor(Math.random()*4)];
    sparkle.style.left = Math.random()*100 + "vw";
    sparkle.style.top = Math.random()*100 + "vh";
    sparkle.style.fontSize = (10 + Math.random()*18) + "px";
    sparkle.style.animation="twinkle 2s infinite";
    document.querySelector(".mega-sparkles").appendChild(sparkle);
    setTimeout(()=>sparkle.remove(),2500);
}
setInterval(createSparkle,100);

function createRose(){
    const rose = document.createElement("div");
    rose.classList.add("rose");
    rose.innerHTML=["🌹","🥀","🌷"][Math.floor(Math.random()*3)];
    rose.style.left=Math.random()*100+"vw";
    rose.style.fontSize=(18+Math.random()*25)+"px";
    rose.style.animation=`floatUp ${6+Math.random()*5}s linear`;
    document.querySelector(".rose-container").appendChild(rose);
    setTimeout(()=>rose.remove(),11000);
}
setInterval(createRose,500);

function createBokeh(){
    const bokeh = document.createElement("div");
    bokeh.classList.add("bokeh");
    let size = 80 + Math.random()*150;
    bokeh.style.width = size+"px";
    bokeh.style.height = size+"px";
    bokeh.style.left = Math.random()*100+"vw";
    bokeh.style.animationDuration = (8+Math.random()*8)+"s";
    document.querySelector(".bokeh-container").appendChild(bokeh);
    setTimeout(()=>bokeh.remove(),16000);
}
setInterval(createBokeh,800);

/* fireworks */
const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

function fireworkBurst(){
    for(let i=0;i<80;i++){
        let x=Math.random()*canvas.width;
        let y=Math.random()*canvas.height/2;

        ctx.fillStyle=`hsl(${Math.random()*360},100%,70%)`;
        ctx.beginPath();
        ctx.arc(x,y,3,0,Math.PI*2);
        ctx.fill();
    }
    setTimeout(()=>ctx.clearRect(0,0,canvas.width,canvas.height),700);
}
setInterval(fireworkBurst,1500);