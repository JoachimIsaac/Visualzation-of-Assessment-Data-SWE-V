const allSloURL = 'https://visualization-practice-api.herokuapp.com/slo/all';


////////////////////////////////Plot modalSelector elements////////////////////////
const modalPlotSloSelector = document.getElementById('SLO-selector-plt');
const modalPlotMeasureSelector = document.getElementById('measure-selector-plt');
const modalPlotStartDateSelector = document.getElementById('start-selector-plt');
const modalPlotEndDateSelector = document.getElementById('end-selector-plt');
///////////////////////////////////////////////////////////////////////////////////


//////////////////////SLO description textbox & textbox container//////////////////
const modalPlotSloDescriptionContainer = document.getElementById('description-container-SLO-plt');
const modalPlotSloDescriptionTextbox = document.getElementById('modal-SLO-description-plt');
///////////////////////////////////////////////////////////////////////////////////


////////////////////Measure description textbox & textbox container////////////////
const modalPlotMeasureDescriptionContainer = document.getElementById('description-container-measure-plt');
const modalPlotMeasureDescriptionTextbox = document.getElementById('modal-measure-description-plt');
///////////////////////////////////////////////////////////////////////////////////



function addOptionToSelectorElement(contents, count, selectorElement) {
    
    let tempOption = document.createElement('option');
    tempOption.value = count;
    tempOption.textContent = contents;
    
    selectorElement.appendChild(tempOption);

}


//Loads Selector with all current SLO Values.
function loadSloSelector(allSloURL) {

    axios.get(allSloURL).then(response => {

        const slos = response.data;
        let count = 1;

        slos.forEach((slo) => {

            addOptionToSelectorElement(slo, count, modalPlotSloSelector);
            count += 1;  

        });

    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });

}




function loadMeasureSelector(measureUrl) {

    axios.get(measureUrl).then(response => {

        if (response.status) {

            let count = 1;
            const measures = response.data;

            measures.forEach((measure) => {
                
                if (measure != "description") {

                    addOptionToSelectorElement(measure, count, modalPlotMeasureSelector);
                    count += 1;
                }

            });

            modalPlotMeasureSelector.selectedIndex = 0;
        }
    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });
}



function loadStartDateSelector(startDatesUrl) {

    axios.get(startDatesUrl).then(response => {
           
        if (response.status) {
                
            let count = 1;
            const dates = response.data;

            dates.forEach((date) => {
                    
                addOptionToSelectorElement(date, count, modalPlotStartDateSelector);
                count += 1;

            });
            
        }

    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });
}



function loadEndDateSelector(endDatesUrl) {
    
    axios.get(endDatesUrl).then(response => {

        let count = 1;
        const dates = response.data;

        dates.forEach((date) => {

            addOptionToSelectorElement(date, count, modalPlotEndDateSelector);
            count += 1;
            
        });

    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });

}



//Loads SLO description textbox.
function loadSloDescriptionSlo(selectedSlo) {

    let sloDescriptionUrl = `https://visualization-practice-api.herokuapp.com/slo/description/${selectedSlo}`;

    axios.get(sloDescriptionUrl).then(response => { 

        modalPlotSloDescriptionTextbox.value = `SLO Description: ${response.data}`;
        modalPlotSloDescriptionTextbox.style.height = "auto";
        modalPlotSloDescriptionContainer.style.display = "flex";
        
    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });
    
}



//Loads Measure Description textbox
function loadMeasureDescriptionSlo(selectedSlo, selectedMeasure) {
    
    let measureDescriptionUrl = `https://visualization-practice-api.herokuapp.com/measure/description/${selectedSlo}/${selectedMeasure}`;

  
    axios.get(measureDescriptionUrl).then(response => {
            
        modalPlotMeasureDescriptionTextbox.value = `Measure Description: ${response.data}`;
        modalPlotMeasureDescriptionTextbox.style.height = "auto";
        modalPlotMeasureDescriptionContainer.style.display = "flex";

    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });
 
}





//Clears Measure selector and adds default option "Choose Measure".
function clearPlotMeasureSelector(modalPlotMeasureSelector) {

    modalPlotMeasureSelector.textContent = null;

    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Measure";
    tempOption.disabled = true;

    modalPlotMeasureSelector.appendChild(tempOption);
}



