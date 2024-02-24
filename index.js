// Function to fetch schedule data from JSON file
async function fetchSchedule() {
    try {
        const response = await fetch('schedule.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching schedule data:', error);
        return [];
    }
}

// Function to display schedule on the homepage
async function displaySchedule() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const scheduleData = await fetchSchedule();

    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = '';

    scheduleData.forEach(item => {
        if (item.day === today && item.shows.length > 0) { // Check if there are shows scheduled for today
            const showsList = document.createElement('ul');
            showsList.classList.add('shows-list');

            item.shows.forEach((show, index) => {
                const showItem = document.createElement('li');
                showItem.innerHTML = `<strong>${show}</strong> - ${item.times[index]}`;
                showsList.appendChild(showItem);
            });

            scheduleContainer.appendChild(showsList);

            // Display image if available
            if (item.image) {
                const imageElement = document.createElement('img');
                imageElement.src = item.image;
                imageElement.classList.add('schedule-image'); // Add a class to the image element
                scheduleContainer.appendChild(imageElement);
            }
        }
    });
}

// Call the function to display schedule on page load
window.onload = function() {
    displaySchedule();
};
