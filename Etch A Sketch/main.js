
const grid = () => {
  const gridContainer = document.querySelector('.grid');
  const inputColorBackground = document.getElementById('color-background');
  const clearButton = document.getElementById('clear')
  const inputGrid = document.getElementById('grid-input')
  const spanGridText = document.getElementById('grid-input-text')

  createGridItems(0, gridContainer, 256);
  paintGrid(gridContainer)
  
  inputColorBackground.addEventListener('input', () => {
    let root = document.documentElement;
    root.style.setProperty('--background-items', inputColorBackground.value);
  })

  clearButton.addEventListener('click', () => {clearAll()})

  inputGrid.addEventListener('input', () => {
    clearAll()
    const gridItems = document.querySelectorAll('.grid-item').length;
    let root = document.documentElement;
    let value = parseInt(inputGrid.value);
    let flexBasis = 100/(value);
    spanGridText.textContent = `${value} x ${value}`
    createGridItems(gridItems, gridContainer, (value * value))

    root.style.setProperty('--responsive', `${flexBasis.toFixed(2) - 0.01}%` );
  })
}

const createGridItems = (number, container, addOrRemoveItems) => {
  let n;
  if(number < addOrRemoveItems) {
    n = (addOrRemoveItems - number)
    for(let i = 0; i < n; i++){
      let newItem = document.createElement('div');
        newItem.classList.add('grid-item')
        newItem.classList.add('null')
        container.appendChild(newItem); 
    }
  }
  if(number > addOrRemoveItems) {
    n = (number - addOrRemoveItems)
    for(let i = 0; i < n; i++){
      container.removeChild(container.firstChild);
    }
  }
  paintGrid(container);

}

const paintGrid = (container) => {
  const inputColorPen = document.getElementById('color-pen');
  let mouseAcitvate = false;

  let colorPen = inputColorPen

  const gridItems = document.querySelectorAll('.grid-item')
  gridItems.forEach(item => {
    item.addEventListener('mousedown', () =>{
      mouseAcitvate = true;
      item.classList.replace('null', 'colored')
      item.style.backgroundColor = colorPen.value
    })
    item.addEventListener('mouseover', () => {
      if(mouseAcitvate) {
        item.classList.replace('null', 'colored')
        item.style.backgroundColor = colorPen.value
      }
    })
    item.addEventListener('mouseup', () =>{
      mouseAcitvate = false;
    })
  });
  container.addEventListener('mouseup', () => {
    mouseAcitvate = false;
  })
}

const clearAll = () => {
  const gridItems = document.querySelectorAll('.colored')
  console.log(gridItems)
  gridItems.forEach(element => {
    element.classList.replace('colored', 'null')
    element.style.backgroundColor = "var(--background-items)"
  });
}


grid()


// const clearGrid = () => {
//     const get = document.getElementsByClassName('color')
//     Array.from(get).forEach(div => {
//         div.classList.replace('color', 'square');
//         console.log(div.className);
//     });
// }
// clearBtn.addEventListener('click', clearGrid)

// const square = document.querySelector("div");
// square.addEventListener("mouseover", function(event) {
//   event.target.classList.replace("square", "color");
// });
 
// const creteGrid = () => {
//     for (let i = 0; i < 256; i++) {
//         const div = document.createElement("div");
//         div.classList.add("square");
//         grid.appendChild(div);
//     }
// }

// const updateGrid = () => {
//     outputGrid.textContent = inputGrid.value
//     grid.innerHTML = "";
//     grid.style.setProperty(
//       "grid-template-columns",
//       `repeat(${inputGrid.value}, 2fr)`
//     );
//     grid.style.setProperty(
//       "grid-template-rows",
//       `repeat(${inputGrid.value}, 2fr)`
//     );
//     for (let i = 0; i < inputGrid.value * inputGrid.value; i++) {
//       const div = document.createElement("div");
//       div.classList.add("square");
//       grid.appendChild(div);
//     }
//     console.log(inputGrid.value);
//   };
// inputGrid.addEventListener('change', updateGrid)

// creteGrid()