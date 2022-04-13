import { loadingElement, clearloadingElement, displayLoadingAnimation, dashboardLogo, hideDashboardLogo } from '/js/plotting.js'

import {clearInputSloSelector,clearInputMeasureSelector,clearInputTargetSelector,loadInputSloSelector} from '/js/inputModal.js';


const saveButton = document.getElementById('data-input-button');
const closeInputModalButton = document.querySelector("#dataInputModal > div > div > div.modal-footer > button.btn.btn-secondary");
// const dashboardLogo = document.getElementById('dashboard-logo');

const sloSelectorInputModal = document.querySelector("#SLO-selector-data");
const measureSelectorInputModal = document.querySelector("#measure-selector-data");
const targetSelectorInputModal = document.querySelector("#SLO-selector-target");


const targetAmountInputField = document.querySelector("#student-target-input");
const numberOfStudentsInputField = document.querySelector("#number-of-students-input");
const numberOfStudentsMetTargetInputField = document.querySelector("#number-of-students-met-input");
const percentageOfStudentsMetTargetInputField = document.querySelector("#percentage-of-students-met-input");
const resultTextBoxInputField = document.querySelector("#result-texbox");


const confirmationMessageArea = document.querySelector("#confirmation-message-area");




const inputFields = {
    sloSelector: sloSelectorInputModal,
    measureSelector: measureSelectorInputModal,
    targetSlector: targetSelectorInputModal,
    targetAmountElement: targetAmountInputField,
    numberOfStudentsElement: numberOfStudentsInputField,
    numberOfStudentsMetTargetElement: numberOfStudentsMetTargetInputField,
    percentageOfStudentMeTargetElement: percentageOfStudentsMetTargetInputField,
    resultTextBoxElement:resultTextBoxInputField
}

//CHOOSE MEASURE SHOULD CLOSE TARGET 


// write thing to clear all input 

// function clearInputSectors(inputFields) {
//     const selectors = [
//         inputFields.sloSelector,
//         inputFields.measureSelector,
//         inputFields.targetSlector
//     ];
    
//     for (let selector of selectors) {

//         selector.options.selectedIndex[0];

//     }
// }


function clearSelectorOptions() {
    clearInputSloSelector();
    clearInputMeasureSelector();
    clearInputTargetSelector();
}

function clearAllInputFieldData(inputFields) {
    const targetAmountInputField = inputFields.targetAmountElement;
    const numberOfStudentsInputField = inputFields.numberOfStudentsElement
    const numberOfStudentsMetTargetInputField = inputFields.numberOfStudentsMetTargetElement;
    const percentageOfStudentsMetTargetInputField = inputFields.percentageOfStudentMeTargetElement;
    const resultInputField = inputFields.resultTextBoxElement;

    targetAmountInputField.value = '';
    numberOfStudentsInputField.value = '';
    numberOfStudentsMetTargetInputField.value = '';
    percentageOfStudentsMetTargetInputField.value = '';
    resultInputField.value = '';
    
}

function clearInputModalData(inputFields) {
    
    clearSelectorOptions();
    clearAllInputFieldData(inputFields);
    
}


function revealDashboardLogo() {
    setTimeout(() => {
        dashboardLogo.style.display = "block";

    },2000)
    
}


function revealConfirmationMessageArea() {
    setTimeout(() => {
        confirmationMessageArea.style.display = "grid"; 
    },2300)
    
}

function hideConfirmationMessageArea() {

        confirmationMessageArea.style.display = "none";

}



function hideUnselectedSelectorError(selector) {

    if (selector == null) return null;

    selector.style.borderColor = "#0d6efd";

    const parentNode = selector.parentElement;
    const unfilledErrorContainer = parentNode.children[1];

    unfilledErrorContainer.style.display = "none";
    
}



function hideUnfilledTextFieldError(selector) {

    if (selector == null) return null;

    selector.style.borderColor = "#0d6efd";

    const parentNode = selector.parentElement;
    const unfilledErrorContainer = parentNode.children[2];

    unfilledErrorContainer.style.display = "none";
    
}



function hideInvalidTextFieldError(selector) {

     if (selector == null) return null;

    selector.style.borderColor = "#0d6efd";

    const parentNode = selector.parentElement;

    const invalidErrorContainer = parentNode.children[3];

    invalidErrorContainer.style.display = "none";
}



