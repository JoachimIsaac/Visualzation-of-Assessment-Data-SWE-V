// import 'babel-polyfill';

const plotButton = document.getElementById('plotting-button');
const dashboardLogo = document.getElementById('dashboard-logo');
const closePlotModalButton = document.querySelector("#plottingModal > div > div > div.modal-footer > button.btn.btn-secondary")
const chartElement = document.getElementById('chart-div');
const loadingElement = document.getElementById('loading-element');

const sloSelectorElement = document.getElementById('SLO-selector-plt');
const measureSelectorElement = document.getElementById('measure-selector-plt');
const startDateSelectorElement = document.getElementById('start-selector-plt');
const endDateSelectorElement = document.getElementById('end-selector-plt');
const targetPlotSelectorsContainer = document.getElementById('settings-container');


// const targetPlotSelectorT1Option = document.querySelector("#settings-container > div.option.\\31 ");
// const targetPlotSelectorT2Option = document.querySelector("#settings-container > div.option.\\32 ");
const targetPlotOptionButtonBoth = document.querySelector("#settings-container > div.option.\\31 ");
const targetPlotOptionButtonT1 = document.querySelector("#settings-container > div.option.\\32 ")
const targetPlotOptionButtonT2 = document.querySelector("#settings-container > div.option.\\33 ");

const targetPlotRadioButtonBoth = document.querySelector("#\\=target-radio-1");
const targetPlotRadioButtonT1 = document.querySelector("#\\=target-radio-2");
const targetPlotRadioButtonT2 = document.querySelector("#\\=target-radio-3");
//remember to fill up the rest of the dates when there are less than the tar

const targetPlotSelectorColorT1Option = document.querySelector("#settings-container > div.option.t1.color");
const targetPlotSelectorColorT2Option = document.querySelector("#settings-container > div.option.t2.color")

const targetPlotColorSelectorT1 = document.querySelector("#t1-color-selector");
const targetPlotColorSelectorT2 = document.querySelector("#t2-color-selector");

const pointSizeSelector = document.querySelector("#point-size-selector");
const lineSizeSelector = document.querySelector("#line-size-selector");

///use set timeout outside of the function rather than inside that will make it mor choesive 

google.load("visualization", "1", { packages: ["corechart"] });
var chartObj; 



function hideDashboardLogo() {
    dashboardLogo.style.display = "none";
}

function displayPlotSettingsContainer() {
    targetPlotSelectorsContainer.style.display = "flex";
}

function hidePlotSettingsContainer() {
    targetPlotSelectorsContainer.style.display = "none";
}

function closePlottingModal() {
    closePlotModalButton.click();
}


function target1RadioButtonChecked() {
    if (targetPlotRadioButtonT1.checked){
        return true;
    }

    return false;
    
}

function target2RadioButtonChecked(){

    if (targetPlotRadioButtonT2.checked){
        return true;
    }

    return false;
}

function bothTargetsRadioButttonChecked(){

    if (targetPlotRadioButtonBoth.checked){
        return true;
    }

    return false;
}


function removeFirstInnerElement(parentElement){
  
  if(parentElement == null || parentElement == undefined) return;
  let childElement = parentElement.children[0];
  parentElement.removeChild(childElement);
  
}


async function plotTransitionEditedTargets() {

    

    
    
    let plotDataUrl = await generatePlotDataQueryUrl();
  
    if (chartElement.children.length > 0) {
        // await removeFirstInnerElement(chartElement);
        await hideChartElement();
        
    }
     
    await displayLoadingAnimation();


    if (bothTargetsRadioButttonChecked()) {//change to see if both radio is checked
        
        await plotChartWithBothTargets(plotDataUrl);
        console.log("plot both")
    }
    else {
        if (target1RadioButtonChecked()) {//change to see if t1 checked
           
            await plotChartBasedOnTargets(plotDataUrl, "T1");
            console.log("plot t1")
        }
        else {
            
            
            await plotChartBasedOnTargets(plotDataUrl, "T2");
            console.log("plot t2")
        }

    }

    await displayChartElement();
    // setTimeout(() => {displayPlotSettingsContainer()}, 2100);
}


