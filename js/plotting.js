// import 'babel-polyfill';

const plotButton = document.getElementById('plotting-button');
const dashboardLogo = document.getElementById('dashboard-logo');
const closePlotModalButton = document.querySelector("#plottingModal > div > div > div.modal-footer > button.btn.btn-secondary")
const chartElement = document.getElementById('chart-div');
const loadingElement = document.getElementById('loading-element');

 function clearDashboardLogo() {
    dashboardLogo.style.display = "none";
}

function closePlottingModal() {
    closePlotModalButton.click();
}


function plotChart() {
    google.load("visualization", "1", { packages: ["corechart"] });
    google.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['X', 'Points', 'Line','Line'],
            ["17-18", 3.5, 5,10],
            ["18-19", 5.5, 5,10],
            ["19-20", 5, 5,10],
            ["20-21", 7, 5,10]
        ]);

        var options = {
            title: 'Scatter Chart with a line',
            hAxis: { title: 'X', minValue: 0, maxValue: 15 },
            vAxis: { title: 'Y', minValue: 0, maxValue: 15 },
            legend: 'none',
            interpolateNulls: true,
            series: {
                1: { lineWidth: 1, pointSize: 0 },
                2:  { lineWidth: 1, pointSize: 0 }
            },
            width: '100%',
            height: '100%',
            backgroundColor: { fill: 'transparent' }
        };

        chartElement.style.display = "flex";

        var chart = new google.visualization.ScatterChart(chartElement);
        chart.draw(data, options);
        
        
    }
}


function clearLoadingElement() {
    loadingElement.style.display = "none";
}


function displayLoadingAnimation() {
    loadingElement.style.display = "inline-block";
    setTimeout(()=>{
    clearLoadingElement()
    }, 3000);
}

// I'll either have to use .then sytax or set up a webpack environment
function plotTrasition() {
    clearDashboardLogo();
    closePlottingModal();
    // displayLoadingAnimation();
    plotChart();
}


plotButton.addEventListener('click', () => {
    plotTrasition();
});



//<div class = "modal fade show" id ="plottingModal" tabindex = "-1" role = "dialog" 
// aria-labelledby="plottingModal" style="display: block; aria-modal="true">  </div >

//<div class = "modal fade " id ="plottingModal" tabindex = "-1" role = "dialog" 
// aria-labelledby="plottingModal" style="display: none; aria-modal="true">  </div >


//


// import * as plt from "./plotModal.js";
// import * as inp from "./inputModal.js";




// window.addEventListener("load", () => {
//     loadInputAcademicTermTag();
//     loadPlotSloSelector();
//     loadInputSloSelector();
    
    
// });

// //plot 
// modalPlotSloSelector.addEventListener('change', () => {
//     let selectedSlo= modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
//     let MeasureUrl = `https://visualization-practice-api.herokuapp.com/measure/${selectedSlo}`;

//         plt.clearPlotMeasureSelector();
//         plt.clearPlotStartDateSelector();
//         plt.clearPlotEndDateSelector();
//         plt.modalPlotMeasureDescriptionContainer.style.display = "none";
 
    

//     axios.get(MeasureUrl).then(response => {

//         if (response.status ) {
//             let count = 1;
//             console.log("measure loaded")
//             for (let measure of response.data) {
//                 if (measure != "description") {
//                     let tempOption = document.createElement('option');
//                     tempOption.value = count;
//                     tempOption.textContent = measure;
//                     count += 1;
//                     plt.modalPlotMeasureSelector.appendChild(tempOption);
//                 }
//                 plt.modalPlotMeasureSelector.selectedIndex = 0;
//             }

//             plt.loadSloDescriptionSlo(selectedSlo);
            
//         }
//     });
// });

// //plot
// modalPlotMeasureSelector.addEventListener('change',() => {
//     plt.clearPlotStartDateSelector();
//     plt.clearPlotEndDateSelector()
//     let selectedMeasure = plt.modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

//     if (selectedMeasure != "Choose Measure") {
       
//         let selectedSlo = plt.modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
   
//         console.log(selectedMeasure)
//         let startDatesUrl = `https://visualization-practice-api.herokuapp.com/dates/${selectedSlo}/${selectedMeasure}`;

        
//        axios.get(startDatesUrl).then(response => {
//             if (response.status) {
//                 let count = 1;
//                 console.log("start date loader")
//                 for (let date of response.data) {
//                     let tempOption = document.createElement('option');
//                     tempOption.value = count;
//                     tempOption.textContent = date;
//                     count += 1;
//                     plt.modalPlotStartDateSelector.appendChild(tempOption);
//                 }

