const { loadDataTableBothTargets,loadDataTableBasedOnTargets,t1TargetPlotDataObjectHasAllValidKeys,t2TargetPlotDataObjectHasAllValidKeys,BothTargetsPlotDataObjectHasAllValidKeys} = require("../testingFunctions.js");



const testDataObj = {
  dates : ["17-18","18-19","19-20","20-21"],
  T1 : [50,50,50,50,50],
  T2 : [40,40,50,40,45],
  percentagesMetT1: [45,42,52,40,43],
  percentagesMetT2: [38,45,42,37,47],
  mostRecentT1Des:"T1:" + " Group avg > 50%",
  mostRecentT2Des:"T2:" + " Students want more juice in class",
    title: "S1M1 T1 & T2 \n Program Dev. & ETS Major Field Test"
  
}



test('Loads value from object into 2d Array', () => {

  expect(loadDataTableBothTargets(testDataObj)).toEqual(
   [ [ 'X',
    'Percentage Met for T1',
    'Percentage Met for T2',
    'T1: Group avg > 50%',
    'T2: Students want more juice in class' ],
  [ '17-18', 45, 38, 50, 40 ],
  [ '18-19', 42, 45, 50, 40 ],
  [ '19-20', 52, 42, 50, 50 ],
  [ '20-21', 40, 37, 50, 40 ] ]
  )
    
  // console.log(loadDataTableBothTargets(testDataObj))
  
  
  
});






  