async function plotTransitionEditedTargetColors() {
    
    let t1Color = document.querySelector("#t1-color-selector").value;
    let t2Color = document.querySelector("#t2-color-selector").value;
    let pointSizeValue = document.querySelector("#point-size-selector");
    let lineSizeValue = document.querySelector("#line-size-selector");

    
    let plotDataUrl = await generatePlotDataQueryUrl();
  
    // if (chartElement.children.length > 0) {
    //     // await removeFirstInnerElement(chartElement);
    //     await hideChartElement();
    // }
     
    // await displayLoadingAnimation();


    if (bothTargetsRadioButttonChecked()) {//change to see if both radio is checked
        await plotChartWithBothTargets(plotDataUrl );
        console.log("plot both")
    }
    else {
        if (target1RadioButtonChecked()) {//change to see if t1 checked
            await plotChartBasedOnTargets(plotDataUrl, "T1" );
            console.log("plot t1")
        }
        else {
            await plotChartBasedOnTargets(plotDataUrl, "T2");
            console.log("plot t2")
        }

    }

    await displayChartElement();
    // setTimeout(() => {displayPlotSettingsContainer()}, 2100);
}


                /////makes these//////
async function plotTransitonEditedGraphLineSize() {
    

    let plotDataUrl = await generatePlotDataQueryUrl();
  
    // if (chartElement.children.length > 0) {
        // await removeFirstInnerElement(chartElement);
        //await hideChartElement();
    // }
     
    // await displayLoadingAnimation();


    if (bothTargetsRadioButttonChecked()) {//change to see if both radio is checked
        await plotChartWithBothTargets(plotDataUrl);
        console.log("plot both")
    }
    else {
        if (target1RadioButtonChecked()) {//change to see if t1 checked
            await plotChartBasedOnTargets(plotDataUrl, "T1");
            console.log("plot t1")
        }
        else {
            await plotChartBasedOnTargets(plotDataUrl, "T2");
            console.log("plot t2")
        }

    }

    await displayChartElement();


}

async function plotTransitionEditedGraphPointSize() {



    let plotDataUrl = await generatePlotDataQueryUrl();
  
    // if (chartElement.children.length > 0) {
    //     // await removeFirstInnerElement(chartElement);
    //     await hideChartElement();
    // }
     
    // await displayLoadingAnimation();


    if (bothTargetsRadioButttonChecked()) {//change to see if both radio is checked

        
        plotChartWithBothTargets(plotDataUrl);
        
        console.log("plot both")
    }
    else {
        if (target1RadioButtonChecked()) {//change to see if t1 checked
            await plotChartBasedOnTargets(plotDataUrl, "T1");
            console.log("plot t1")
        }
        else {
            await plotChartBasedOnTargets(plotDataUrl, "T2");
            console.log("plot t2")
        }

    }

    await displayChartElement();

 }