//             }

//        });
        
//         plt.loadMeasureDescriptionSlo(selectedSlo, selectedMeasure)
//     }
// });



// //plot
// modalPlotStartDateSelector.addEventListener('change', () => {
//     plt.clearPlotEndDateSelector()
//     let selectedStartDate = modalPlotStartDateSelector.options[modalPlotStartDateSelector.selectedIndex].textContent;
    
    
//     if (selectedStartDate != "Choose Start Date") { 
        
//         let selectedSlo = plt.modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
//         let selectedMeasure = plt.modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

//         let endDatesUrl = `https://visualization-practice-api.herokuapp.com/startdate/${selectedSlo}/${selectedMeasure}?start=${selectedStartDate}`;

//         axios.get(endDatesUrl).then(response => {
//             let count = 1;
//             console.log("end date loader")
//             for (let date of response.data) {
//                 let tempOption = document.createElement('option');
//                 tempOption.value = count;
//                 tempOption.textContent = date;
//                 count += 1;
//                 plt.modalPlotEndDateSelector.appendChild(tempOption);
//             }
//         });
//     }
// });




// //input
// studentPecentageCheckSwitch.addEventListener('change', () => {
//     if (studentPecentageCheckSwitch.checked) {
//         numberOfStudentsContainer.style.display = "none";
//         numberOfStudentsMetContainer.style.display = "none";
//         percentageOfStudentsContainer.style.display = "flex";
//     }
//     else {
//         numberOfStudentsContainer.style.display = "flex";
//         numberOfStudentsMetContainer.style.display = "flex";
//         percentageOfStudentsContainer.style.display = "none";

//     }
// });


// //input
// modalInputSloSelector.addEventListener('change',() => {
//     inp.clearInputMeasureSelector();
//     inp.clearInputTargetSelector();
//     modalInputMeasureDescriptionContainer.style.display = "none";

//    let selectedSlo = inp.modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;

//     if (selectedSlo != "Choose SLO") {

//         let MeasureUrl = `https://visualization-practice-api.herokuapp.com/measure/${selectedSlo}`;

//         axios.get(MeasureUrl).then(response => {
//             let count = 1;
//             console.log("measure loaded")
//             for (let measure of response.data) {
//                 if (measure != "description") {
//                     let tempOption = document.createElement('option');
//                     tempOption.value = count;
//                     tempOption.textContent = measure;
//                     count += 1;
//                     inp.modalInputMeasureSelector.appendChild(tempOption);
//                 }
//             }
//                 inp.modalInputMeasureSelector.selectedIndex = 0;
//                 inp.modalInputSloDescriptionContainer.style.display = "flex";
//                 inp.loadSloDescriptionData(selectedSlo)
//         });
//     }
// });



// //input
// modalInputMeasureSelector.addEventListener('change',() => {

//     inp.clearInputTargetSelector();
//     // modalInputMeasureDescriptionContainer.style.display = "none";

//     let selectedSlo = inp.modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;
//     let selectedMeasure = inp.modalInputMeasureSelector.options[modalInputMeasureSelector.selectedIndex].textContent;
    

//     if (selectedMeasure!= "Choose Measure") {
//         console.log("target changed")
//         let MeasureUrl = `https://visualization-practice-api.herokuapp.com/targets/${selectedSlo}/${selectedMeasure}`;

//         axios.get(MeasureUrl).then(response => {
//             let count = 1;
//             console.log("measure loaded")
//             for (let target of response.data) {
//                 if (target != "description") {
//                     let tempOption = document.createElement('option');
//                     tempOption.value = count;
//                     tempOption.textContent = target;
//                     count += 1;
//                     inp.modalInputTargetSelector.appendChild(tempOption);
//                 }
//             }
           
//         });
//         inp.modalInputTargetSelector.selectedIndex = 0;
//         inp.modalInputMeasureDescriptionContainer.style.display = "flex";
//         inp.loadMeasureDescriptionData(selectedSlo, selectedMeasure)
//     }
// });



// const allSloURL = 'https://visualization-practice-api.herokuapp.com/slo/all';


