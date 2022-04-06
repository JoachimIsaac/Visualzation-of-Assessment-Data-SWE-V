const allSloURL = 'https://visualization-practice-api.herokuapp.com/slo/all';



const modalPlotSloSelector = document.getElementById('SLO-selector-plt');
const modalPlotMeasureSelector = document.getElementById('measure-selector-plt');
const modalPlotStartDateSelector = document.getElementById('start-selector-plt');
const modalPlotEndDateSelector = document.getElementById('end-selector-plt');

const modalPlotSloDescriptionContainer = document.getElementById('description-container-SLO-plt');
const modalPlotSloDescriptionTextbox = document.getElementById('modal-SLO-description-plt');
const modalPlotMeasureDescriptionContainer = document.getElementById('description-container-measure-plt');
const modalPlotMeasureDescriptionTextbox = document.getElementById('modal-measure-description-plt');



function clearPlotMeasureSelector() {
    modalPlotMeasureSelector.textContent = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Measure";
    tempOption.disabled = true;
    modalPlotMeasureSelector.appendChild(tempOption);
}


function loadPlotSloSelector() {
    axios.get(allSloURL).then(response => {
        let count = 1;
        for (let slo of response.data) {
            let tempOption = document.createElement('option');
            tempOption.value = count;
            tempOption.textContent = slo;
            count += 1;
            modalPlotSloSelector.appendChild(tempOption);
        }
    });
}


function clearPlotStartDateSelector() {
    modalPlotStartDateSelector.textContent = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Start Date";

     modalPlotStartDateSelector.appendChild(tempOption);
}


function clearPlotEndDateSelector() {
    modalPlotEndDateSelector.textContent = null;
    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose End Date";
   
    modalPlotEndDateSelector.appendChild(tempOption);
}



modalPlotSloSelector.addEventListener('change', () => {
    let selectedSlo= modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
    let MeasureUrl = `https://visualization-practice-api.herokuapp.com/measure/${selectedSlo}`;

        clearPlotMeasureSelector();
        clearPlotStartDateSelector();
        clearPlotEndDateSelector();
        modalPlotMeasureDescriptionContainer.style.display = "none";
 
    

    axios.get(MeasureUrl).then(response => {

        if (response.status ) {
            let count = 1;
            console.log("measure loaded")
            for (let measure of response.data) {
                if (measure != "description") {
                    let tempOption = document.createElement('option');
                    tempOption.value = count;
                    tempOption.textContent = measure;
                    count += 1;
                    modalPlotMeasureSelector.appendChild(tempOption);
                }
                modalPlotMeasureSelector.selectedIndex = 0;
            }

            loadSloDescriptionSlo(selectedSlo);
        }
    });
});



function loadSloDescriptionSlo(selectedSlo) {
    let sloDescriptionUrl = `https://visualization-practice-api.herokuapp.com/slo/description/${selectedSlo}`;

                axios.get(sloDescriptionUrl).then(response => { 
                    console.log(response.data)
                    modalPlotSloDescriptionTextbox.value = "";
                    modalPlotSloDescriptionTextbox.value = "SLO Description: " + response.data;
                    modalPlotSloDescriptionTextbox.style.height = "auto";
                    modalPlotSloDescriptionContainer.style.display = "flex";
                });
}


function loadMeasureDescriptionSlo(selectedSlo,selectedMeasure) {
    let measureDescriptionUrl = `https://visualization-practice-api.herokuapp.com/measure/description/${selectedSlo}/${selectedMeasure}`;

              axios.get(measureDescriptionUrl).then(response => { 
                  console.log(response.data)
                  modalPlotMeasureDescriptionTextbox.value = "";
                  modalPlotMeasureDescriptionTextbox.value = "Measure Description: " + response.data;
                  modalPlotMeasureDescriptionTextbox.style.height = "auto";
                  modalPlotMeasureDescriptionContainer.style.display = "flex";

                });
}



modalPlotMeasureSelector.addEventListener('change',() => {
    clearPlotStartDateSelector();
    clearPlotEndDateSelector()
    let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

    if (selectedMeasure != "Choose Measure") {
       
        let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
   
        console.log(selectedMeasure)
        let startDatesUrl = `https://visualization-practice-api.herokuapp.com/dates/${selectedSlo}/${selectedMeasure}`;

        
       axios.get(startDatesUrl).then(response => {
            if (response.status) {
                let count = 1;
                console.log("start date loader")
                for (let date of response.data) {
                    let tempOption = document.createElement('option');
                    tempOption.value = count;
                    tempOption.textContent = date;
                    count += 1;
                    modalPlotStartDateSelector.appendChild(tempOption);
                }

            }

       });
        
        loadMeasureDescriptionSlo(selectedSlo, selectedMeasure)
    }
});




modalPlotStartDateSelector.addEventListener('change', () => {
    clearPlotEndDateSelector()
    let selectedStartDate = modalPlotStartDateSelector.options[modalPlotStartDateSelector.selectedIndex].textContent;
    
    
    if (selectedStartDate != "Choose Start Date") { 
        
        let selectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
        let selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

        let endDatesUrl = `https://visualization-practice-api.herokuapp.com/startdate/${selectedSlo}/${selectedMeasure}?start=${selectedStartDate}`;

        axios.get(endDatesUrl).then(response => {
            let count = 1;
            console.log("end date loader")
            for (let date of response.data) {
                let tempOption = document.createElement('option');
                tempOption.value = count;
                tempOption.textContent = date;
                count += 1;
                modalPlotEndDateSelector.appendChild(tempOption);
            }
        });
    }
});



window.addEventListener("load", () => {
    loadPlotSloSelector();
});