function loadDataTableBothTargets(plotDataObj){// load the data table 
  console.log(plotDataObj)
  let result = [
    ['X','Percentage Met for T1' ,'Percentage Met for T2',plotDataObj.mostRecentT1Des,plotDataObj.mostRecentT2Des]
  ];

  const cols = plotDataObj.dates.length; 
  const rows = 5;

  for(let index = 0; index < cols; index++){
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


function loadDataTableBasedOnTargets(plotDataObj, target) {
    
    if (target == "T1") {
        
    let result = [
      ['X','Percentage Met for T1',plotDataObj.mostRecentT1Des]
    ];
  
    const cols = plotDataObj.dates.length; 
    const rows = 5;
  
    for(let index = 0; index < cols; index++){
      let rowArray = [];
      rowArray.push(plotDataObj.dates[index]);
      rowArray.push(plotDataObj.percentagesMetT1[index]);
      // rowArray.push(dataObj.percentagesMetT2[index]);
      rowArray.push(plotDataObj.T1[index]);
      // rowArray.push(dataObj.T2[index]);
      result.push(rowArray);
    }
        console.log(result);
    return result; 
        
}
else {

        let result = [
    ['X' ,'Percentage Met for T2',plotDataObj.mostRecentT2Des]
  ];

  const cols = plotDataObj.dates.length; 


  for(let index = 0; index < cols; index++){
      let rowArray = [];
      
    rowArray.push(plotDataObj.dates[index]);
    rowArray.push(plotDataObj.percentagesMetT2[index]);
    rowArray.push(plotDataObj.T2[index]);
      
    result.push(rowArray);
  }
console.log(result);
  return result;
    }

}

// function loadDataTableBasedOnTargets(plotDataObj, target) {
    
//     if (target == "T1") {
        


//         let result = [
//     ['X','Percentage Met for T1',plotDataObj.mostRecentT1Des]
//   ];

//   const cols = plotDataObj.dates.length; 


//   for(let index = 0; index < cols; index++){
//       let rowArray = [];
      
//     rowArray.push(plotDataObj.dates[index]);
//     rowArray.push(plotDataObj.percentagesMetT1[index]);
//     rowArray.push(plotDataObj.T1[index]);
//     result.push(rowArray);
//   }

//   return result; 
        
// }
// else {

//         let result = [
//     ['X' ,'Percentage Met for T2',plotDataObj.mostRecentT2Des]
//   ];

//   const cols = plotDataObj.dates.length; 


//   for(let index = 0; index < cols; index++){
//       let rowArray = [];
      
//     rowArray.push(plotDataObj.dates[index]);
//     rowArray.push(plotDataObj.percentagesMetT2[index]);
//     rowArray.push(plotDataObj.T2[index]);
      
//     result.push(rowArray);
//   }

//   return result;
//     }

// }

function displayChartElement() {
    chartElement.style.display = "block";
}

function hideChartElement() {
    let child = chartElement.children[0];
    chartElement.removeChild(child)
    chartElement.style.display = 'none';
}


function displayColorOptionT1() {
    targetPlotSelectorColorT1Option.style.display = "block";
}


function displayColorOptionT2() {
    targetPlotSelectorColorT2Option.style.display = "block";

}


function hideColorOptionT1() { 
    targetPlotSelectorColorT1Option.style.display = "none";
}

function hideColorOptionT2() { 
    targetPlotSelectorColorT2Option.style.display = "none";
}


//take out set time out and do it where we call it in the first place ()
function plotChartWithBothTargets(requestUrl) {
    let t1Color = document.querySelector("#t1-color-selector").value;
    let t2Color = document.querySelector("#t2-color-selector").value;
    let pointSize = parseInt(document.querySelector("#point-size-selector").value);
    let lineSize = parseInt(document.querySelector("#line-size-selector").value);

    setTimeout(() => {

        let plottingDataObj;
        let pickedColors = [t1Color,t2Color]

    axios.get(requestUrl).then(response => {
        plottingDataObj = response.data;
        console.log(plottingDataObj)
   
        
       
        google.setOnLoadCallback(drawChart);

         function drawChart() {
            console.log(loadDataTableBothTargets(plottingDataObj))
            let data = google.visualization.arrayToDataTable(loadDataTableBothTargets(plottingDataObj));

            let options = {
            title: plottingDataObj.title,//Add school title from obj
            hAxis: { title: 'School Term', minValue: 0, maxValue: 15 },
            vAxis: { title: 'Percentage-met', minValue: 0, maxValue: 15 },
            legend: 'none',
            interpolateNulls: true,
            pointSize: pointSize,
            colors: pickedColors,
            //Give it two colors to choose from
            //you can change the red and blue by chaning via indexes
            //index 0 is t1 and index 1 ins t2
            
            
            series: {//control the shapes and line graph or just points
                    0:{pointShape:{type:'square'}},
                    1:{pointShape:{type:'star', sides:5,dent:0.6}},
                    2: { lineWidth: lineSize, pointSize: 0 },
                    3:  { lineWidth: lineSize, pointSize: 0 }
                },
                width: '100%',
                height: '100%',
                backgroundColor: { fill: 'transparent' },
                legend:'right'//add legend to the right 
            };

            chartObj = new google.visualization.ScatterChart(document.getElementById('chart-div'));
            chartObj.draw(data, options);   
         }
        
        
    });
        
    }, 2000);
   
}



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
        console.log(plottingDataObj)
   
        
        // google.load("visualization", "1", { packages: ["corechart"] });
        google.setOnLoadCallback(drawChartBasedOnTarget);

         function drawChartBasedOnTarget() {
            console.log(loadDataTableBasedOnTargets(plottingDataObj, target))
            let data = google.visualization.arrayToDataTable(loadDataTableBasedOnTargets(plottingDataObj, target));
            console.log("transformed data: ")
            console.log(data);
            let options = {
            title: plottingDataObj.title,//Add school title from obj
            hAxis: { title: 'School Term', minValue: 0, maxValue: 15 },
            vAxis: { title: 'Percentage-met', minValue: 0, maxValue: 15 },
            legend: 'none',
            interpolateNulls: true,
            pointSize: pointSize,
            colors:pickedColors,//Give it two colors to choose from
            //you can change the red and blue by chaning via indexes
            //index 0 is t1 and index 1 ins t2
            
            
            series: {//control the shapes and line graph or just points
                0:{pointShape:{type:'square'}},
                // 1:{pointShape:{type:'star', sides:5,dent:0.6}},
                1: { lineWidth: lineSize, pointSize: 0 }
                // 3:  { lineWidth: 1, pointSize: 0 }
            },
                width: '100%',
                height: '100%',
                backgroundColor: { fill: 'transparent' },
                legend:'right'//add legend to the right 
            };

            chartObj = new google.visualization.ScatterChart(document.getElementById('chart-div'));
            chartObj.draw(data, options);   
         }
        
        
    });
        
    }, 2000);
}


 function clearloadingElement() {
    loadingElement.style.display = "none";
}


 function displayLoadingAnimation() {
    loadingElement.style.display = "block";
     setTimeout(() => {
         clearloadingElement()
    }, 2000);
 }