// //plotmodal
// const modalPlotSloSelector = document.getElementById('SLO-selector-plt');
// const modalPlotMeasureSelector = document.getElementById('measure-selector-plt');
// const modalPlotStartDateSelector = document.getElementById('start-selector-plt');
// const modalPlotEndDateSelector = document.getElementById('end-selector-plt');

// const modalPlotSloDescriptionContainer = document.getElementById('description-container-SLO-plt');

// const modalPlotSloDescriptionTextbox = document.getElementById('modal-SLO-description-plt');

// const modalPlotMeasureDescriptionContainer = document.getElementById('description-container-measure-plt');

// const modalPlotMeasureDescriptionTextbox = document.getElementById('modal-measure-description-plt');












//input modal

// const studentPecentageCheckSwitch = document.getElementById('flexSwitchStudentPercentageCheck');
// const numberOfStudentsContainer = document.getElementById('number-of-students-container');
// const numberOfStudentsMetContainer = document.getElementById('number-of-students-met-container');
// const percentageOfStudentsContainer = document.getElementById('percentage-of-students-met-container');

// const modalInputSloSelector = document.getElementById('SLO-selector-data');
// const modalInputMeasureSelector = document.getElementById('measure-selector-data');
// const modalInputAcademicTermTag = document.getElementById('current-academic-year-tag');
// const modalInputTargetSelector = document.getElementById('SLO-selector-target');

// const modalInputSloDescriptionContainer = document.getElementById('modal-SLO-description-data');
// const modalInputMeasureDescriptionContainer = document.getElementById('modal-measure-description-data');


// const modalInputSloDescriptionTextBox = document.getElementById('modal-SLO-description-data');
// const moadalInputMeasureDescriptionTextbox = document.getElementById('modal-measure-description-data');

// //input
// studentPecentageCheckSwitch.addEventListener('change', () => {
//     if (studentPecentageCheckSwitch.checked) {
//         numberOfStudentsContainer.style.display = "none";
//         numberOfStudentsMetContainer.style.display = "none";
//         percentageOfStudentsContainer.style.display = "flex";
//     }
//     else {
//         numberOfStudentsContainer.style.display = "flex";
//         numberOfStudentsMetContainer.style.display = "flex";
//         percentageOfStudentsContainer.style.display = "none";

//     }
// });




// //input
// function getCurrentSchoolTerm(){
//   const date = new Date();
//   const MAY = 5;
//   let currentMonth = date.getMonth();
//   let currentYear = date.getFullYear();

//   if(currentMonth < MAY){
    
//     let startYear = currentYear-1;
//     let endYear = currentYear;
    
//     startYear = startYear.toString();
//     endYear = endYear.toString();

//     startYear = startYear.slice(2,4);
//     endYear = endYear.slice(2,4);

//     return `${startYear}-${endYear}`; 
//   }
//   else{
    
//     let startYear = currentYear;
//     let endYear = currentYear+1;
    
//     startYear = startYear.toString();
//     endYear = endYear.toString();

//     startYear = startYear.slice(2,4);
//     endYear = endYear.slice(2,4);

//     return `${startYear}-${endYear}`;
//   }
// }


// //plot
// function loadPlotSloSelector() {
//     axios.get(allSloURL).then(response => {
//         let count = 1;
//         for (let slo of response.data) {
//             let tempOption = document.createElement('option');
//             tempOption.value = count;
//             tempOption.textContent = slo;
//             count += 1;
//             modalPlotSloSelector.appendChild(tempOption);
//         }
//     });
// }



// //input
// function loadInputSloSelector() {

//     axios.get(allSloURL).then(response => {
//         let count = 1;
//         for (let slo of response.data) {
//             let tempOption = document.createElement('option');
//             tempOption.value = count;
//             tempOption.textContent = slo;
//             count += 1;
//             modalInputSloSelector.appendChild(tempOption);
//         }
//     });
// }


// //input
// function loadInputAcademicTermTag() {
//     modalInputAcademicTermTag.textContent = getCurrentSchoolTerm(); 
//     console.log("loaded!!")
// }

// //plot
// function clearPlotMeasureSelector() {
//     modalPlotMeasureSelector.textContent = null;
//     let tempOption = document.createElement('option');
//     tempOption.value = 0;
//     tempOption.textContent = "Choose Measure";
//     modalPlotMeasureSelector.appendChild(tempOption);
// }

