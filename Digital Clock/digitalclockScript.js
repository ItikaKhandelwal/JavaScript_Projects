// First Method
// const clock = document.getElementById("clock");

// setInterval(function() {
//     let date = new Date();
//     clock.innerHTML = date.toLocaleTimeString();
// }, 1000);


// Second MEthod
// Call updateClock every second
setInterval(updateClock, 1000);

// Function to update and display the current time
function updateClock() {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    // Determine AM or PM and format to 12-hour format
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    // Add leading zero if needed
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    // Format the current time string
    const currentTime = `${hours}:${minutes}:${seconds} ${amPm}`;

    // Display the current time in the clock element
    document.getElementById("clock").textContent = currentTime;
}

// Initial call to display the time immediately
updateClock();
