import { revealUnselectedSelectorError} from '/js/inputting.js';

const dashboardLogo = document.getElementById('dashboard-logo');
const chartContainer = document.getElementById('chart-div');
const loadingElement = document.getElementById('loading-element');



////////////////////////////////////////////////Plotting modal elements/////////////////////////////////////
const plottingModalPlotButton  = document.getElementById('plotting-button');
const plottingModalCloseButton = document.querySelector("#plottingModal > div > div > div.modal-footer > button.btn.btn-secondary");
const sloSelectorElement = document.getElementById('SLO-selector-plt');
const measureSelectorElement = document.getElementById('measure-selector-plt');
const startDateSelectorElement = document.getElementById('start-selector-plt');
const endDateSelectorElement = document.getElementById('end-selector-plt');
const plotSettingsContainer = document.getElementById('settings-container');
////////////////////////////////////////////////////////////////////////////////////////////////////////////



const inputFields = {
    sloSelector: sloSelectorElement,
    measureSelector: measureSelectorElement,
    startDateSelector: startDateSelectorElement,
    endDateSelector:endDateSelectorElement
};




////////////////////////////////////Options containers for radio butttons on plot setttings/////////////
const targetPlotOptionButtonBoth = document.querySelector("#settings-container > div.option.\\31 ");
const targetPlotOptionButtonT1 = document.querySelector("#settings-container > div.option.\\32 ");
const targetPlotOptionButtonT2 = document.querySelector("#settings-container > div.option.\\33 ");
const targetPlotColorOptionButtonT1 = document.querySelector("#settings-container > div.option.t1.color");
const targetPlotColorOptionButtonT2 = document.querySelector("#settings-container > div.option.t2.color");
/////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////// radio butttons on plot setttings//////////////////////////////////////
const targetPlotRadioButtonBoth = document.querySelector("#\\=target-radio-1");
const targetPlotRadioButtonT1 = document.querySelector("#\\=target-radio-2");
const targetPlotRadioButtonT2 = document.querySelector("#\\=target-radio-3");
const targetPlotColorRadioButtonT1 = document.querySelector("#t1-color-selector");
const targetPlotColorRadioButtonT2 = document.querySelector("#t2-color-selector");
const pointSizeSelector = document.querySelector("#point-size-selector");
const lineSizeSelector = document.querySelector("#line-size-selector");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////





const displayElements = {

    dashboardLogo: dashboardLogo,
    plottingModalCloseButton: plottingModalCloseButton,
    chartContainer: chartContainer,
    loadingElement:loadingElement,
    plotSettingsContainer: plotSettingsContainer,
    targetPlotOptionButtonBoth: targetPlotOptionButtonBoth,
    targetPlotOptionButtonT1:targetPlotOptionButtonT1,
    targetPlotOptionButtonT2: targetPlotOptionButtonT2,
    targetPlotColorOptionButtonT2: targetPlotColorOptionButtonT2,
    targetPlotRadioButtonBoth:targetPlotRadioButtonBoth

};






var chartObj; 


google.load("visualization", "1", { packages: ["corechart"] });


//Grabs all the selectors (i.e SLO, Measure) and filters them based on the ones that are selected or not and returns them  iterable.
function getAllUnslectedSelectors(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const unselectedInputSelectors = [];
    
    const inputSelectors = [
        inputFields.sloSelector,
        inputFields.measureSelector,
        inputFields.startDateSelector,
        inputFields.endDateSelector
    ];

    for (let currSelector of inputSelectors) {
        const defaultSelectorValue = currSelector.options[0].text;
        const selectorValue = currSelector.options[currSelector.selectedIndex].text;
            
        if (defaultSelectorValue == selectorValue) {
            unselectedInputSelectors.push(currSelector);
        }

    }

    return unselectedInputSelectors;
}




function hideDashboardLogo(dashboardLogo) {

    dashboardLogo.style.display = "none";

}



function closePlottingModal(plottingModalCloseButton) {

    plottingModalCloseButton.click();

}




function displayPlotSettings(plotSettingsContainer) {

    plotSettingsContainer.style.display = "flex";

}




//Returns Boolean on whether the t1 button is checked or not.
function target1RadioButtonChecked(targetPlotRadioButtonT1) {

    if (targetPlotRadioButtonT1.checked){
        return true;
    }

    return false;
    
}




