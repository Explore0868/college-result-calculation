
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

    window.onload = assignMiddlePosition;
