// Search function
function searchTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const cards = Array.from(document.querySelectorAll('.card'));
    let found = false; // Flag to track if any results are found

    cards.forEach(card => {
        const cardData = Array.from(card.querySelectorAll('[data-search]')).map(cell => cell.getAttribute('data-search').toUpperCase());
        const match = cardData.some(value => value.includes(filter));
        card.style.display = match ? 'block' : 'none';

        if (match) {
            found = true; // At least one result is found
        }
    });

    const searchResultMessage = document.getElementById('searchResultMessage');
    if (!found) {
        searchResultMessage.style.display = 'block'; 
    } else {
        searchResultMessage.style.display = 'none';
}

// sort function
let ascendingOrder = true;


const sortImage = document.getElementById('sortImage');
const cardContainer = document.querySelector('.card-container'); 

// Function to sort items in ascending or descending order
function sortItems() {
    const cards = Array.from(cardContainer.querySelectorAll('.card'));
    cards.sort((a, b) => {
        const aValue = a.querySelector('h2').textContent.trim();
        const bValue = b.querySelector('h2').textContent.trim();

        if (ascendingOrder) {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });

    cards.forEach(card => cardContainer.appendChild(card));

    // Toggle the sorting order for the next click
    ascendingOrder = !ascendingOrder;


    if (ascendingOrder) {
        sortImage.src = 'asc-icon.png'; // Replace with your ascending icon
    } else {
        sortImage.src = 'desc-icon.png'; // Replace with your descending icon
    }
}

// Add a click event listener to the image
sortImage.addEventListener('click', sortItems);
}