function generatePlotDataQueryUrl() {

    let currentSelectedSlo = sloSelectorElement.options[sloSelectorElement.selectedIndex].text;
    let currentSelectedMeasure = measureSelectorElement.options[measureSelectorElement.selectedIndex].text;
    let currentSelectedStartDate = startDateSelectorElement.options[startDateSelectorElement.selectedIndex].text;
    let currentSelectedEndDate = endDateSelectorElement.options[endDateSelectorElement.selectedIndex].text;
    let url = `https://visualization-practice-api.herokuapp.com/plot?slo=${currentSelectedSlo}&measure=${currentSelectedMeasure}&start_date=${currentSelectedStartDate}&end_date=${currentSelectedEndDate}`;

    return url;
}
 
//Make sure I give popup if they don't select everything.

function allPlottingInfoIsSelected() {
    let defaultSelectedSlo = sloSelectorElement.options[0].text;
    let defaultSelectedMeasure = measureSelectorElement.options[0].text;
    let defaultSelectedStartDate = startDateSelectorElement.options[0].text;
    let defaultSelectedEndDate = endDateSelectorElement.options[0].text;

    let currentSelectedSlo = sloSelectorElement.options[sloSelectorElement.selectedIndex].text;
    let currentSelectedMeasure = measureSelectorElement.options[measureSelectorElement.selectedIndex].text;
    let currentSelectedStartDate = startDateSelectorElement.options[startDateSelectorElement.selectedIndex].text;
    let currentSelectedEndDate = endDateSelectorElement.options[endDateSelectorElement.selectedIndex].text;

    if (currentSelectedSlo != defaultSelectedSlo && currentSelectedMeasure != defaultSelectedMeasure && currentSelectedStartDate != defaultSelectedStartDate && currentSelectedEndDate != defaultSelectedEndDate) {
        return true;
    }
    else {
        return false;
    }
}



// I'll either have to use .then sytax or set up a webpack environment
async function plotTrasitionBothTargets(plotDataUrl) {
   
    

    await hideDashboardLogo();
   
    await closePlottingModal();
  
    if (chartElement.children.length > 0) {
        await hideChartElement();
    }
     
    await displayLoadingAnimation();

    await plotChartWithBothTargets(plotDataUrl);

    await displayChartElement();

    setTimeout(() => {

        displayPlotSettingsContainer();
        revealBothTargetRadioButton();
        revealT2TargetRadioButton();
        revealTargetColorSelectorT2();
        revealTargetT1RadioButton()
        targetPlotRadioButtonBoth.checked = true;
    
    }, 2100);
    
}


