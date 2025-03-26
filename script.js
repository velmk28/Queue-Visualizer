// Array-based Queue with a maximum size of 5
let arrayQueue = [];

// Linked List-based Queue class
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.address = Math.floor(Math.random() * 10000); // Random "memory address"
    }

    displayData() {
        return `${this.value} | ${this.address}`;
    }
}

class LinkedListQueue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0; // Track the size of the linked list queue
    }

    enqueue(value) {
        let newNode = new Node(value);
        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++; // Increment the size on enqueue
    }

    dequeue() {
        if (!this.head) return null;
        let dequeuedValue = this.head.value;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        this.size--; // Decrement the size on dequeue
        return dequeuedValue;
    }

    searchByData(data) {
        let current = this.head;
        let position = 1; // Start from 1 for user-friendly indexing
        while (current) {
            if (current.value === data) return position;
            current = current.next;
            position++;
        }
        return -1;
    }

    searchByPosition(position) {
        let current = this.head;
        let index = 1; // Start from 1
        while (current) {
            if (index === position) return current.value;
            current = current.next;
            index++;
        }
        return null;
    }

    toArray() {
        let result = [];
        let current = this.head;
        while (current) {
            result.push(current.displayData());
            current = current.next;
        }
        return result;
    }

    isEmpty() {
        return this.head === null;
    }

    getSize() {
        return this.size; // Return the size of the queue
    }
}

let linkedListQueue = new LinkedListQueue();

// Function to display a common message
function displayCommonMessage(message) {
    const commonMessageElement = document.getElementById('commonMessage');
    commonMessageElement.innerText = message;
}

// Functions for array-based queue
function pushArray() {
    const value = parseInt(document.getElementById('inputValue').value);
    if (!isNaN(value)) {
        if (arrayQueue.length < 5) { // Limit to 5 elements
            arrayQueue.push(value);
            updateArrayQueueDisplay();
            displayCommonMessage(`Node ${value} was added to the array queue.`);
        } else {
            alert('Array queue is full.');
            displayCommonMessage('Cannot add node: Array queue is full.');
        }
    } else {
        alert('Invalid input. Please enter a number.');
        displayCommonMessage('Invalid input for array queue push.');
    }
}

function popArray() {
    if (arrayQueue.length > 0) {
        const removedValue = arrayQueue.shift(); // Remove the first element
        updateArrayQueueDisplay();
        displayCommonMessage(`Node ${removedValue} was removed from the array queue.`);
    } else {
        displayCommonMessage('Array queue is empty, nothing to remove.');
    }
}

function updateArrayQueueDisplay() {
    const arrayQueueElement = document.getElementById('arrayQueue');
    arrayQueueElement.innerHTML = '';

    if (arrayQueue.length === 0) {
        document.getElementById('arrayQueueMessage').style.display = 'block';
    } else {
        document.getElementById('arrayQueueMessage').style.display = 'none';

        // Display the numbers
        arrayQueue.forEach((value) => {
            const numberBox = document.createElement('div');
            numberBox.className = 'number-box';
            numberBox.innerText = value;
            arrayQueueElement.appendChild(numberBox);
        });

        // Create and display Rear label below the last node
        const rearLabel = document.createElement('div');
        rearLabel.className = 'rear-label';
        rearLabel.innerText = 'Rear';
        rearLabel.style.textAlign = 'center'; // Center the text
        arrayQueueElement.appendChild(rearLabel);

        // Create and display Front label above the first node
        const frontLabel = document.createElement('div');
        frontLabel.className = 'front-label';
        frontLabel.innerText = 'Front';
        frontLabel.style.textAlign = 'center'; // Center the text
        arrayQueueElement.insertBefore(frontLabel, arrayQueueElement.firstChild);
    }
}

// Functions for linked list-based queue
function pushLinkedList() {
    const value = parseInt(document.getElementById('inputValueLinkedList').value);
    if (!isNaN(value)) {
        linkedListQueue.enqueue(value);
        updateLinkedListQueueDisplay();
        displayCommonMessage(`Node ${value} was added to the linked list queue.`);
    } else {
        alert('Invalid input. Please enter a number.');
        displayCommonMessage('Invalid input for linked list queue push.');
    }
}

function popLinkedList() {
    if (!linkedListQueue.isEmpty()) {
        const removedValue = linkedListQueue.dequeue();
        updateLinkedListQueueDisplay();
        displayCommonMessage(`Node ${removedValue} was removed from the linked list queue.`);
    } else {
        displayCommonMessage('Linked list queue is empty, nothing to remove.');
    }
}

