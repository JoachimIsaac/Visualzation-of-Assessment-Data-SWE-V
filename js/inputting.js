
const saveButton = document.getElementById('data-input-button');
const closeInputModalButton = document.querySelector("#dataInputModal > div > div > div.modal-footer > button.btn.btn-secondary");
const dashboardLogo = document.getElementById('dashboard-logo');

const sloSelectorInputModal = document.querySelector("#SLO-selector-data");
const measureSelectorInputModal = document.querySelector("#measure-selector-data");
const targetSelectorInputModal = document.querySelector("#SLO-selector-target");


const targetAmountInputField = document.querySelector("#student-target-input");
const numberOfStudentsInputField = document.querySelector("#number-of-students-input");
const numberOfStudentsMetTargetInputField = document.querySelector("#number-of-students-met-input");
const percentageOfStudentsMetTargetInputField = document.querySelector("#percentage-of-students-met-input");
const resultTextBoxInputField = document.querySelector("#result-texbox");


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

// function targetAmountIsValid(targetAmountValue) {
//     if (isNumeric(targetAmountValue) && isBetweenInclusiveValues(targetAmountValue, 0, 100)) {
//        return true; 
//     }

//     return false;
// }

function numericInputIsValid(text) {

    if (isNumeric(text) && isBetweenInclusiveValues(text, 0, 100)) {
       return true; 
    }

    return false;
}


// function percentageMetIsValid(percentage) {
//     if (isNumeric(percentage) && isBetweenInclusiveValues(percentage, 0, 100)) {
//        return true; 
//     }
//     return false;
// }



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
    

    // if (targetAmountInputField == null || numberOfStudentsInputField == null || numberOfStudentsMetTargetInputField == null || percentageOfStudentsMetTargetInputField == null) {
    //     return false;
    // }
    //if toggle if off 
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


    // const resultValue = resultInputField.value;

    // if (resultValue == emptyString || resultValue .trim() == emptyString) {
    //     unfilledInputFields.push(resultInputField);
    // }


    return unfilledInputFields;
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

    //************************* */
    //iterate over them and reveal the div that says it is unfilled.
    //change some of the context of the html so that we can tell
    //which one is which so that we ccan have more descriptive erro messages
    //for the ones that need them 
    //make it so that we can find the error messagge div by using parent of and child node stuff .
    //************************* */
}




///FIX THIS 

// function allInputFieldsHasValidInput(inputFields) { 

//     if (!allNumericalInputFieldsFilled(inputFields)) return false;

//     if (resultTextBoxValue == emptyString || resultTextBox.value.trim() == emptyString || resultTextBox == null) return false;

//     return true;
// }


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
        inputFields.resultTextBoxElement
    ] : [
        inputFields.targetAmountElement,
        inputFields.percentageOfStudentMeTargetElement,
        inputFields.resultTextBoxElement
    ];



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
        //************************* */
    //iterate over them and reveal the div that says it is unfilled.
    //change some of the context of the html so that we can tell
    //which one is which so that we ccan have more descriptive erro messages
    //for the ones that need them
    //make it so that we can find the error messagge div by using parent of and child node stuff .
    //************************* */
}


//1 remeber we have to create confirmation modal
//2 remmeber we have to toggle error message on and off , so making a fucntion for that makes sense
// if we could pass that function and array of the unfilled and/or invalid input fields to then
//togggle the error messages that would be great.
//seperating them would also make the most sense , so one for unfilled and one for invalid

function saveTransition(inputFields) {

    // console.log(`All inputt fields filled value ${allInputFieldsFilled(inputFields)}`)
    // console.log(`All inputt fields valid input value ${allInputFieldsHasValidInput(inputFields)}`)

    if (allInputFieldsFilled(inputFields) && allInputFieldsHasValidInput(inputFields)) {
        // console.log("all input is valid!!!!")
        //save the values using api

    }
    else {

        showErrorUnfilledInputFields(inputFields);
        showErrorInvalidInputFields(inputFields);

    }


}





saveButton.addEventListener("click", () => {
    // clearDashboardLogo(dashboardLogo);
    // closeInputModal(closeInputModalButton);
    // have to make a confirmation modal pop up



    saveTransition(inputFields);
    //showErrorUnfilledInputFields(inputFields);
    // showErrorInvalidInputFields(inputFields);
});