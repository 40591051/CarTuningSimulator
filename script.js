// Object containing details of different car models
const carDetails = {
    senna: { image: 'senna.png', hp: '800', weight: '1198', grip: '1.9', turboAdded: false, tiresAdded: false, weightReduced: false },
    evo: { image: 'evo2.png', hp: '291', weight: '1540', grip: '1.1', turboAdded: false, tiresAdded: false, weightReduced: false },
    mustang: { image: '67 mustang.png', hp: '335', weight: '1630', grip: '0.8', turboAdded: false, tiresAdded: false, weightReduced: false }
};

// Index to track the current car being displayed
let currentCarIndex = 0;
// Array of car model keys from the carDetails object
const carKeys = Object.keys(carDetails);

// Event listener for DOMContentLoaded event to ensure the DOM is fully loaded before running code
document.addEventListener('DOMContentLoaded', function() {
    updateCarDisplay(); // Call function to update the car display initially
}); 

// Function to update the car display information
function updateCarDisplay() {
    const car = carDetails[carKeys[currentCarIndex]]; // Get current car details
    const carImageElement = document.getElementById('car-image'); // Access the car image element
    carImageElement.src = car.image; // Set source of the image
    carImageElement.alt = carKeys[currentCarIndex]; // Set alt text of the image

    // Update text content for hp, weight, and grip
    document.getElementById('hp').textContent = car.hp;
    document.getElementById('weight').textContent = car.weight;
    document.getElementById('grip').textContent = car.grip;

    updateStatBars(car); // Update the visual stat bars for the car
    updateButtonStates(); // Update the state of the buttons based on car properties
}

// Function to update the stat bars according to car's specifications
function updateStatBars(car) {
    const maxHp = 1000, maxWeight = 2000, maxGrip = 2.0; // Set maximum values for hp, weight, and grip
    const hpPercent = (car.hp / maxHp) * 100;
    const weightPercent = (car.weight / maxWeight) * 100;
    const gripPercent = (car.grip / maxGrip) * 100;

    // Set the width of the hp, weight, and grip bars to reflect the car's specs
    document.getElementById('hp-bar').style.width = `${Math.min(hpPercent, 100)}%`;
    document.getElementById('weight-bar').style.width = `${Math.min(weightPercent, 100)}%`;
    document.getElementById('grip-bar').style.width = `${Math.min(gripPercent, 100)}%`;
}

// Function to update the enable/disable state of modification buttons
function updateButtonStates() {
    const car = carDetails[carKeys[currentCarIndex]];
    document.getElementById('add-turbo').disabled = car.turboAdded;
    document.getElementById('add-tires').disabled = car.tiresAdded;
    document.getElementById('reduce-weight').disabled = car.weightReduced;
}

// Function to add turbo, enhancing the car's horsepower
function addTurbo() {
    const car = carDetails[carKeys[currentCarIndex]];
    if (!car.turboAdded) {
        const newHp = Math.min(parseInt(car.hp) + 100, 1000);
        car.hp = newHp.toString();
        car.turboAdded = true;
        updateCarDisplay(); // Update the display to reflect changes
    }
}

// Function to add performance tires, improving the car's grip
function addTires() {
    const car = carDetails[carKeys[currentCarIndex]];
    if (!car.tiresAdded) {
        car.grip = (parseFloat(car.grip) + 0.5).toFixed(1);
        car.tiresAdded = true;
        updateCarDisplay(); // Update the display to reflect changes
    } 
}

// Function to reduce the car's weight
function reduceWeight() {
    const car = carDetails[carKeys[currentCarIndex]];
    if (!car.weightReduced) {
        car.weight = Math.max(parseInt(car.weight) - 100, 0).toString();
        car.weightReduced = true;
        updateCarDisplay(); // Update the display to reflect changes
    }
}

// Function to change the current car based on user input (left or right)
function changeCar(direction) {
    currentCarIndex = (currentCarIndex + direction + carKeys.length) % carKeys.length;
    updateCarDisplay();
}
