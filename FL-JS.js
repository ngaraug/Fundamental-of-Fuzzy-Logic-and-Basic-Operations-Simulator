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
function plotGraph(firstValuesArr, secondValuesArr, answerValuesArr=[]){

  // For plotting the user input only and not the answer
  if(answerValuesArr.length == 0){    
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
    ],
      layout,
      {scrollZoom: true, displayModeBar: true, zoom: false}
    );
  }
  // For plotting user input and answer for add and sub operations
  else if(answerValuesArr.length > 2){
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
      // For plotting the answer graph for add and sub
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
  // Plotting input and answer for intersection and union 
  else if(answerValuesArr.length == 2){
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
  
      // For plotting the answer graph for add and sub
      {
        x: answerValuesArr[0],
        // y: [0,1,0],
        y: answerValuesArr[1],
        name: 'Answer func'
      }
    ],
      layout,
      {scrollZoom: true, displayModeBar: true, zoom: false}
    );
  }
  
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

let newp1 = 0
let newp2 = 0
let newp3 = 0
let newp4 = 0


TESTER = document.getElementById('tester');


// -- ENTRY POINT --
plotGraph([], [], [])


// -- Plotting graph for the user inputs
inputs.forEach(input =>{
  input.addEventListener('change', ()=>{
    let mean1 = 0
    let mean2 = 0
    let total1 = parseFloat(pointA.value) + parseFloat(pointB.value)
    let total2 = parseFloat(pointC.value) + parseFloat(pointD.value)
    mean1 = total1 / 2
    mean2 = total2 / 2
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
      // compelment()
      console.log('compelment()')
    }else if(operation == 'union'){
      union()
      // console.log('union()')
    }else if(operation == 'int'){
      // intersection()
      console.log('intersection()')
    }

  }else{
    alert('Select a function to perform')
  }
 
})



// Rearrange coordinates to take in consideration negative values
function rearrangeCoordinates(){
  let p1 = parseFloat(pointA.value)
  let p2 = parseFloat(pointB.value)
  let p3 = parseFloat(pointC.value)
  let p4 = parseFloat(pointD.value)

    if(p1 > p2){
      newp1 = p2
      newp2 = p1
    }else if( p1 <= p2){
      newp1 = p1
      newp2 = p2
    }
  
    if(p3 > p4){
      newp3 = p4
      newp4 = p3
    }else if( p3 <= p4){
      newp3 = p3
      newp4 = p4
    }

    return [newp1, newp2, newp3, newp4]
}


// -- Operations function definations --

// Addition function
function addition(){
  let p1 = parseFloat(pointA.value)
  let p2 = parseFloat(pointB.value)
  let p3 = parseFloat(pointC.value)
  let p4 = parseFloat(pointD.value)
  
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
  let p1 = parseFloat(pointA.value)
  let p2 = parseFloat(pointB.value)
  let p3 = parseFloat(pointC.value)
  let p4 = parseFloat(pointD.value)
  
  let ansMean = 0

  const sub1 = p1 - p4
  const sub2 = p2 - p3
  const ansTotal = sub1 + sub2
  ansMean = ansTotal / 2
  const answerValuesArr = [sub1, ansMean, sub2]

  plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)
}

// Complement function (*incomplete)
function complement(){
  let p1 = parseFloat(pointA.value)
  let p2 = parseFloat(pointB.value)

  let ansMean = 0


}

