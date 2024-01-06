const add = document.querySelector("#add");
const courseCode = document.querySelector("#course-code");
const internalMarks = document.querySelector("#unit-load");
const externalMarks = document.querySelector("#unit-load1");
const semister = document.querySelector("#semister");
const tbody = document.querySelector("#tbody");
const tfoot = document.querySelector("#tfoot");
const table = document.querySelector("#table");
const calcGp = document.querySelector("#calc-gp");
const clear = document.querySelector("#clear");

let gpArray = [];

// Function to determine grade based on marks
function calculateGrade(marks) {
  if (marks >= 90 && marks<=100) {
    return 'O';
  } else if (marks >= 80) {
    return 'A+';
  } else if (marks >= 70) {
    return 'A';
  } else if (marks >= 60) {
    return 'B+';
  } else if (marks >= 50) {
    return 'B';
  } else if (marks>=40) {
    return 'c';
  }else {
    return 'fail';
  }
}

add.addEventListener("click", () => {
  if (
    courseCode.value === "" ||
    internalMarks.value <= 0 ||
    externalMarks.value <= 0 ||
    semister.selectedIndex === 0
  ) {
    alert("Wrong input, check and try again");
  } else {
    const tr = document.createElement("tr");
    const tdCourseCode = document.createElement("td");
    tdCourseCode.innerHTML = courseCode.value;
    const totalMarks = parseInt(internalMarks.value) + parseInt(externalMarks.value);
    const tdTotalMarks = document.createElement("td");
    tdTotalMarks.innerHTML = totalMarks;
    const credits = totalMarks > 40 ? 'Full Credits' : '0 Credits';
    const tdCredits = document.createElement("td");
    tdCredits.innerHTML = credits;
    const grade = calculateGrade(totalMarks);
    const tdGrade = document.createElement("td");
    tdGrade.innerHTML = grade;
    tr.appendChild(tdCourseCode);
    tr.appendChild(tdTotalMarks);
    tr.appendChild(tdCredits);
    tr.appendChild(tdGrade);
    tbody.appendChild(tr);
    table.classList.remove("display-none");
    calcGp.classList.remove("display-none");
    clear.classList.remove("display-none");
    gpArray.push({
      internalMarks: internalMarks.value,
      externalMarks: externalMarks.value,
      semister: semister.options[semister.selectedIndex].text,
      grade: grade,
    });
    console.log(gpArray);
    courseCode.value = "";
    internalMarks.value = "";
    externalMarks.value = "";
    semister.selectedIndex = "0";
  }
});

// Rest of your code for the Calc GP and Clear buttons...

// Rest of your code remains the same...


calcGp.addEventListener("click", () => {
  let internalMarksTotal = 0,
    externalMarksTotal = 0;

  gpArry.forEach((result) => {
    internalMarksTotal += parseInt(result.internalMarks);
    externalMarksTotal += parseInt(result.externalMarks);
  });

  const tr = document.createElement("tr");

  tdTotalMarks = document.createElement("td");
  tdTotalMarks.innerHTML = `${internalMarks.value} (Internal) + ${externalMarks.value} (External)`;

  tdGpa = document.createElement("td");
  tdGpa.setAttribute("colspan", "4");
  tdGpa.innerHTML = `Your GPA is ${(externalMarksTotal / internalMarksTotal).toFixed(2)} `;

  tr.appendChild(tdTotalMarks);
  tr.appendChild(tdGpa);

  if (tfoot.querySelector("tr") !== null) {
    tfoot.querySelector("tr").remove();
  }
  tfoot.appendChild(tr);
});

clear.addEventListener("click", () => {
  gpArry = [];
  tbody.querySelectorAll("*").forEach((child) => child.remove());
  if (tfoot.querySelector("tr") !== null) {
    tfoot.querySelector("tr").remove();
  }

  table.classList.add("display-none");
  calcGp.classList.add("display-none");
  clear.classList.add("display-none");
});
calcGp.addEventListener("click", () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
  
    gpArray.forEach((result) => {
      const totalMarks = parseInt(result.internalMarks) + parseInt(result.externalMarks);
      const credits = totalMarks > 40 ? 1 : 0; // Assigning 1 credit for total marks > 40
  
      totalCredits += credits;
      switch (result.grade) {
        case 'S':
          totalGradePoints += 10 * credits;
          break;
        case 'A':
          totalGradePoints += 9 * credits;
          break;
        case 'B':
          totalGradePoints += 8 * credits;
          break;
        case 'C':
          totalGradePoints += 7 * credits;
          break;
        case 'D':
          totalGradePoints += 6 * credits;
          break;
        case 'F':
          totalGradePoints += 0 * credits;
          break;
        default:
          break;
      }
    });
  
    const tr = document.createElement("tr");
  
    const tdTotalUnitLoad = document.createElement("td");
    tdTotalUnitLoad.innerHTML = `Total Credits: ${totalCredits}`;
  
    const gpa = totalGradePoints * totalCredits;
    const tdGpa = document.createElement("td");
    tdGpa.setAttribute("colspan", "3");
    tdGpa.innerHTML = `Your GPA is ${gpa.toFixed(2)}`;
  
    tr.appendChild(tdTotalUnitLoad); 
    tr.appendChild(tdGpa);
  
    if (tfoot.querySelector("tr") !== null) {
      tfoot.querySelector("tr").remove();
    }
    tfoot.appendChild(tr);
  });
  