//Clears Start Date selector and adds default option "Start Date".
function clearPlotStartDateSelector(modalPlotStartDateSelector) {

    modalPlotStartDateSelector.textContent = null;

    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Start Date";

    modalPlotStartDateSelector.appendChild(tempOption);
}



//Clears End Date selector and adds default option "End Date".
function clearPlotEndDateSelector(modalPlotEndDateSelector) {

    modalPlotEndDateSelector.textContent = null;

    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose End Date";
   
    modalPlotEndDateSelector.appendChild(tempOption);
}







//Plot modal SLO selector event listener.
modalPlotSloSelector.addEventListener('change', () => {

    const currentSelectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;

    const measureUrl = `https://visualization-practice-api.herokuapp.com/measure/${currentSelectedSlo}`;

    clearPlotMeasureSelector(modalPlotMeasureSelector);
    clearPlotStartDateSelector(modalPlotStartDateSelector);
    clearPlotEndDateSelector(modalPlotEndDateSelector);
    
    modalPlotMeasureDescriptionContainer.style.display = "none";

    loadMeasureSelector(measureUrl);
    loadSloDescriptionSlo(currentSelectedSlo);
});





//Plot modal measure selector event listener.
modalPlotMeasureSelector.addEventListener('change', () => {
    
    clearPlotStartDateSelector(modalPlotStartDateSelector);
    clearPlotEndDateSelector(modalPlotEndDateSelector);

    const selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

    if (selectedMeasure != "Choose Measure") {
       
        const currentSelectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
   
        const startDatesUrl = `https://visualization-practice-api.herokuapp.com/dates/${currentSelectedSlo}/${selectedMeasure}`;

        //Make a get start date function?
       
        loadStartDateSelector(startDatesUrl);
        loadMeasureDescriptionSlo(currentSelectedSlo, selectedMeasure);
        
    }

});



//Plot modal start date selector event listener.
modalPlotStartDateSelector.addEventListener('change', () => {

    clearPlotEndDateSelector(modalPlotEndDateSelector);

    const selectedStartDate = modalPlotStartDateSelector.options[modalPlotStartDateSelector.selectedIndex].textContent;
    
    
    if (selectedStartDate != "Choose Start Date") { 
        
        const currentSelectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;

        const selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

        const endDatesUrl = `https://visualization-practice-api.herokuapp.com/startdate/${currentSelectedSlo}/${selectedMeasure}?start=${selectedStartDate}`;

        //make a load end date selector
        loadEndDateSelector(endDatesUrl);
       
    }
});



//Window onLoad event listener
window.addEventListener("load", () => {

    loadSloSelector(allSloURL);

});



//test
//Gets the response for 400 type errors 
function getErrorResponse400(code) {

    let message = '';
    
    if (code < 400 || code > 500) {
        return message;
    }
    else if (code == 400) {
        message = `400 Bad Request – client sent an invalid request, such as lacking required request body or parameter`;
    }
    else if (code == 401) {
        message = `401 Unauthorized – client failed to authenticate with the server`;
    }
    else if (code == 403) {
        message = `403 Forbidden – client authenticated but does not have permission to access the requested resource`;
    }
    else if (code == 404) {
        message = `404 Not Found – the requested resource does not exist`;
    }
    else if (code == 412) {
        message = `412 Precondition Failed – one or more conditions in the request header fields evaluated to false`;
    }
    
    return message;
}



//test
function getErrorResponse500(code) {
    
    let message = '';
    
    if (code < 500 || code > 600) {
        return message;
    }
    else if (code == 500) {

        message = `500 Internal Server Error – a generic error occurred on the server`;

    }
    else if (coder == 503) {
        
        message = `503 Service Unavailable – the requested service is not available`;

    }

    return message;

}



function isValid400Error(code) {

    if ((code == 400) || (code == 401) || (code == 403) || (code == 404) || (code == 412)) {
        return true;
    }
   
    return false;
}


//test
function isValid500Error(code) {
    
    if ((code == 500) || (coder == 503)) {
        
        return true;
    }

    return false 
}



//test
function alertUserOnApiCallError(status, genericMessage) {
    
    if (isValid400Error(status)) {
            const message400 = getErrorResponse400(status);
            alert(message400);
        }
        else if (isValid500Error(status)) {
            const message500 = getErrorResponse500(status);
            alert(message500);
        }
        else {
            alert(`${genericMessage}`);
    }

}