//Returns a boolean on whether or not the both target button is checked.
function bothTargetsRadioButttonChecked(targetPlotRadioButtonBoth){

    if (targetPlotRadioButtonBoth.checked) {
        
        return true;

    }

    return false;

}



//Handles plotting when user selects a radio button that controls which targets should be plotted.
async function plotTransitionEditedTargets(chartContainer,loadingElement,targetPlotRadioButtonBoth,targetPlotRadioButtonT1) {

    let plotDataUrl = await generatePlotDataQueryUrl();
  

    if (chartContainer.children.length > 0) {

        await removeChartElement(chartContainer);
        
    }
     
    await displayLoadingAnimation(loadingElement);


    if (bothTargetsRadioButttonChecked(targetPlotRadioButtonBoth)) {//change to see if both radio is checked
        
        await plotChartWithBothTargets(plotDataUrl);

    }
    else {
        if (target1RadioButtonChecked(targetPlotRadioButtonT1)) {//change to see if t1 checked
           
            await plotChartBasedOnTargets(plotDataUrl, "T1");

        }
        else {
            
            await plotChartBasedOnTargets(plotDataUrl, "T2");

        }


    }

    await displayChartElement(chartContainer);
    
}







//Handles plotting when plotting both targets.
async function plotTransitionBothTargets(plotDataUrl,displayElements) {

    await hideDashboardLogo(displayElements.dashboardLogo);
   
    await closePlottingModal(displayElements.plottingModalCloseButton);
  

    if (displayElements.chartContainer.children.length > 0) {

        await removeChartElement(displayElements.chartContainer);

    }
     
    await displayLoadingAnimation(displayElements.loadingElement);

    await plotChartWithBothTargets(plotDataUrl);

    await displayChartElement(displayElements.chartContainer);

    setTimeout(() => {

        displayPlotSettings(displayElements.plotSettingsContainer);
        revealBothTargetRadioButton(displayElements.targetPlotOptionButtonBoth);
        revealTargetT1RadioButton(displayElements.targetPlotOptionButtonT1);
        revealTargetT2RadioButton(displayElements.targetPlotOptionButtonT2);
        revealTargetColorSelectorT2(displayElements.targetPlotColorOptionButtonT2);
        checkRadioButton(displayElements.targetPlotRadioButtonBoth);

    }, 2100);
    
}




//Handles plotting when there is only one target.
async function plotTransitionSingleTarget(plotDataUrl,displayElements) {
    
    await hideDashboardLogo(displayElements.dashboardLogo);
   
    await closePlottingModal(displayElements.plottingModalCloseButton);

    if (displayElements.chartContainer.children.length > 0) {

        await removeChartElement(displayElements.chartContainer);

    }

    await displayLoadingAnimation(displayElements.loadingElement);

    await plotChartBasedOnTargets(plotDataUrl, "T1");

    await displayChartElement(displayElements.chartContainer);

    setTimeout(() => {

        displayPlotSettings(displayElements.plotSettingsContainer);
        hideBothTargetRadioButton(displayElements.targetPlotOptionButtonBoth);
        hideTargetT1RadioButton(displayElements.targetPlotOptionButtonT1);
        hideT2TargetRadioButton(displayElements.targetPlotOptionButtonT2);
        hideTargetColorSelectorT2(displayElements.targetPlotColorOptionButtonT2);
        checkRadioButton(displayElements.targetPlotRadioButtonT1);
    
    }, 2100);
}



//Handles the plotting when the color of a target is changed.
async function plotTransitionEditedTargetColors(chartContainer,targetPlotRadioButtonT1,targetPlotRadioButtonBoth) {
    
    let plotDataUrl = await generatePlotDataQueryUrl();

    if (bothTargetsRadioButttonChecked(targetPlotRadioButtonBoth)) {

        await plotChartWithBothTargets(plotDataUrl);

    }
    else {
        if (target1RadioButtonChecked(targetPlotRadioButtonT1)) {

            await plotChartBasedOnTargets(plotDataUrl, "T1" );

        }
        else {

            await plotChartBasedOnTargets(plotDataUrl, "T2");
   
        }

    }

    await displayChartElement(chartContainer);
    
}