function resetErrorDisplays(inputFields) {

    // const unfilledSelectors = getAllUnfilledSelectors(inputFields);
    const unfilledTextFields = getAllUnfilledTextFields(inputFields);
    const invalidInputFields = getAllInvalidInputFields(inputFields);
    

    // unfilledSelectors.forEach(hideUnselectedSelectorError);
    unfilledTextFields.forEach(hideUnfilledTextFieldError);
    invalidInputFields.forEach(hideInvalidTextFieldError);
    
}


function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}



function clearDashboardLogo(dashboardLogoElement) {
   dashboardLogoElement.style.display = "none";
}



function closeInputModal(closeButton) {
    closeButton.click();
    
}



function isBetweenInclusiveValues(number, lower, upper) {
    if (number >= lower && number <= upper) return true;

    return false;
}



function numericInputIsValid(text) {

    if (isNumeric(text) && isBetweenInclusiveValues(text, 0, 100)) {
       return true; 
    }

    return false;
}





 //need to error check
function getTargetAmount(targetAmountInputField) {
   
    return targetAmountInputField.value; 

}


 //need to error check
function getNumberOfStudents(numberOfStudentsInputField) {

    return numberOfStudentsInputField.value;

}


 //need to error check
function getNumberOfStudentsMetTarget(numberOfStudentsMetTargetInputField){

    return numberOfStudentsMetTargetInputField.value;

}

function getPercentageOfStudentsMetTarget(percentageOfStudentsMetTargetInputField){

    return percentageOfStudentsMetTargetInputField.value;

}


 //need to error check
function getResult(resultTextBox){

    return resultTextBox.value;
}




function allInputSelectorsSelected(inputFields) {

    const sloSelectorInputModal = inputFields.sloSelector;
    const measureSelectorInputModal = inputFields.measureSelector;
    const targetSelectorInputModal = inputFields.targetSlector;

    const defaultSloSelectorValue = sloSelectorInputModal.options[0].text;
    const defaultMeasureSelectorValue = measureSelectorInputModal.options[0].text;
    const defaultTargetSelectorValue = targetSelectorInputModal.options[0].text;
    const currentSloSelectorValue = sloSelectorInputModal.options[sloSelectorInputModal.selectedIndex].text;
    const currentMeasureSelectorValue = measureSelectorInputModal.options[measureSelectorInputModal.selectedIndex].text;
    const currentTargetSelectorValue = targetSelectorInputModal.options[targetSelectorInputModal.selectedIndex].text;
    
    if (defaultSloSelectorValue == currentSloSelectorValue ||
        defaultMeasureSelectorValue == currentMeasureSelectorValue || defaultTargetSelectorValue == currentTargetSelectorValue) {
        
        return false;
    }

    return true;
}


function isEmptyString(string) {
    const emptyString = "";

    if (string == emptyString || string.trim() == emptyString) {
        return true;
    }

    return false;
}



//change this to is valid
function allInputFieldsHasValidInput(inputFields) {

    const targetAmountInputField = inputFields.targetAmountElement;
    const numberOfStudentsInputField = inputFields.numberOfStudentsElement
    const numberOfStudentsMetTargetInputField = inputFields.numberOfStudentsMetTargetElement;
    const percentageOfStudentsMetTargetInputField = inputFields.percentageOfStudentMeTargetElement;
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");

    if (togglepercentageStudentsMetButtton.checked == false) {

        if (numericInputIsValid(targetAmountInputField.value) &&
            numericInputIsValid(numberOfStudentsInputField.value) &&
            numericInputIsValid(numberOfStudentsMetTargetInputField.value)) { return true; }
    
    }
    else {

        if (numericInputIsValid(targetAmountInputField.value) &&
            numericInputIsValid(percentageOfStudentsMetTargetInputField.value)) { return true; }


    }


    return false;
}





// ignore all 

function allTextInputFieldsFilled(inputFields) {
    const targetAmountInputField = inputFields.targetAmountElement;
    const numberOfStudentsInputField = inputFields.numberOfStudentsElement
    const numberOfStudentsMetTargetInputField = inputFields.numberOfStudentsMetTargetElement;
    const percentageOfStudentsMetTargetInputField = inputFields.percentageOfStudentMeTargetElement;
    const resultInputField = inputFields.resultTextBoxElement;
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");
    

    if (togglepercentageStudentsMetButtton.checked == false) {
        
    
        if (isEmptyString(targetAmountInputField.value) ||
            isEmptyString(numberOfStudentsInputField.value) ||
            isEmptyString(numberOfStudentsMetTargetInputField.value) ||
            isEmptyString(resultInputField.value)) {
        
            return false;
        }

    }
    else {

        if (isEmptyString(targetAmountInputField.value) ||
            isEmptyString(percentageOfStudentsMetTargetInputField.value) ||
            isEmptyString(resultInputField.value)) {
        
            return false;
        }
        
    }

    
    return true;
}



