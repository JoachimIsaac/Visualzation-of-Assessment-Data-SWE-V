
const allSloURL = 'https://visualization-practice-api.herokuapp.com/slo/all';


const studentPecentageCheckSwitch = document.getElementById('flexSwitchStudentPercentageCheck');
const numberOfStudentsContainer = document.getElementById('number-of-students-container');
const numberOfStudentsMetContainer = document.getElementById('number-of-students-met-container');
const percentageOfStudentsContainer = document.getElementById('percentage-of-students-met-container');

const modalInputSloSelector = document.getElementById('SLO-selector-data');
const modalInputMeasureSelector = document.getElementById('measure-selector-data');
const modalInputAcademicTermTag = document.getElementById('current-academic-year-tag');
const modalInputTargetSelector = document.getElementById('SLO-selector-target');

const modalInputSloDescriptionContainer = document.getElementById('modal-SLO-description-data');
const modalInputMeasureDescriptionContainer = document.getElementById('modal-measure-description-data');
const modalInputSloDescriptionTextBox = document.getElementById('modal-SLO-description-data');
const moadalInputMeasureDescriptionTextbox = document.getElementById('modal-measure-description-data');




studentPecentageCheckSwitch.addEventListener('change', () => {
    if (studentPecentageCheckSwitch.checked) {
        numberOfStudentsContainer.style.display = "none";
        numberOfStudentsMetContainer.style.display = "none";
        percentageOfStudentsContainer.style.display = "flex";
    }
    else {
        numberOfStudentsContainer.style.display = "flex";
        numberOfStudentsMetContainer.style.display = "flex";
        percentageOfStudentsContainer.style.display = "none";

    }
});



function getCurrentSchoolTerm(){
  const date = new Date();
  const MAY = 5;
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();

  if(currentMonth < MAY){
    
    let startYear = currentYear-1;
    let endYear = currentYear;
    
    startYear = startYear.toString();
    endYear = endYear.toString();

    startYear = startYear.slice(2,4);
    endYear = endYear.slice(2,4);

    return `${startYear}-${endYear}`; 
  }
  else{
    
    let startYear = currentYear;
    let endYear = currentYear+1;
    
    startYear = startYear.toString();
    endYear = endYear.toString();

    startYear = startYear.slice(2,4);
    endYear = endYear.slice(2,4);

    return `${startYear}-${endYear}`;
  }
}



function loadInputSloSelector() {

    axios.get(allSloURL).then(response => {
        let count = 1;
        for (let slo of response.data) {
            let tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.textContent = slo;
            count += 1;
            modalInputSloSelector.appendChild(tempOption);
        }
    });
}


function loadInputAcademicTermTag() {
    modalInputAcademicTermTag.textContent = getCurrentSchoolTerm(); 
    console.log("loaded!!")
}



function clearInputMeasureSelector() {
    modalInputMeasureSelector.textContent = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Measure";
    modalInputMeasureSelector.appendChild(tempOption);
}



function clearInputTargetSelector() {
    modalInputTargetSelector.textContent = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Target";
    modalInputTargetSelector.appendChild(tempOption);
}



function loadSloDescriptionData(selectedSlo) { 
    let sloDescriptionUrl = `https://visualization-practice-api.herokuapp.com/slo/description/${selectedSlo}`;

                axios.get(sloDescriptionUrl).then(response => { 
                    console.log(response.data)
                    modalInputSloDescriptionTextBox.value = "";
                    modalInputSloDescriptionTextBox.value = "SLO Description: " + response.data;
                    modalInputSloDescriptionTextBox.style.height = "auto";
                    modalInputSloDescriptionContainer.style.display = "flex";
                });

}


function loadMeasureDescriptionData(selectedSlo, selectedMeasure) {
     let measureDescriptionUrl = `https://visualization-practice-api.herokuapp.com/measure/description/${selectedSlo}/${selectedMeasure}`;

    axios.get(measureDescriptionUrl).then(response => { 
        console.log(response.data)
        moadalInputMeasureDescriptionTextbox.value = "";
        moadalInputMeasureDescriptionTextbox.value = "Measure Description: " + response.data;
        moadalInputMeasureDescriptionTextbox.style.height = "auto";
        modalInputMeasureDescriptionContainer.style.display = "flex";
    });

}


modalInputSloSelector.addEventListener('change',() => {
    clearInputMeasureSelector();
    clearInputTargetSelector();
    modalInputMeasureDescriptionContainer.style.display = "none";

   let selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;

    if (selectedSlo != "Choose SLO") {

        let MeasureUrl = `https://visualization-practice-api.herokuapp.com/measure/${selectedSlo}`;

        axios.get(MeasureUrl).then(response => {
            let count = 1;
            console.log("measure loaded")
            for (let measure of response.data) {
                if (measure != "description") {
                    let tempOption = document.createElement('option');
                    tempOption.value = count;
                    tempOption.textContent = measure;
                    count += 1;
                    modalInputMeasureSelector.appendChild(tempOption);
                }
            }
                modalInputMeasureSelector.selectedIndex = 0;
                modalInputSloDescriptionContainer.style.display = "flex";
                loadSloDescriptionData(selectedSlo)
        });
    }
});


modalInputMeasureSelector.addEventListener('change',() => {

    clearInputTargetSelector();
    // modalInputMeasureDescriptionContainer.style.display = "none";

    let selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;
    let selectedMeasure = modalInputMeasureSelector.options[modalInputMeasureSelector.selectedIndex].textContent;
    

    if (selectedMeasure!= "Choose Measure") {
        console.log("target changed")
        let MeasureUrl = `https://visualization-practice-api.herokuapp.com/targets/${selectedSlo}/${selectedMeasure}`;

        axios.get(MeasureUrl).then(response => {
            let count = 1;
            console.log("measure loaded")
            for (let target of response.data) {
                if (target != "description") {
                    let tempOption = document.createElement('option');
                    tempOption.value = count;
                    tempOption.textContent = target;
                    count += 1;
                    modalInputTargetSelector.appendChild(tempOption);
                }
            }
           
        });
        modalInputTargetSelector.selectedIndex = 0;
        modalInputMeasureDescriptionContainer.style.display = "flex";
        loadMeasureDescriptionData(selectedSlo, selectedMeasure)
    }
});


window.addEventListener("load", function () {
  loadInputAcademicTermTag();
  loadInputSloSelector();
});