//Handles the plotting when the linesize of a target is changed.
async function plotTransitonEditedGraphLineSize(chartContainer,targetPlotRadioButtonT1,targetPlotRadioButtonBoth) {

    let plotDataUrl = await generatePlotDataQueryUrl();

    if (bothTargetsRadioButttonChecked(targetPlotRadioButtonBoth)) {

        await plotChartWithBothTargets(plotDataUrl);
       
    }
    else {
        if (target1RadioButtonChecked(targetPlotRadioButtonT1)) {

            await plotChartBasedOnTargets(plotDataUrl, "T1");
        
        }
        else {

            await plotChartBasedOnTargets(plotDataUrl, "T2");
            
        }

    }

    await displayChartElement(chartContainer);

}




//Handles the plotting when the Point size of a target is changed.
async function plotTransitionEditedGraphPointSize(chartContainer,targetPlotRadioButtonT1,targetPlotRadioButtonBoth) {

    let plotDataUrl = await generatePlotDataQueryUrl();

    if (bothTargetsRadioButttonChecked(targetPlotRadioButtonBoth)) {

        plotChartWithBothTargets(plotDataUrl);    
        
    }
    else {

        if (target1RadioButtonChecked(targetPlotRadioButtonT1)) {

            await plotChartBasedOnTargets(plotDataUrl, "T1");
     
        }
        else {

            await plotChartBasedOnTargets(plotDataUrl, "T2");
            
        }

    }

    await displayChartElement(chartContainer);

}
 



//test , need to make a dumby plot object , could get it on replit (made one previously)
//Loads a 2D array with the data needed to plot the graph for both targets.
function loadDataTableBothTargets(plotDataObj){
    
    const numberOfKeysInObj = Object.Objectkeys(plotDataObj).length;

    if (plotDataObj == null || typeof(plotDataObj) !== 'object' || numberOfKeysInObj == 0) {

        return [];

    }

   

    if (!BothTargetsPlotDataObjectHasAllValidKeys(plotDataObj)) {

        return [];

    }
   

    let result = [
      
      ['X', 'Percentage Met for T1', 'Percentage Met for T2', plotDataObj.mostRecentT1Des, plotDataObj.mostRecentT2Des]
      
    ];

    const cols = plotDataObj.dates.length;

    for (let index = 0; index < cols; index++){
      
      let rowArray = [];
      
        rowArray.push(plotDataObj.dates[index]);
        rowArray.push(plotDataObj.percentagesMetT1[index]);
        rowArray.push(plotDataObj.percentagesMetT2[index]);
        rowArray.push(plotDataObj.T1[index]);
        rowArray.push(plotDataObj.T2[index]);
        result.push(rowArray);
  }

    return result;
    
}




//test same as above
//Loads a 2D array with the data needed to plot the graph for a single target.
function loadDataTableBasedOnTargets(plotDataObj, target) {

    const numberOfKeysInObj = Object.Objectkeys(plotDataObj).length;

    if (plotDataObj == null || typeof(plotDataObj) !== 'object' || numberOfKeysInObj == 0) {

        return [];

    }

    
    if (target == "T1") {


        if (!t1TargetPlotDataObjectHasAllValidKeys(plotDatatObj)){ 

            return [];
        }
        

        let result = [
        
            ['X','Percentage Met for T1',plotDataObj.mostRecentT1Des]
    
        ];
  

        const cols = plotDataObj.dates.length; 
 
        for(let index = 0; index < cols; index++){
            
            let rowArray = [];

            rowArray.push(plotDataObj.dates[index]);
            rowArray.push(plotDataObj.percentagesMetT1[index]);
            rowArray.push(plotDataObj.T1[index]);
            result.push(rowArray);
        }
        
        return result; 
            
}
else {
        
        if (!t2TargetPlotDataObjectHasAllValidKeys(plotDatatObj)){ 

            return [];
        }
        

        let result = [

            ['X', 'Percentage Met for T2', plotDataObj.mostRecentT2Des]
            
        ];

        const cols = plotDataObj.dates.length; 

        for (let index = 0; index < cols; index++){
            
            let rowArray = [];
            
            rowArray.push(plotDataObj.dates[index]);
            rowArray.push(plotDataObj.percentagesMetT2[index]);
            rowArray.push(plotDataObj.T2[index]);
            
            result.push(rowArray);
        }


        return result;
    
    }

}