function allInputFieldsFilled(inputFields) {

    if (allInputSelectorsSelected(inputFields) && allTextInputFieldsFilled(inputFields)) return true;

    return false;
}




function getAllUnfilledSelectors(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const unfilledInputFields = [];
    
    const inputSelectors = [
        inputFields.sloSelector,
        inputFields.measureSelector,
        inputFields.targetSlector
    ];

    for (let currSelector of inputSelectors) {
        const defaultSelectorValue = currSelector.options[0].text;
        const selectorValue = currSelector.options[currSelector.selectedIndex].text;
            
        if (defaultSelectorValue == selectorValue) {
            unfilledInputFields.push(currSelector);
        }

    }

    return unfilledInputFields;
}


function getAllFilledSelectors(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const filledInputFields = [];
    
    const inputSelectors = [
        inputFields.sloSelector,
        inputFields.measureSelector,
        inputFields.targetSlector
    ];

    for (let currSelector of inputSelectors) {
        const defaultSelectorValue = currSelector.options[0].text;
        const selectorValue = currSelector.options[currSelector.selectedIndex].text;
            
        if (defaultSelectorValue != selectorValue) {
            filledInputFields.push(currSelector);
        }

    }

    return filledInputFields;
}



function getAllUnfilledTextFields(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const unfilledInputFields = [];
    const emptyString = "";
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");
    // const resultInputField = inputFields.resultTextBoxElement;
    
    const inputTextFields = (togglepercentageStudentsMetButtton.checked == false) ? [
        inputFields.targetAmountElement,
        inputFields.numberOfStudentsElement,
        inputFields.numberOfStudentsMetTargetElement,
        inputFields.resultTextBoxElement
    ] : [
        inputFields.targetAmountElement,
        inputFields.percentageOfStudentMeTargetElement,
        inputFields.resultTextBoxElement
    ];





    for (let currTextField of inputTextFields) {
            console.log(currTextField)
            const currTextFieldValue = currTextField.value;

        if (currTextFieldValue == emptyString || currTextFieldValue.trim() == emptyString) {
            
            unfilledInputFields.push(currTextField);

        }   
    }



    return unfilledInputFields;
}


function getAllFilledTextFields(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const filledInputFields = [];
    const emptyString = "";
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");
    // const resultInputField = inputFields.resultTextBoxElement;
    
    const inputTextFields = (togglepercentageStudentsMetButtton.checked == false) ? [
        inputFields.targetAmountElement,
        inputFields.numberOfStudentsElement,
        inputFields.numberOfStudentsMetTargetElement,
        inputFields.resultTextBoxElement
    ] : [
        inputFields.targetAmountElement,
        inputFields.percentageOfStudentMeTargetElement,
        inputFields.resultTextBoxElement
    ];





    for (let currTextField of inputTextFields) {
            console.log(currTextField)
            const currTextFieldValue = currTextField.value;

        if (currTextFieldValue != emptyString || currTextFieldValue.trim() != emptyString) {
            
            filledInputFields.push(currTextField);

        }   
    }



    return filledInputFields;
}


function revealUnselectedSelectorError(selector) {

    if (selector == null) return null;

    selector.style.borderColor = "#dc3545";

    const parentNode = selector.parentElement;
    const unfilledErrorContainer = parentNode.children[1];

    unfilledErrorContainer.style.display = "flex";

}


function revealUnfilledInputFieldError(inputField) {
    
    if (inputField == null) return null;

    inputField.style.borderColor = "#dc3545";

    const parentNode = inputField.parentElement;
    const unfilledErrorContainer = parentNode.children[2];

    unfilledErrorContainer.style.display = "flex";

}





function showErrorUnfilledInputFields(inputFields) {

    const unfilledSelectors = getAllUnfilledSelectors(inputFields);
    const unfilledTextFields = getAllUnfilledTextFields(inputFields);


    unfilledSelectors.forEach(revealUnselectedSelectorError);
    unfilledTextFields.forEach(revealUnfilledInputFieldError);
}



function hideErrorUnfilledInputFields(inputFields) {
    
    // const filledSelectors = getAllFilledSelectors(inputFields);
    const filledTextFields = getAllFilledTextFields(inputFields);

    
    // filledSelectors.forEach(hideUnselectedSelectorError);
    filledTextFields.forEach(hideUnfilledTextFieldError);

}

