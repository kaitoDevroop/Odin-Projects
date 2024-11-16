let library = [];
const forms = document.querySelectorAll('form')
const cancelButtons = document.querySelectorAll('.form-confirm button[type="button"]')
let elementToEdit

document.querySelector('.adding-button button').addEventListener('click', () => {
    document.querySelector('.mask').classList.toggle('hide')
    document.querySelector('.container-adding').classList.toggle('hide')
})

// CANCEL BUTTON

cancelButtons[0].addEventListener('click', e => {
    eliminateInputValues(".container-adding")
    document.querySelector('.mask').classList.toggle('hide')
    document.querySelector('.container-adding').classList.toggle('hide')
})

cancelButtons[1].addEventListener('click', e => {
    document.querySelector('.mask').classList.toggle('hide')
    document.querySelector('.container-edit').classList.toggle('hide')
    eliminateInputValues(".container-edit")
})

function eliminateInputValues(container) {
    const tag = container + '  input'
    const inputs = document.querySelectorAll(tag)
    inputs.forEach(inputItem => {
        inputItem.value = ''
    });
}

// SUBMIT BUTTONS

document.querySelector('.container-adding form').addEventListener('submit', e => {
    const inputs = document.querySelectorAll(".container-adding form input")
    const status = document.getElementById('status')

    e.preventDefault()

    if (validateForm(inputs, [true, true])) {
        addBook(inputs[0].value, inputs[1].value, status.value)
        addBookElement(inputs[0].value, inputs[1].value, status.value)
        document.querySelector('.mask').classList.toggle('hide')
        document.querySelector('.container-adding').classList.toggle('hide')
        eliminateInputValues(".container-adding")

    } else {
        validateForm(inputs, [true, true])
    }
    
})


// VALIDATION FORM

function validation(element, message, error) {
    if (error == true && element.nextSibling.tagName != 'SPAN') {
        const span = document.createElement('span')
        span.textContent = message
        element.insertAdjacentElement("afterend", span)
    } 
    if (error == false && element.nextSibling.tagName == 'SPAN') {
        element.nextSibling.remove()
    }
}

function validateForm(inputs, numberOfInputs) {
    const allInputs = inputs
    let inputsToConfirm = numberOfInputs

    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value.trim() == '') {
            validation(allInputs[i], 'Complete The Field', true)
            inputsToConfirm[i] = false
        } else {
            validation(allInputs[i], '', false)
            inputsToConfirm[i] = true
        }
    }

    if (inputsToConfirm.find((input) => input === false) !== false) {
        return true
    }
}



//Book object
function Book(name, author, status) {
    this.name = name;
    this.author = author;
    this.status = status;
}

// Add function to add book
function addBook(name, author, status) {
    const newBook = new Book(name, author, status)

    if (newBook.name == "" || newBook.name === undefined) {
        newBook.name = "N/B";
    }
    if (newBook.author == "" || newBook.author === undefined) {
        newBook.author = "N/A";
    }
    if (newBook.status == "" || newBook.status === undefined) {
        newBook.status = "Not Read"
    } 

    return library.push(newBook)
}


function showList() {
    console.log(library)
}

function removeBook(list, name, author, status) {
    const booksToRemove = findBook(list, name, author, status)
    const indexOfRemovedBook = findIndexOfBook(list, name, author, status)
    if (booksToRemove.length >= 1) {
        let newList = list.toSpliced(indexOfRemovedBook, 1)
        return library = newList
    } return
}

function editPropertiesOfBook(index, newName, newAuthor, newStatus) {
    library[index].name = newName
    library[index].author = newAuthor
    library[index].status = newStatus
}

function findBook(list, name, author, status) {
    return list.filter((item) => item.name == name && item.author == author && item.status == status)
}


function findIndexOfBook(list, name, author, status) {
    return list.findLastIndex((item) => item.name == name && item.author == author && item.status == status)
}


// DOM ELEMENTS
function addBookElement(name, author, status) {
    const container = document.querySelector('.container-book')
    const itemBook = document.createElement('article')
    itemBook.className = 'book-item'
    itemBook.innerHTML = `
    <span class="book-item-title">${name}</span>
    <span class="book-item-author">${author}</span>
    <span class="book-item-status">${status}</span>
    `
    const containerOptions = document.createElement('div')
    containerOptions.className = 'book-item-options'
    
    const buttonCancel = document.createElement('button')
    buttonCancel.textContent = 'Remove'
    buttonCancel.addEventListener('click', e => removeBookElement(e))

    const buttonEdit = document.createElement('button')
    buttonEdit.textContent = 'Edit'

    buttonEdit.addEventListener('click', e => editBookElement(e))
    

    containerOptions.appendChild(buttonEdit)
    containerOptions.appendChild(buttonCancel)

    container.appendChild(itemBook)
    itemBook.appendChild(containerOptions)

}

document.querySelector('.container-edit form').addEventListener('submit', e => {
    let inputs = document.querySelectorAll('.container-edit form input')
    let editStatus = document.querySelector('#editStatus')

    e.preventDefault()
    if (validateForm(inputs, [true, true]) && elementToEdit != undefined) {
        const indexOfitem = findIndexOfBook(library, elementToEdit.name, elementToEdit.author, elementToEdit.status)
        const containerItem = document.querySelector('.container-book').children[indexOfitem]

        editPropertiesOfBook(indexOfitem,
            inputs[0].value,
            inputs[1].value,
            editStatus.value
        )

        containerItem.children[0].textContent = inputs[0].value
        containerItem.children[1].textContent = inputs[1].value
        containerItem.children[2].textContent = editStatus.value

        elementToEdit = undefined;
        document.querySelector('.mask').classList.toggle('hide')
        document.querySelector('.container-edit').classList.toggle('hide')
        eliminateInputValues(".container-edit")
    } else {
        validateForm(inputs, [true, true])
    }
})

function editBookElement(element) {
    const parentContainer = element.target.parentElement.parentElement

    const nameElement = parentContainer.children[0].textContent
    const authorElement = parentContainer.children[1].textContent
    const statusElement = parentContainer.children[2].textContent

    const editInputs = document.querySelectorAll('.container-edit form input')
    const editStatus = document.querySelector('#editStatus')

    //find element to edit
    const index = findIndexOfBook(library, nameElement, authorElement, statusElement)
    elementToEdit = library[index]

    // Rescribir valores del form
    editInputs[0].value = nameElement
    editInputs[1].value = authorElement
    editStatus.value = statusElement

    document.querySelector('.mask').classList.toggle('hide')
    document.querySelector('.container-edit').classList.toggle('hide')

    console.log(library)
}

function removeBookElement(element) {
    const parentContainer = element.target.parentElement.parentElement

    element.target.parentElement.parentElement.remove()
    removeBook(library,
        parentContainer.children[0].textContent,
        parentContainer.children[1].textContent,
        parentContainer.children[2].textContent)

    showList()
}

addBook('the Hobbit 2', "Tolkien", "Reading")
addBookElement('the Hobbit 2', "Tolkien", "Reading")

addBook('the Hobbit 5', "Tolkien5", "Reading")
addBookElement('the Hobbit 5', "Tolkien5", "Reading")