// //plot
// function clearPlotStartDateSelector() {
//     modalPlotStartDateSelector.textContent = null;
//     let tempOption = document.createElement('option');
//     tempOption.value = 0;
//     tempOption.textContent = "Choose Start Date";
//      modalPlotStartDateSelector.appendChild(tempOption);
// }

// //plot
// function clearPlotEndDateSelector() {
//     modalPlotEndDateSelector.textContent = null;
//     let tempOption = document.createElement('option');
//     tempOption.value = 0;
//     tempOption.textContent = "Choose End Date";
//     modalPlotEndDateSelector.appendChild(tempOption);
// }

// //input
// function clearInputMeasureSelector() {
//     modalInputMeasureSelector.textContent = null;
//     let tempOption = document.createElement('option');
//     tempOption.value = 0;
//     tempOption.textContent = "Choose Measure";
//     modalInputMeasureSelector.appendChild(tempOption);
// }

// //input
// function clearInputTargetSelector() {
//     modalInputTargetSelector.textContent = null;
//     let tempOption = document.createElement('option');
//     tempOption.value = 0;
//     tempOption.textContent = "Choose Target";
//     modalInputTargetSelector.appendChild(tempOption);
// }



//where window event handler was 
    

// //plot
// modalPlotSloSelector.addEventListener('change', () => {
//     let selectedSlo= modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
//     let MeasureUrl = `https://visualization-practice-api.herokuapp.com/measure/${selectedSlo}`;

//         clearPlotMeasureSelector();
//         clearPlotStartDateSelector();
//         clearPlotEndDateSelector();
//         modalPlotMeasureDescriptionContainer.style.display = "none";
 
    

//     axios.get(MeasureUrl).then(response => {

//         if (response.status ) {
//             let count = 1;
//             console.log("measure loaded")
//             for (let measure of response.data) {
//                 if (measure != "description") {
//                     let tempOption = document.createElement('option');
//                     tempOption.value = count;
//                     tempOption.textContent = measure;
//                     count += 1;
//                     modalPlotMeasureSelector.appendChild(tempOption);
//                 }
//                 modalPlotMeasureSelector.selectedIndex = 0;
//             }

//             loadSloDescriptionSlo(selectedSlo);
//         }
//     });
// });


// //plot
// function loadSloDescriptionSlo(selectedSlo) {
//     let sloDescriptionUrl = `https://visualization-practice-api.herokuapp.com/slo/description/${selectedSlo}`;

//                 axios.get(sloDescriptionUrl).then(response => { 
//                     console.log(response.data)
//                     modalPlotSloDescriptionTextbox.value = "";
//                     modalPlotSloDescriptionTextbox.value = "SLO Description: " + response.data;
//                     modalPlotSloDescriptionTextbox.style.height = "auto";
//                     modalPlotSloDescriptionContainer.style.display = "flex";
//                 });
// }


// //input
// function loadSloDescriptionData(selectedSlo) { 
//     let sloDescriptionUrl = `https://visualization-practice-api.herokuapp.com/slo/description/${selectedSlo}`;

//                 axios.get(sloDescriptionUrl).then(response => { 
//                     console.log(response.data)
//                     modalInputSloDescriptionTextBox.value = "";
//                     modalInputSloDescriptionTextBox.value = "SLO Description: " + response.data;
//                     modalInputSloDescriptionTextBox.style.height = "auto";
//                     modalInputSloDescriptionContainer.style.display = "flex";
//                 });

// }


// //plot
// function loadMeasureDescriptionSlo(selectedSlo,selectedMeasure) {
//     let measureDescriptionUrl = `https://visualization-practice-api.herokuapp.com/measure/description/${selectedSlo}/${selectedMeasure}`;

//               axios.get(measureDescriptionUrl).then(response => { 
//                   console.log(response.data)
//                   modalPlotMeasureDescriptionTextbox.value = "";
//                   modalPlotMeasureDescriptionTextbox.value = "Measure Description: " + response.data;
//                   modalPlotMeasureDescriptionTextbox.style.height = "auto";
//                   modalPlotMeasureDescriptionContainer.style.display = "flex";

//                 });
// }


// //input
// function loadMeasureDescriptionData(selectedSlo, selectedMeasure) {
//      let measureDescriptionUrl = `https://visualization-practice-api.herokuapp.com/measure/description/${selectedSlo}/${selectedMeasure}`;

