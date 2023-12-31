const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')

function displayItems() {
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach((item) => addItemToDOM(item))
    checkUI()
}

function onAddItemSubmit(e) {
    e.preventDefault()

    const newItem = itemInput.value

    // Validate Input Field
    if (newItem === '') {
        alert('Please add an item')
        return
    }

    // Create item DOM element
    addItemToDOM(newItem)

    // Add item to local storage
    addItemToStorage(newItem)

    // Check if items are present.
    checkUI()

    // Set input field to empty string
    itemInput.value = ''
}

function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)

    // Add li item to list in the DOM
    itemList.appendChild(li)
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

// Add Item to Local Storage
function addItemToStorage(item) {
    let itemsFromStorage = getItemsFromStorage()

    // Add new item to array
    itemsFromStorage.push(item)

    // Convert to JSON string and store/set in local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

// Get all items from local storage
function getItemsFromStorage() {
    let itemsFromStorage

    // Check if item already exists in local storage
    if (localStorage.getItem('items') == null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage
}

// Remove item from the list
function removeItem(e) {
    // Event delegation
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure you want to remove item?')) {
            e.target.parentElement.parentElement.remove()
            checkUI()
        }
    }
}

// Clear the shopping list
function clearItems() {
    if (confirm('Are you sure you want to clear all items?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild)
        }
        checkUI()
    }
}

// Filter items
function filterItems(e) {
    const items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase()

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase()

        if (itemName.indexOf(text) !== -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })
}

// Remove filter and clear all button from UI when list items is empty
function checkUI() {
    const items = itemList.querySelectorAll('li')

    if (items.length === 0) {
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }
}

// Initialize App
function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', removeItem)
    clearBtn.addEventListener('click', clearItems)
    itemFilter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI()
}

init()
