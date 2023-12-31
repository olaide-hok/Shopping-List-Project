const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')

function addItem(e) {
    e.preventDefault()

    const newItem = itemInput.value

    // Validate Input Field
    if (newItem === '') {
        alert('Please add an item')
        return
    }

    // Create list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem))

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)

    itemList.appendChild(li)

    itemInput.value = ''
}

// Create Button Function
function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button
}

// Create Icon Function
function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}

// Remove item from the list
function removeItem(e) {
    // Event delegation
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove()
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
