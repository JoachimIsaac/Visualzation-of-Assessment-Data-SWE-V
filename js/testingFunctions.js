
function getErrorResponse400(code) {

    let message = '';
    
     if (code == 400) {
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




function getErrorResponse500(code) {
    
    let message = '';
    
    if (code == 500) {

        message = `500 Internal Server Error – a generic error occurred on the server`;

    }
    else if (code == 503) {
        
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



function isValid500Error(code) {
    
    if ((code == 500) || (coder == 503)) {
        
        return true;
    }

    return false 
}



//Gets the current school term based on the current date.
function getCurrentSchoolTerm(currentMonth,currentYear){
    
    

    if (typeof (currentMonth) != "number" || typeof (currentYear) != "number") return "";


    if (currentMonth >= 13 || currentMonth < 1 || currentYear > 2200 || currentYear < 1992) return "";
    


    currentMonth = parseInt(currentMonth);
    currentYear = parseInt(currentYear);
  
    const MAY = 5;
  
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




//Need to make tests for this....
function BothTargetsPlotDataObjectHasAllValidKeys(plotDataObj) {
    
     if (plotDataObj.hasOwnProperty(dates) && plotDataObj.hasOwnProperty(mostRecentT1Des) && plotDataObj.hasOwnProperty(mostRecentT2Des) && plotDataObj.hasOwnProperty(percentagesMetT1) && plotDataObj.hasOwnProperty(T1) && plotDataObj.hasOwnProperty(T2)) {
        return true;
     }
    
    return true;

}

//Need to make tests for this....
function t1TargetPlotDataObjectHasAllValidKeys(plotDatatObj) {
    
    if (plotDataObj.hasOwnProperty(dates) && plotDataObj.hasOwnProperty(mostRecentT1Des) && plotDataObj.hasOwnProperty(percentagesMetT1) && plotDataObj.hasOwnProperty(T1)) {
        return true;
     }
    
    return true;

}


//Need to make tests for this....
function t2TargetPlotDataObjectHasAllValidKeys(plotDatatObj) {
    
    if (plotDataObj.hasOwnProperty(dates) && plotDataObj.hasOwnProperty(mostRecentT2Des) && plotDataObj.hasOwnProperty(percentagesMetT2) && plotDataObj.hasOwnProperty(T2)) {
        return true;
     }
    
    return true;

}



//started with the test for this need to finish this .
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





//Need to make tests for this....
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




module.exports = { getErrorResponse400, getErrorResponse500, isValid400Error, isValid500Error,getCurrentSchoolTerm,loadDataTableBothTargets,loadDataTableBasedOnTargets,t1TargetPlotDataObjectHasAllValidKeys,t2TargetPlotDataObjectHasAllValidKeys,BothTargetsPlotDataObjectHasAllValidKeys};