async function plotTransitionSingleTarget(plotDataUrl) {
    
    await hideDashboardLogo();
   
    await closePlottingModal();

    if (chartElement.children.length > 0) {
        await hideChartElement();
    }

    await displayLoadingAnimation();

    await plotChartBasedOnTargets(plotDataUrl, "T1");

    await displayChartElement();

    setTimeout(() => {

        displayPlotSettingsContainer();
        hideBothTargetRadioButton();
        hideTargetT1RadioButton();
        hideT2TargetRadioButton();
        hideTargetColorSelectorT2();
        targetPlotRadioButtonT1.checked = true;

    
    }, 2100);
}


function hasBothTargets(plotData) {

    if (plotData.T2.length == 0 && plotData.percentagesMetT2.length == 0 && plotData.mostRecentT2Des == "") {

        return false;
    }

    return true;
}


function hideBothTargetRadioButton() {

    targetPlotOptionButtonBoth.style.display = "none";
    
}



function revealBothTargetRadioButton() {
    targetPlotOptionButtonBoth.style.display  = "block";
}


function hideTargetT1RadioButton() {
    targetPlotOptionButtonT1.style.display = "none";
}

function revealTargetT1RadioButton() {
    targetPlotOptionButtonT1.style.display = "block";
}


function hideT2TargetRadioButton() {

    targetPlotOptionButtonT2.style.display = "none";

}

function revealT2TargetRadioButton() {
    targetPlotOptionButtonT2.style.display = "block";
}



function hideTargetColorSelectorT2() {
     targetPlotSelectorColorT2Option.style.display = "none";
}

function revealTargetColorSelectorT2() {
    
     targetPlotSelectorColorT1Option.style.display = "block";

}


plotButton.addEventListener('click', async () => {

    if (allPlottingInfoIsSelected()) {

        let plotDataUrl = await generatePlotDataQueryUrl();

        

        axios.get(plotDataUrl).then(response => {

        let plottingDataObj = response.data;
  
        if (hasBothTargets(plottingDataObj)) {
            
            plotTrasitionBothTargets(plotDataUrl);

        }
        else {
            
            plotTransitionSingleTarget(plotDataUrl);
        }
        
        
    });
        //if both targets, do the normal plot transition 
        
        //if only one target plot the only one target 

    }//handle the case to tell the user to make sure they selected everything.
});


targetPlotRadioButtonBoth.addEventListener('change', () => {
    plotTransitionEditedTargets();
    displayColorOptionT2();
    displayColorOptionT1();
});


targetPlotRadioButtonT1.addEventListener('change', () => {
    // plotTransitionEditedTargets();
    plotTransitionEditedTargets();
    hideColorOptionT2();
    displayColorOptionT1()
});


targetPlotRadioButtonT2.addEventListener('change', () => {
    plotTransitionEditedTargets();
    // plotTransitionEditedTargetColors();
    hideColorOptionT1(); 
    displayColorOptionT2();
});


targetPlotColorSelectorT1.addEventListener('change', () => {
    plotTransitionEditedTargetColors();
});


targetPlotColorSelectorT2.addEventListener('change',() => {

    plotTransitionEditedTargetColors();
});



pointSizeSelector.addEventListener('change',() => {
    let pointSize = parseInt(pointSizeSelector.value);
    //plotTransitionfor point fucntion
    plotTransitionEditedGraphPointSize();
    
});


lineSizeSelector.addEventListener('change',() => {
    let lineSize = parseInt(lineSizeSelector.value);
    //plotTransitionfor line fucntion
    plotTransitonEditedGraphLineSize();
});






// Exporting variables and functions
export {loadingElement,clearloadingElement,displayLoadingAnimation,dashboardLogo,hideDashboardLogo};

//plot query structure:
// "https://visualization-practice-api.herokuapp.com/plot?slo=S1&measure=M1&start_date=18-19&end_date=20-21"
