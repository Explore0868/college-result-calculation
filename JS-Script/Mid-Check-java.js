const calcRadios = document.querySelectorAll("input[name='examType']");
const inputsDiv = document.getElementById("inputsHolder");
const checkBtn = document.getElementById("checkBtn");
const resultText = document.getElementById("result");
const saveBtn = document.getElementById("saveBtn");
const recordList = document.getElementById("recordList");
const uniqueIdInput = document.getElementById("uniqueId");
const clearAllBtn = document.getElementById("clearAll");
const addInput=document.getElementById("add-input");
const removeInput=document.getElementById("remove-input");

let currentResult = "0";
let radioResult="average";


/* 🔹 Change structure based on radio */
calcRadios.forEach(radio => {
    radio.addEventListener("change", () => {
        inputsDiv.innerHTML = "";
        if (radio.value === "average") {
            radioResult="average";
            inputsDiv.innerHTML = `
                <input type="number" placeholder="Mid 1">
                <input type="number" placeholder="Mid 2">
            `;
        }
        else if(radio.value === "external"){
            radioResult="external";
            inputsDiv.innerHTML = `
                <input type="number" placeholder="external 1">
                <input type="number" placeholder="external 2">
            `;
        }
        else if(radio.value === "internal"){
            radioResult="internal";
            inputsDiv.innerHTML=`
            <input type="number" placeholder="internal 1">
            <input type="number" placeholder="internal 2">`;
        }
        else{
            radioResult="direct";
            inputsDiv.innerHTML=`
            <input type="number" placeholder="Enter value">`;
        }
         addInput.style.display=removeInput.style.display=radioResult==="direct"? addRemove():addAdded();
    });
});

function addRemove(){
    checkBtn.style.width="calc(100% - 20px)";
            return "none";
}

function addAdded(){
   addInput.style.width="calc(100% - 68% )";
   checkBtn.style.width="calc(100% - 68% )";
    return "inline-block";
}
/* 🔹 Check Button */
checkBtn.addEventListener("click", () => {
    const inputs = inputsDiv.querySelectorAll("input");
    const values = [...inputs].map(i => Number(i.value));
    if (values.some(isNaN)) {
        alert("Enter valid numbers");
        return;
    }

    const type = document.querySelector("input[name='examType']:checked").value;

    if (type === "direct") {
      //checking the average calculation
       currentResult = `Value: ${values[0]}`;
        
    } else {
      //Because their is only one input
       const avg = values.reduce((a,b)=>a+b,0)/values.length;
    currentResult = `Average: ${avg}`;
    }
  resultText.textContent = currentResult;
});

addInput.addEventListener("click",()=>{
    let total_input=inputsDiv.querySelectorAll("input").length;
    inputsDiv.innerHTML +=`<input type="number" placeholder="${(
        radioResult==="average"? "Mid":radioResult)} ${total_input+1}
    ">`+" ";
})

/* 🔹 Remove Input Button */
removeInput.addEventListener("click",()=>{
    if(inputsDiv.children.length===0){
        alert("No more input to remove");
        return ;
    }

    inputsDiv.lastElementChild.remove();
});

/* 🔹 Save Button */
saveBtn.addEventListener("click", () => {
    const id = uniqueIdInput.value.trim();
    if (!id || !currentResult) {
        alert("Enter ID and calculate result");
        return;
    }

    const record = { id, result: currentResult,radioType:(radioResult==="average"? "Mid":radioResult) };
    const data = JSON.parse(localStorage.getItem("records")) || [];
    data.push(record);
    localStorage.setItem("records", JSON.stringify(data));

    loadRecords();
});

/* 🔹 Load records on refresh */
function loadRecords() {
    recordList.innerHTML = "";
    const data = JSON.parse(localStorage.getItem("records")) || [];

    data.forEach((rec, index) => {
        const li = document.createElement("li");
        let valueOfResult=` ${rec.id} → ${rec.result}   Of   [${rec.radioType} Exam]`;
        
        li.textContent=valueOfResult;

        /* Right Click Delete */
        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            if (confirm("Delete this record?")) {
                data.splice(index, 1);
                localStorage.setItem("records", JSON.stringify(data));
                loadRecords();
            }
        });

        recordList.appendChild(li);
    });
}

loadRecords();

/* 🔹 Clear All */
clearAllBtn.addEventListener("click", () => {
    localStorage.removeItem("records");
    loadRecords();
});