//     axios.get(measureDescriptionUrl).then(response => { 
//         console.log(response.data)
//         moadalInputMeasureDescriptionTextbox.value = "";
//         moadalInputMeasureDescriptionTextbox.value = "Measure Description: " + response.data;
//         moadalInputMeasureDescriptionTextbox.style.height = "auto";
//         modalInputMeasureDescriptionContainer.style.display = "flex";
//     });

// }

// //plot
// modalPlotMeasureSelector.addEventListener('change',() => {
//     clearPlotStartDateSelector();
//     clearPlotEndDateSelector()
//     let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

//     if (selectedMeasure != "Choose Measure") {
       
//         let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
   
//         console.log(selectedMeasure)
//         let startDatesUrl = `https://visualization-practice-api.herokuapp.com/dates/${selectedSlo}/${selectedMeasure}`;

        
//        axios.get(startDatesUrl).then(response => {
//             if (response.status) {
//                 let count = 1;
//                 console.log("start date loader")
//                 for (let date of response.data) {
//                     let tempOption = document.createElement('option');
//                     tempOption.value = count;
//                     tempOption.textContent = date;
//                     count += 1;
//                     modalPlotStartDateSelector.appendChild(tempOption);
//                 }

//             }

//        });
        
//         loadMeasureDescriptionSlo(selectedSlo, selectedMeasure)
//     }
// });



// //plot
// modalPlotStartDateSelector.addEventListener('change', () => {
//     clearPlotEndDateSelector()
//     let selectedStartDate = modalPlotStartDateSelector.options[modalPlotStartDateSelector.selectedIndex].textContent;
    
    
//     if (selectedStartDate != "Choose Start Date") { 
        
//         let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
//         let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

//         let endDatesUrl = `https://visualization-practice-api.herokuapp.com/startdate/${selectedSlo}/${selectedMeasure}?start=${selectedStartDate}`;

//         axios.get(endDatesUrl).then(response => {
//             let count = 1;
//             console.log("end date loader")
//             for (let date of response.data) {
//                 let tempOption = document.createElement('option');
//                 tempOption.value = count;
//                 tempOption.textContent = date;
//                 count += 1;
//                 modalPlotEndDateSelector.appendChild(tempOption);
//             }
//         });

//     }


// });


// //input
// modalInputSloSelector.addEventListener('change',() => {
//     clearInputMeasureSelector();
//     clearInputTargetSelector();
//     modalInputMeasureDescriptionContainer.style.display = "none";

//    let selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;

//     if (selectedSlo != "Choose SLO") {

//         let MeasureUrl = `https://visualization-practice-api.herokuapp.com/measure/${selectedSlo}`;

//         axios.get(MeasureUrl).then(response => {
//             let count = 1;
//             console.log("measure loaded")
//             for (let measure of response.data) {
//                 if (measure != "description") {
//                     let tempOption = document.createElement('option');
//                     tempOption.value = count;
//                     tempOption.textContent = measure;
//                     count += 1;
//                     modalInputMeasureSelector.appendChild(tempOption);
//                 }
//             }
//                 modalInputMeasureSelector.selectedIndex = 0;
//                 modalInputSloDescriptionContainer.style.display = "flex";
//                 loadSloDescriptionData(selectedSlo)
//         });
//     }
// });


// //input
// modalInputMeasureSelector.addEventListener('change',() => {

//     clearInputTargetSelector();
//     // modalInputMeasureDescriptionContainer.style.display = "none";

//     let selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;
//     let selectedMeasure = modalInputMeasureSelector.options[modalInputMeasureSelector.selectedIndex].textContent;
    

//     if (selectedMeasure!= "Choose Measure") {
//         console.log("target changed")
//         let MeasureUrl = `https://visualization-practice-api.herokuapp.com/targets/${selectedSlo}/${selectedMeasure}`;

//         axios.get(MeasureUrl).then(response => {
//             let count = 1;
//             console.log("measure loaded")
//             for (let target of response.data) {
//                 if (target != "description") {
//                     let tempOption = document.createElement('option');
//                     tempOption.value = count;
//                     tempOption.textContent = target;
//                     count += 1;
//                     modalInputTargetSelector.appendChild(tempOption);
//                 }
//             }
           
//         });
//         modalInputTargetSelector.selectedIndex = 0;
//         modalInputMeasureDescriptionContainer.style.display = "flex";
//         loadMeasureDescriptionData(selectedSlo, selectedMeasure)
//     }
// });








