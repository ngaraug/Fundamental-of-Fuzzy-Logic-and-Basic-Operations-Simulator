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

var layout = {
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
  plot_bgcolor: BGCOLOR, 
};

// -- Function defination for plotting a graph
function plotGraph(firstValuesArr, secondValuesArr ){
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
    }],
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
plotGraph([{}],[{}])


// -- Plotting graph for the user inputs
inputs.forEach(input =>{
  input.addEventListener('change', ()=>{
    var mean1 = 0
    var mean2 = 0
    var total1 = parseInt(pointA.value) + parseInt(pointB.value)
    var total2 = parseInt(pointC.value) + parseInt(pointD.value)
    mean1 = total1/2
    mean2 = total2/2
    console.log(mean1)
    firstValuesArr = [pointA.value, mean1 ,pointB.value]
    secondValuesArr = [pointC.value, mean2 ,pointD.value]
    console.log(firstValuesArr, secondValuesArr)
    plotGraph(firstValuesArr, secondValuesArr)
  })
})


// -- Selecting and calling function
calculateButton.addEventListener('click', ()=>{
  let operation = document.querySelector('input[name="function"]:checked')
  if(operation){
    operation = operation.value

    console.log(operation)
    if(operation == 'add'){
      // addition()
      console.log('addition()')
    }else if(operation == 'sub'){
      // subtraction()
      console.log('subtraction()')
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