function hideErrorInvalidInputFields(inputFields) {
    
    const invalidInputFields = getAllValidInputFields(inputFields);

    invalidInputFields.forEach(hideInvalidTextFieldError);
    
}






function getAllInvalidInputFields(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const invalidInputFields = [];
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");
    
    const numericTextFields = (togglepercentageStudentsMetButtton.checked == false) ? [
        inputFields.targetAmountElement,
        inputFields.numberOfStudentsElement,
        inputFields.numberOfStudentsMetTargetElement,
    ] : [
        inputFields.targetAmountElement,
        inputFields.percentageOfStudentMeTargetElement,

    ];

//        inputFields.resultTextBoxElement

    for (let currNumericTextField of numericTextFields) {

        const currNumericTextFieldValue = currNumericTextField.value;

        if (!isEmptyString(currNumericTextFieldValue)) {

            if (!numericInputIsValid(currNumericTextFieldValue)) {

                invalidInputFields.push(currNumericTextField);
            }
            
        }

    }

    return invalidInputFields;

}


function getAllValidInputFields(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const validInputFields = [];
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");
    
    const numericTextFields = (togglepercentageStudentsMetButtton.checked == false) ? [
        inputFields.targetAmountElement,
        inputFields.numberOfStudentsElement,
        inputFields.numberOfStudentsMetTargetElement,
    ] : [
        inputFields.targetAmountElement,
        inputFields.percentageOfStudentMeTargetElement,

    ];

//        inputFields.resultTextBoxElement

    for (let currNumericTextField of numericTextFields) {

        const currNumericTextFieldValue = currNumericTextField.value;

        if (!isEmptyString(currNumericTextFieldValue)) {

            if (numericInputIsValid(currNumericTextFieldValue)) {

                validInputFields.push(currNumericTextField);
            }
            
        }

    }

    return validInputFields;

}



function revealInvalidInputFields(inputField) {

    if (inputField == null) return null;

    inputField.style.borderColor = "#dc3545";

    const parentNode = inputField.parentElement;

    const invalidErrorContainer = parentNode.children[3];

    invalidErrorContainer.style.display = "flex";

}



function showErrorInvalidInputFields(inputFields) {

    const invalidInputFields = getAllInvalidInputFields(inputFields);
    invalidInputFields.forEach(revealInvalidInputFields);

}


//1 remeber we have to create confirmation modal
//2 remmeber we have to toggle error message on and off , so making a fucntion for that makes sense
// if we could pass that function and array of the unfilled and/or invalid input fields to then
//togggle the error messages that would be great.
//seperating them would also make the most sense , so one for unfilled and one for invalid




function saveTransition(inputFields) {

    // console.log(`All inputt fields filled value ${allInputFieldsFilled(inputFields)}`)
    // console.log(`All inputt fields valid input value ${allInputFieldsHasValidInput(inputFields)}`)

}







closeInputModalButton.addEventListener("click", () => {
    resetErrorDisplays(inputFields);
    closeInputModal(closeInputModalButton);
    clearInputModalData(inputFields);
    
});









saveButton.addEventListener("click", async () => {
    // clearDashboardLogo(dashboardLogo);
    // closeInputModal(closeInputModalButton);
    // have to make a confirmation modal pop up

    if (allInputFieldsFilled(inputFields) && allInputFieldsHasValidInput(inputFields))  {
        console.log("Save Stuff, cause everything is valid!");
        await closeInputModal(closeInputModalButton);
        await hideDashboardLogo();
        await displayLoadingAnimation();
        await revealConfirmationMessageArea();

        setTimeout(async () => {
            await hideConfirmationMessageArea();
            await displayLoadingAnimation();
            await revealDashboardLogo();
            await clearInputModalData(inputFields);
            await loadInputSloSelector();
        }, 5200);
       
    
        
        //save based on diffrerent criteria. 
        // 1. Save a t1  (add a new t1, if they are not exsisting)
        // 2. edit either t1 or t2 if they are exsisting
        // 3. add a new t2 (there is an exisiting t1 but no t2)

    }
    else {

        hideErrorUnfilledInputFields(inputFields);
        hideErrorInvalidInputFields(inputFields);
        showErrorUnfilledInputFields(inputFields);
        showErrorInvalidInputFields(inputFields);
        

    }       

    // saveTransition(inputFields);
    //showErrorUnfilledInputFields(inputFields);
    // showErrorInvalidInputFields(inputFields);
});