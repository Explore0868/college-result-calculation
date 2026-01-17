const selectorBtn=document.querySelector(".sideOptionsClass2");
const selMenu=document.querySelector(".selector-menu");
const addInput=document.getElementById("addInput");
const check=document.getElementById("check");
const save=document.getElementById("save");
const clearAll=document.getElementById("clear-all");

/* ================= MENU ================= */
selectorBtn.addEventListener("click",()=>{
    const m=document.getElementById("menu");
    m.style.display=m.style.display==="block"?"none":"block";
});
/* ================= ADD SUBJECT ================= */
let creditEnabled=false;
let CGPA=false;
let ScgpaNotvisible=false;

function addSubject(){
    const div=document.createElement("div");
    const divStyle=document.getElementById("subjectInputs");
    div.className="subject-row";
    let htmlPart='<div class="line-complete">--------#-#--------</div>';
    if(ScgpaNotvisible) div.innerHTML=`<input type="number" placeholder="SCGPA "></input>`;
    else{
    div.innerHTML=`
        ${divStyle.innerHTML===""? "":htmlPart}
        <input placeholder="Subject Name">
        <input type="number" placeholder="Mid Mark">
        <input type="number" placeholder="Sem Mark">
        ${creditEnabled?'<input type="number" placeholder="Credit">':""}
    `;
    }

    divStyle.appendChild(div);

}

addInput.addEventListener("click",addSubject);

/* ================= CHECK RESULT ================= */
check.addEventListener("click",()=>{

    const uid=document.getElementById("uid").value;
    const qualify=Number(document.getElementById("qualifyMark").value);

    if (!uid ) {
        alert("Enter ID and calculate result");
        return;
    }

    if( (qualify<=0 || !qualify) && !ScgpaNotvisible ){
        alert("Invalid Qualification Mark");
        return ;
    }

    if(ScgpaNotvisible){
        const rows=document.querySelectorAll(".subject-row");
        let sum=0;let Numberof=0;
        rows.forEach(div=>{
            let value=div.querySelector("input").value;
            sum+=parseFloat(value);
            Numberof+=1;
        })
        const result=sum/Numberof;
        if(!uid) uid="xyz";
        let box=document.getElementById("savedData");
        box.innerHTML +=`<h3>${uid} → CGPA → ${result}</h3>`;
        return ;
    }


    const rows=document.querySelectorAll(".subject-row");
    const totalBody=document.getElementById("totalTable");
    const gradeBody=document.getElementById("gradeTable");
    totalBody.innerHTML="";
    gradeBody.innerHTML="";

    let subjectMarks=[];
    let creditValues=[];
    let gradePoints=[];

    rows.forEach(r=>{
        const inputs=r.querySelectorAll("input");
        let subject=inputs[0].value;
        const mid=Number(inputs[1].value);
        const sem=Number(inputs[2].value);
        const total=mid+sem;

        if(!subject) subject="xyz";

        subjectMarks.push(total);
        if(creditEnabled) {
            let credit=Number(inputs[3].value);
            credit=(credit===0 || credit < 0)? 1:credit;
            creditValues.push(credit);
        }

        totalBody.innerHTML+=`<tr><td>${subject}</td><td>${total}</td></tr>`;

        let grade="Fail";

        if(total>=qualify){
            if(total>=91) {grade="O";gradePoints.push(Number(10))}
            else if(total>=81) { grade="A+"; gradePoints.push(Number(9))}
            else if(total>=71) {grade="A";gradePoints.push(Number(8));}
            else if(total>=61) {grade="B+";gradePoints.push(Number(7));}
            else if(total>=51) {grade="B";gradePoints.push(Number(6));}
            else if(total>=41) {grade="C+";gradePoints.push(Number(5));}
        }
        // even one subject Failed No CGPA allocated
        if(grade==="Fail") CGPA=true;

        gradeBody.innerHTML+=`
        <tr><td>${subject}</td>
        <td><span style='color:${grade=="Fail"? "red":"darkgreen"}'>${grade}</span></td></tr>`;
    });

    cgpaCalculator(gradePoints,creditValues);
})

/* ================= CGPA FUNCTION ================= */
function cgpaCalculator(gradePoints,creditValues){
    let finalCGPA=document.getElementById("cgpaDisplay");
    let totalCredit=document.getElementById("creditMark")
    let totalSum=0;
    // CGPA CALCULATION

    if(!creditEnabled){
        finalCGPA.innerHTML="CGPA: Select Credit for cgpa ";
        return ;
    }

    if(( !totalCredit.value || totalCredit.value <=0 ) && creditEnabled) {
        alert("Invalid Total Credits ");
        return ;
    }

    if(CGPA) { 
        CGPA=false;
        finalCGPA.innerHTML="CGPA: --- ";
        return ;
    }
    console.log(gradePoints,creditValues);
    gradePoints.forEach((grade,index)=>{
        console.log(creditValues[index],grade);
        totalSum+=grade*creditValues[index];
    })
    let cgpaValue=totalSum/totalCredit.value;
    finalCGPA.innerText=`CGPA: ${cgpaValue}`;
}

/* ================= SAVE ================= */
save.addEventListener("click",()=>{
    let uid=document.getElementById("uid").value;
    const cgpa=document.getElementById("cgpaDisplay").innerText;
    const box=document.getElementById("savedData");

    box.innerHTML+=`<div>${uid} → ${cgpa}</div>`;
})

/* ================= CLEAR ================= */
clearAll.addEventListener("click",()=>{
    document.getElementById("savedData").innerHTML="";
    document.getElementById("totalTable").innerHTML="";
    document.getElementById("gradeTable").innerHTML="";
})

/* ================= OPTIONS ================= */

document.querySelector(".input-row").children[2].style.display="none";

selMenu.children[0].addEventListener("click",()=>{
    ScgpaNotvisible=true;
    document.querySelector(".flex").style.display="none";
    document.getElementById("save").style.display="none";
    document.querySelector(".input-row").children[1].style.display="none";
    document.querySelector(".input-row").children[2].style.display="none";
    document.getElementById("subjectInputs").innerHTML="";
    for(i=0;i<3;i++) addSubject();
})
selMenu.children[1].addEventListener("click",()=>{
    creditEnabled=true;
    ScgpaNotvisible=false;
    document.querySelector(".flex").style.display="flex";
    document.getElementById("save").style.display="block";
    document.querySelector(".input-row").children[1].style.display="block";
    document.querySelector(".input-row").children[2].style.display="block";
    document.getElementById("subjectInputs").innerHTML="";
    for(i=0;i<3;i++) addSubject();   
})