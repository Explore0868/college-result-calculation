
const optionButton=document.getElementById("sideOptions");
const mobileOptionsContainer=document.getElementById("mobileOptionsContainer");
const formulaParent=document.getElementById("formulaContainer");
const formulaMiddle=document.getElementById("imageHolder");

optionButton.addEventListener("click",()=>{
    mobileOptionsContainer.classList.toggle("mobileOptionsContainerClass1");
});


function handleOutsideInteraction(event) {
  if (!mobileOptionsContainer.contains(event.target)) {
    mobileOptionsContainer.classList.remove("mobileOptionsContainerClass1");
  }
}
document.addEventListener("click",(event)=>{
if(!optionButton.contains(event.target)) {handleOutsideInteraction(event);assignMiddlePosition();};
});


    function assignMiddlePosition() {
        const parentRect = formulaParent.getBoundingClientRect();
        const childRect = formulaMiddle.getBoundingClientRect();

        const childCenter =
            childRect.left - parentRect.left +
            childRect.width / 2;

        formulaParent.scrollLeft = childCenter - parentRect.width / 2;
    }

const img = document.getElementById("mainPicture");

const emojis = ["❤️", "🤖", "🦁", "😍", "👏", "😎", "✨"];

img.addEventListener("click", function(e) {

  // pick random emoji
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.innerText = randomEmoji;

  document.body.appendChild(emoji);

  // make it follow cursor
    emoji.style.left = e.pageX + "px";
    emoji.style.top = e.pageY + "px";
  
  // remove after 1 second
  setTimeout(() => {
    document.removeEventListener("mousemove", moveEmoji);
    emoji.remove();
  }, 1000);
});
    window.onload = assignMiddlePosition;