function displayChartElement(chartContainer) {

    chartContainer.style.display = "block";

}



//Removes the element that is linked with the chart  
function removeChartElement(chartContainer) {

    let child = chartContainer.children[0];

    chartContainer.removeChild(child);
    chartContainer.style.display = 'none'; 

}



function displayColorOptionT1(targetPlotColorOptionButtonT1) {

    targetPlotColorOptionButtonT1.style.display = "block";

}



function displayColorOptionT2(targetPlotColorOptionButtonT2) {

    targetPlotColorOptionButtonT2.style.display = "block";

}



function hideColorOptionT1(targetPlotColorOptionButtonT1) { 

    targetPlotColorOptionButtonT1.style.display = "none";

}



function hideColorOptionT2(targetPlotColorOptionButtonT2) { 

    targetPlotColorOptionButtonT2.style.display = "none";

}




function plotChartWithBothTargets(requestUrl) {

    let t1Color = document.querySelector("#t1-color-selector").value;
    let t2Color = document.querySelector("#t2-color-selector").value;
    let pointSize = parseInt(document.querySelector("#point-size-selector").value);
    let lineSize = parseInt(document.querySelector("#line-size-selector").value);

    setTimeout(() => {

        let plottingDataObj;
        let pickedColors = [t1Color, t2Color];

        axios.get(requestUrl).then(response => {
        
        plottingDataObj = response.data;
  
       
        google.setOnLoadCallback(drawChart);

        function drawChart() {

            let data = google.visualization.arrayToDataTable(loadDataTableBothTargets(plottingDataObj));

            let options = {
                title: plottingDataObj.title,
                hAxis: { title: 'School Term', minValue: 0, maxValue: 15 },
                vAxis: { title: 'Percentage-met', minValue: 0, maxValue: 15 },
                legend: 'none',
                interpolateNulls: true,
                pointSize: pointSize,
                colors: pickedColors,
                
                series: {
                        0:{pointShape:{type:'square'}},
                        1:{pointShape:{type:'star', sides:5,dent:0.6}},
                        2: { lineWidth: lineSize, pointSize: 0 },
                        3:  { lineWidth: lineSize, pointSize: 0 }
                    },
                    width: '100%',
                    height: '100%',
                    backgroundColor: { fill: 'transparent' },
                    legend:'right'
            };

            chartObj = new google.visualization.ScatterChart(document.getElementById('chart-div'));
            chartObj.draw(data, options);   
        }
        
    });
        
    }, 2000);
   
}




//Plots based on the target that was passed in T1 or T2 
function plotChartBasedOnTargets(requestUrl, target) {

    let t1Color = document.querySelector("#t1-color-selector").value;
    let t2Color = document.querySelector("#t2-color-selector").value;
    let pointSize = parseInt(document.querySelector("#point-size-selector").value);
    let lineSize = parseInt(document.querySelector("#line-size-selector").value);
    
    setTimeout(() => {
    
        let plottingDataObj;
        let pickedColors = target == "T1" ? [t1Color, t1Color] : [t2Color, t2Color];


    axios.get(requestUrl).then(response => {
        
        plottingDataObj = response.data;
      

        google.setOnLoadCallback(drawChartBasedOnTarget);

         function drawChartBasedOnTarget() {

            let data = google.visualization.arrayToDataTable(loadDataTableBasedOnTargets(plottingDataObj, target));
             
            let options = {
                
                title: plottingDataObj.title,
                hAxis: { title: 'School Term', minValue: 0, maxValue: 15 },
                vAxis: { title: 'Percentage-met', minValue: 0, maxValue: 15 },
                legend: 'none',
                interpolateNulls: true,
                pointSize: pointSize,
                colors: pickedColors,
                
                
                series: {
                    0:{pointShape:{type:'square'}},
                    1: { lineWidth: lineSize, pointSize: 0 }//The lines should not have points, hence why point size at zero.
                    
                },
                    width: '100%',
                    height: '100%',
                    backgroundColor: { fill: 'transparent' },
                    legend:'right'
                };

                chartObj = new google.visualization.ScatterChart(document.getElementById('chart-div'));
                chartObj.draw(data, options);   
         }
     
    });
        
    }, 2000);
}