// Union function
function union(){
  newCoordinates = rearrangeCoordinates()
  // let p1 = parseFloat(pointA.value)
  // let p2 = parseFloat(pointB.value)
  // let p3 = parseFloat(pointC.value)
  // let p4 = parseFloat(pointD.value)
  let p1 = newCoordinates[0]
  let p2 = newCoordinates[1]
  let p3 = newCoordinates[2]
  let p4 = newCoordinates[3]
  let total1 = (p1 + p2)
  let total2 = (p3 + p4)
  let m1 = total1 / 2
  let m2 = total2 / 2 
  
  let ansMean = 0
  if( p1>p3 && p4>p2 ){
    if( m1>m2 ){
      const uni1 = math.intersect([p1, 0], [m1, 1], [p4, 0], [m2, 1])
      const uni2 = math.intersect([p2, 0], [m1, 1], [p4, 0], [m2, 1])

      const xp5 = uni1[0]
      const yp5 = uni1[1]
      const xp6 = uni2[0] 
      const yp6 = uni2[1]

      const ansXarr = [p3, m2, xp5, m1, xp6, p4]
      const ansYarr = [0, 1, yp5, 1, yp6, 0]
      const answerValuesArr = [ansXarr, ansYarr]

      plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)

    }else if( m1<m2 ){      
      const uni1 = math.intersect([p1, 0], [m1, 1], [p3, 0], [m2, 1])
      const uni2 = math.intersect([p2, 0], [m1, 1], [p3, 0], [m2, 1])
      
      const xp5 = uni1[0]
      const yp5 = uni1[1]
      const xp6 = uni2[0]
      const yp6 = uni2[1]

      const ansXarr = [p3, xp5, m1, xp6, m2, p4]
      const ansYarr = [0, yp5, 1, yp6, 1, 0]
      const answerValuesArr = [ansXarr, ansYarr]

      plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)

    }else if( m1==m2 ){     
      const ansP2 = m2
      const answerValuesArr = [p3, ansP2, p4]
      plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)
    }
  }

  else if( p3>p1 && p2>p4 ){  
    if( m1>m2 ){
      const uni1 = math.intersect([p1, 0], [m1, 1], [p3, 0], [m2, 1])
      const uni2 = math.intersect([p1, 0], [m1, 1], [p4, 0], [m2, 1])

      const xp5 = uni1[0]
      const yp5 = uni1[1]
      const xp6 = uni2[0]
      const yp6 = uni2[1]

      const ansXarr = [p1, xp5, m2, xp6, m1, p2]
      const ansYarr = [0, yp5, 1, yp6, 1, 0]
      const answerValuesArr = [ansXarr, ansYarr]

      plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)

    }else if( m1<m2 ){
      const uni1 = math.intersect([p3, 0], [m2, 1], [m1, 1], [p2, 0])
      const uni2 = math.intersect([p4, 0], [m2, 1], [m1, 1], [p2, 0])

      const xp5 = uni1[0]
      const yp5 = uni1[1]
      const xp6 = uni2[0]
      const yp6 = uni2[1]

      const ansXarr = [p1, m1, xp5, m2, xp6, p2]
      const ansYarr = [0, 1, yp5, 1, yp6, 0]
      const answerValuesArr = [ansXarr, ansYarr]

      plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)

    }else if( m1==m2 ){
      const ansP2 = m1
      const answerValuesArr = [p1, ansP2, p2]
      plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)
    }
  }
  else if( p3>p1){
    const uni = math.intersect([p3, 0], [m2, 1], [m1, 1], [p2, 0])

    const xp5 = uni[0]
    const yp5 = uni[1] 
    
    console.log(m1, m2, "Means")

    const ansXarr = [p1, m1, xp5, m2, p4]
    const ansYarr = [0, 1, yp5, 1, 0]
    const answerValuesArr = [ansXarr, ansYarr]
    console.log(ansXarr, ansYarr, "Answer arrays")
    plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)
  }
  else{
    let uni = math.intersect([m1, 1], [p2, 0], [p3, 0], [m2, 1])

    let xp5 = uni[0]
    let yp5 = uni[1]

    // Bug fix #1-- Sol:(Recalculating when the y-coordinate of p5 goes above or below 1)
    if(yp5 > 1 || yp5 < 1){
      temp = p3
      p3 = p4
      p4 = temp
      uni = math.intersect([p3, 0], [m2, 1], [p1, 0], [m1, 1])
      console.log(uni)
      xp5 = uni[0]
      yp5 = uni[1]

      // Bug fix #2-- Sol:(Switching means and p2)
      if(yp5 > 1){
        yp5 = 2 - yp5
        temp = m1
        m1 = m2
        m2 = temp
        p2 = p3
      }
      
      p3 = p4
    }

    const ansXarr = [p3, m2, xp5, m1, p2]
    const ansYarr = [0, 1, yp5, 1, 0]
    const answerValuesArr = [ansXarr, ansYarr]
    console.log(ansXarr, ansYarr, "Answer arrays")
    plotGraph(firstValuesArr, secondValuesArr, answerValuesArr)
  }
}

//Bugs at:
// #2: [p1:-1, p2:3, p3:5, p4: -4] (solved)