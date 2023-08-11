// Plotly.newPlot(TESTER, [
//   {
//     x: XArray,
//     y: [0,1,0]
//   }]
// );

// -- Graph layout config
// variables for graph
const WIDTH = 1000
const HEIGHT = 500
const BGCOLOR = '#c7c7c7'

let layout = {
  autosize: false,
  width: WIDTH,
  height: HEIGHT,
  yaxis: {
    tickvals: [0, 0.5, 1, 1.5],
    // tickmode: 'array'
  },
  margin: {
    l: 25,
    r: 25,
    b: 25,
    t: 25,
    pad: 1
  },
  plot_bgcolor: BGCOLOR
};

// -- Function defination for plotting a graph
function plotGraph(firstValuesArr, secondValuesArr, answerValuesArr){
  Plotly.newPlot(TESTER, [
    {
      x: firstValuesArr,
      y: [0,1,0],
      name: 'Fuzzy func 1'
    },
    {
      x: secondValuesArr,
      y: [0,1,0],
      name: 'Fuzzy func 2'
    },

    // For plotting the answer graph
    {
      x: answerValuesArr,
      y: [0,1,0],
      name: 'Answer func'
    }
  ],
    layout,
    {scrollZoom: true, displayModeBar: true, zoom: false}
  );
}


// -- Variables
// let XArray = [1,2,3] //Test
const calculateButton = document.querySelector('#calculate')
const inputs = document.querySelectorAll('.inputs')
const firstGraphInputs  = document.querySelectorAll('.first')
const secondGraphInputs  = document.querySelectorAll('.second')
const pointA = document.querySelector('#a')
const pointB = document.querySelector('#b')
const pointC = document.querySelector('#c')
const pointD = document.querySelector('#d')


TESTER = document.getElementById('tester');


// -- ENTRY POINT --
plotGraph([], [], [])


// -- Plotting graph for the user inputs
inputs.forEach(input =>{
  input.addEventListener('change', ()=>{
    let mean1 = 0
    let mean2 = 0
    let total1 = parseInt(pointA.value) + parseInt(pointB.value)
    let total2 = parseInt(pointC.value) + parseInt(pointD.value)
    mean1 = total1/2
    mean2 = total2/2
    console.log(mean1)
    firstValuesArr = [pointA.value, mean1 ,pointB.value]
    secondValuesArr = [pointC.value, mean2 ,pointD.value]
    console.log(firstValuesArr, secondValuesArr)
    plotGraph(firstValuesArr, secondValuesArr, [])
  })
})


// -- Input exception for complement function
const selectedOperations = document.querySelectorAll('input[name="function"]')
selectedOperations.forEach(selectedOperation =>{
  selectedOperation.addEventListener('click', ()=>{
    console.log(selectedOperation.value)
    if(selectedOperation.value == 'comp'){    //Disable input Point C & D if complement operation is selected
      pointC.disabled = true
      pointD.disabled = true
    }
    else{                                     //Enable Point C & D for any other operation selected
      pointC.disabled = false
      pointD.disabled = false
    }
  })
})


// -- Selecting operation and calling the respective function
calculateButton.addEventListener('click', ()=>{
  let operation = document.querySelector('input[name="function"]:checked')
  if(operation){
    operation = operation.value

    console.log(operation)
    if(operation == 'add'){
      addition()
      // console.log('addition()')
    }else if(operation == 'sub'){
      subtraction()
      // console.log('subtraction()')
    }else if(operation == 'comp'){
      // compilment()
      console.log('compilment()')
    }else if(operation == 'union'){
      // union()
      console.log('union()')
    }else if(operation == 'int'){
      // intersection()
      console.log('intersection()')
    }

  }else{
    alert('Select a function to perform')
  }
 
})


// -- Operations function definations --

// Addition function
function addition(){
  let p1 = parseInt(pointA.value)
  let p2 = parseInt(pointB.value)
  let p3 = parseInt(pointC.value)
  let p4 = parseInt(pointD.value)
  
  let ansMean = 0

  const add1 = p1 + p3
  const add2 = p2 + p4
  const ansTotal = add1 + add2
  ansMean = ansTotal / 2
  const answerValuesArr = [add1, ansMean, add2]
  // console.log(add1, ansMean, add2)
  plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)
}

// Subtraction function
function subtraction(){
  let p1 = parseInt(pointA.value)
  let p2 = parseInt(pointB.value)
  let p3 = parseInt(pointC.value)
  let p4 = parseInt(pointD.value)
  
  let ansMean = 0

  const sub1 = p1 - p4
  const sub2 = p2 - p3
  const ansTotal = sub1 + sub2
  ansMean = ansTotal / 2
  const answerValuesArr = [sub1, ansMean, sub2]

  plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)
}