function clearloadingElement(loadingElement) {

    loadingElement.style.display = "none";

}




function displayLoadingAnimation(loadingElement) {

    loadingElement.style.display = "block";

     setTimeout(() => {
         clearloadingElement(loadingElement);
     }, 2000);
    
}
 



//Returns an endpoint (url string) based on all the selected information. 
function generatePlotDataQueryUrl() {

    const currentSelectedSlo = sloSelectorElement.options[sloSelectorElement.selectedIndex].text;
    const currentSelectedMeasure = measureSelectorElement.options[measureSelectorElement.selectedIndex].text;
    const currentSelectedStartDate = startDateSelectorElement.options[startDateSelectorElement.selectedIndex].text;
    const currentSelectedEndDate = endDateSelectorElement.options[endDateSelectorElement.selectedIndex].text;

    const url = `https://visualization-practice-api.herokuapp.com/plot?slo=${currentSelectedSlo}&measure=${currentSelectedMeasure}&start_date=${currentSelectedStartDate}&end_date=${currentSelectedEndDate}`;

    return url;
}


 

//Return a boolean based on whether all the plotting data is selected or not. 
function allPlottingInfoIsSelected(sloSelectorElement, measureSelectorElement, startDateSelectorElement, endDateSelectorElement) {
    
    let defaultSelectedSlo = sloSelectorElement.options[0].text;
    let defaultSelectedMeasure = measureSelectorElement.options[0].text;
    let defaultSelectedStartDate = startDateSelectorElement.options[0].text;
    let defaultSelectedEndDate = endDateSelectorElement.options[0].text;

    let currentSelectedSlo = sloSelectorElement.options[sloSelectorElement.selectedIndex].text;
    let currentSelectedMeasure = measureSelectorElement.options[measureSelectorElement.selectedIndex].text;
    let currentSelectedStartDate = startDateSelectorElement.options[startDateSelectorElement.selectedIndex].text;
    let currentSelectedEndDate = endDateSelectorElement.options[endDateSelectorElement.selectedIndex].text;
    

    //All selected info is not equal to their default selections
    if (currentSelectedSlo != defaultSelectedSlo && currentSelectedMeasure != defaultSelectedMeasure && currentSelectedStartDate != defaultSelectedStartDate && currentSelectedEndDate != defaultSelectedEndDate) {

        return true;

    }
   
    return false;

}




//Sets a radio button to checked
function checkRadioButton(radioButton) {
    
    radioButton.checked = true;

}



//test!!!
function hasBothTargets(plotData) {

    if (plotData.T2.length == 0 && plotData.percentagesMetT2.length == 0 && plotData.mostRecentT2Des == "") {

        return false;
    }

    return true;
}




function hideBothTargetRadioButton(targetPlotOptionButtonBoth) {

    targetPlotOptionButtonBoth.style.display = "none";
    
}



function revealBothTargetRadioButton(targetPlotOptionButtonBoth) {

    targetPlotOptionButtonBoth.style.display = "block";
    
}



function hideTargetT1RadioButton(targetPlotOptionButtonT1) {

    targetPlotOptionButtonT1.style.display = "none";

}




function revealTargetT1RadioButton(targetPlotOptionButtonT1) {

    targetPlotOptionButtonT1.style.display = "block";

}




function hideT2TargetRadioButton(targetPlotOptionButtonT2) {

    targetPlotOptionButtonT2.style.display = "none";

}



function revealTargetT2RadioButton(targetPlotOptionButtonT2) {

    targetPlotOptionButtonT2.style.display = "block";

}



function hideTargetColorSelectorT2(targetPlotColorOptionButtonT2) {

    targetPlotColorOptionButtonT2.style.display = "none";
    
}




function revealTargetColorSelectorT2(targetPlotColorOptionButtonT2) {
    
     targetPlotColorOptionButtonT2.style.display = "block";

}



//Event listener for when the the both target radio button is selected.
targetPlotRadioButtonBoth.addEventListener('change', () => {

    plotTransitionEditedTargets(chartContainer,loadingElement,targetPlotRadioButtonBoth,targetPlotRadioButtonT1);
    displayColorOptionT1(targetPlotColorOptionButtonT1);
    displayColorOptionT2(targetPlotColorOptionButtonT2);
    
});



