const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".input-field");
const mistakeTag = document.querySelector(".mistake span");
const timerTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainButton = document.querySelector("button");


let timer,maxTime = 60,timeLeft = maxTime;
let charIndex = mistakes = 0;
let flag = 0;

function randomParagraph()
{
    let i = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[i].split("").forEach(element => {
        let spanTag = `<span>${element}</spam>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",() => {input.focus()});
    typingText.addEventListener("click",() => {input.focus()});
}
randomParagraph();


input.addEventListener("input",() => {
    const characters = typingText.querySelectorAll("span");
    let typedCharacter = input.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeLeft > 0)
    {
        //start the timer for the first user input
        //using flag to not call the function again and again for other inputs
        if(!flag)
        {
            timer = setInterval(() => {
                if(timeLeft > 0)
                {
                    timeLeft--;
                    timerTag.innerText = timeLeft;
                }
                else
                {
                    clearInterval(timer);
                }
            },1000);
            flag = 1;
        }

        //if user pressed back space or not typed any character
        if(typedCharacter == null)
        {
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect"))
            {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
        }
        else
        {
            if(characters[charIndex].innerText === typedCharacter)
            {
                characters[charIndex].classList.add("correct");
            }
            else
            {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        //assuming 4 letters as one word and calculating wpm
        let wpm = Math.round(((charIndex - mistakes)  / 4) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        characters.forEach((span) => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    }
    else
    {
        input.value = "";
        clearInterval(timer);
    }
});

tryAgainButton.addEventListener("click",() => {
    randomParagraph();
    timeLeft = maxTime;
    charIndex = mistakes = flag = 0;
    timerTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    input.value = "";
    clearInterval(timer);
});