function updateLinkedListQueueDisplay() {
    const linkedListQueueElement = document.getElementById('linkedListQueue');
    linkedListQueueElement.innerHTML = '';

    if (linkedListQueue.isEmpty()) {
        document.getElementById('linkedListQueueMessage').style.display = 'block';
    } else {
        document.getElementById('linkedListQueueMessage').style.display = 'none';
        const nodes = linkedListQueue.toArray();

        // Add head arrow and label for the first node
        const headContainer = document.createElement('div');
        headContainer.style.display = 'flex';
        headContainer.style.alignItems = 'center';

        const headArrow = document.createElement('img');
        headArrow.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><polygon points="18,6 24,12 18,18" /></svg>'; // Head Arrow SVG
        headArrow.className = 'head-arrow';
        headContainer.appendChild(headArrow);

        const headLabel = document.createElement('span');
        headLabel.innerText = 'Head';
        headLabel.style.marginLeft = '5px'; // Add some spacing
        headContainer.appendChild(headLabel);

        linkedListQueueElement.appendChild(headContainer);

        nodes.forEach((data, index) => {
            const numberBox = document.createElement('div');
            numberBox.className = 'number-box';
            numberBox.innerText = data;

            // Append number box to linked list queue display
            linkedListQueueElement.appendChild(numberBox);

            // Add arrow if it's not the last node
            if (index < nodes.length - 1) {
                const arrow = document.createElement('img');
                arrow.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><line x1="0" y1="12" x2="24" y2="12" /><polygon points="18,6 24,12 18,18" /></svg>'; // Arrow SVG
                arrow.className = 'arrow';

                // Create a container to hold the numberBox and arrow
                const container = document.createElement('div');
                container.style.display = 'flex';
                container.style.alignItems = 'center';

                // Append the number box and arrow to the container
                container.appendChild(numberBox);
                container.appendChild(arrow);

                // Append the container to the linked list queue display
                linkedListQueueElement.appendChild(container);
            } else {
                // For the last node, just append the number box without the arrow
                linkedListQueueElement.appendChild(numberBox);
            }
        });

        // Add tail arrow and label for the last node
        const tailContainer = document.createElement('div');
        tailContainer.style.display = 'flex';
        tailContainer.style.alignItems = 'center';

        const tailArrow = document.createElement('img');
        tailArrow.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><line x1="0" y1="12" x2="24" y2="12" /><polygon points="6,6 0,12 6,18" /></svg>'; // Tail Arrow SVG
        tailArrow.className = 'tail-arrow';
        tailContainer.appendChild(tailArrow);

        const tailLabel = document.createElement('span');
        tailLabel.innerText = 'Tail';
        tailLabel.style.marginLeft = '5px'; // Add some spacing
        tailContainer.appendChild(tailLabel);

        linkedListQueueElement.appendChild(tailContainer);
    }

    document.getElementById('linkedListSizeMessage').innerText = `Size: ${linkedListQueue.getSize()}`;
}

// Search functions for array-based queue
// Search functions for array-based queue
function searchInArrayByData() {
    const data = parseInt(document.getElementById('searchArrayValue').value);
    const position = arrayQueue.indexOf(data);
    if (position !== -1) {
        highlightArrayQueue(position); // Highlight the node
        displayCommonMessage(`Node ${data} found at position ${position}.`); // Position is 0-based
    } else {
        alert('Data not found in the array queue.');
        displayCommonMessage(`Node ${data} not found in the array queue.`);
    }
}

function searchInArrayByPosition() {
    const position = parseInt(document.getElementById('searchArrayPosition').value);

    // Check if the position is valid for 0-based indexing
    if (position >= 0 && position < arrayQueue.length) {
        highlightArrayQueue(position); // Highlight the element at the given position (0-based)
        displayCommonMessage(`Node found at position ${position}: ${arrayQueue[position]}.`); // Position is 0-based
    } else {
        alert('Invalid position.');
        displayCommonMessage('Invalid position in the array queue search.');
    }
}



function highlightArrayQueue(position) {
    const arrayQueueElement = document.getElementById('arrayQueue');
    const numberBoxes = arrayQueueElement.getElementsByClassName('number-box');

    // Clear previous highlights
    for (let i = 0; i < numberBoxes.length; i++) {
        numberBoxes[i].classList.remove('highlight');
    }

    // Highlight the correct node box
    if (position >= 0 && position < numberBoxes.length) {
        numberBoxes[position].classList.add('highlight');
    }
}


// Search functions for linked list-based queue
function searchInLinkedListByData() {
    const data = parseInt(document.getElementById('searchLinkedListValue').value);
    const position = linkedListQueue.searchByData(data);
    if (position !== -1) {
        highlightLinkedListQueue(position - 1); // Highlight using 0-based index
        displayCommonMessage(`Node ${data} found at position ${position}.`);
    } else {
        alert('Data not found in the linked list queue.');
        displayCommonMessage(`Node ${data} not found in the linked list queue.`);
    }
}

function searchInLinkedListByPosition() {
    const position = parseInt(document.getElementById('searchLinkedListPosition').value);

    // Ensure the position is a valid 1-based index for user-friendly searching
    if (position >= 1) {
        const value = linkedListQueue.searchByPosition(position);
        if (value !== null) {
            highlightLinkedListQueue(position - 1); // Highlight the node at the given position (convert to 0-based)
            displayCommonMessage(`Node found at position ${position}: ${value}.`);
        } else {
            alert('Invalid position.');
            displayCommonMessage('Invalid position in the linked list queue search.');
        }
    } else {
        alert('Invalid position.');
        displayCommonMessage('Invalid position in the linked list queue search.');
    }
}

function highlightLinkedListQueue(position) {
    const linkedListQueueElement = document.getElementById('linkedListQueue');
    const numberBoxes = linkedListQueueElement.getElementsByClassName('number-box');

    // Clear previous highlights
    for (let i = 0; i < numberBoxes.length; i++) {
        numberBoxes[i].classList.remove('highlight');
    }

    // Highlight the correct node box
    if (position >= 0 && position < numberBoxes.length) {
        numberBoxes[position].classList.add('highlight');
    }
}