//Event listener for when the the T1 radio button is selected.
targetPlotRadioButtonT1.addEventListener('change', () => {

    plotTransitionEditedTargets(chartContainer,loadingElement,targetPlotRadioButtonBoth,targetPlotRadioButtonT1);
    displayColorOptionT1(targetPlotColorOptionButtonT1);
    hideColorOptionT2(targetPlotColorOptionButtonT2);
    
});



//Event listener for when the the T2 radio button is selected.
targetPlotRadioButtonT2.addEventListener('change', () => {

    plotTransitionEditedTargets(chartContainer,loadingElement,targetPlotRadioButtonBoth,targetPlotRadioButtonT1);
    hideColorOptionT1(targetPlotColorOptionButtonT1); 
    displayColorOptionT2(targetPlotColorOptionButtonT2);

});




//Event listener for when the the T1 color radio button is selected.
targetPlotColorRadioButtonT1.addEventListener('change', () => {

    plotTransitionEditedTargetColors(chartContainer, targetPlotRadioButtonT1, targetPlotRadioButtonBoth);
    
});




//Event listener for when the the T2 color radio button is selected.
targetPlotColorRadioButtonT2.addEventListener('change',() => {

    plotTransitionEditedTargetColors(chartContainer, targetPlotRadioButtonT1, targetPlotRadioButtonBoth);
    
});




//Event listener for when the the point size radio button is selected.
pointSizeSelector.addEventListener('change',() => {

    plotTransitionEditedGraphPointSize(chartContainer,targetPlotRadioButtonT1,targetPlotRadioButtonBoth);
    
});




//Event listener for when the the line size radio button is selected.
lineSizeSelector.addEventListener('change', () => {
    
    plotTransitonEditedGraphLineSize(chartContainer, targetPlotRadioButtonT1, targetPlotRadioButtonBoth);
    
});




//Event listener that plots selected data.
plottingModalPlotButton.addEventListener('click', async () => {

    if (allPlottingInfoIsSelected(sloSelectorElement,measureSelectorElement,startDateSelectorElement,endDateSelectorElement)) {

        let plotDataUrl = await generatePlotDataQueryUrl();

        axios.get(plotDataUrl).then(response => {

            let plottingDataObj = response.data;
    
            if (hasBothTargets(plottingDataObj)) {
                
                console.log("worked!!!!")
                plotTransitionBothTargets(plotDataUrl,displayElements);

            }
            else {
                
                plotTransitionSingleTarget(plotDataUrl,displayElements);
                
            }
         
        });
    }
    else {
        
        const unfilledSelectors = getAllUnslectedSelectors(inputFields);

        unfilledSelectors.forEach(revealUnselectedSelectorError);

    }

});




function BothTargetsPlotDataObjectHasAllValidKeys(plotDataObj) {
    
     if (plotDataObj.hasOwnProperty(dates) && plotDataObj.hasOwnProperty(mostRecentT1Des) && plotDataObj.hasOwnProperty(mostRecentT2Des) && plotDataObj.hasOwnProperty(percentagesMetT1) && plotDataObj.hasOwnProperty(T1) && plotDataObj.hasOwnProperty(T2)) {
        return true;
     }
    
    return true;

}



//This let us know if the object we are using (i.e hashtable) is structured with the valid key values for a T1 plot 
function t1TargetPlotDataObjectHasAllValidKeys(plotDatatObj) {
    
    if (plotDataObj.hasOwnProperty(dates) && plotDataObj.hasOwnProperty(mostRecentT1Des) && plotDataObj.hasOwnProperty(percentagesMetT1) && plotDataObj.hasOwnProperty(T1)) {
        return true;
     }
    
    return true;

}



//This let us know if the object we are using (i.e hashtable) is structured with the valid key values for a T2 plot 
function t2TargetPlotDataObjectHasAllValidKeys(plotDatatObj) {
    
    if (plotDataObj.hasOwnProperty(dates) && plotDataObj.hasOwnProperty(mostRecentT2Des) && plotDataObj.hasOwnProperty(percentagesMetT2) && plotDataObj.hasOwnProperty(T2)) {
        return true;
     }
    
    return true;

}




export {loadingElement,displayLoadingAnimation,dashboardLogo,hideDashboardLogo};