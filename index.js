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

    let showsFound = false;

    scheduleData.forEach(item => {
        if (item.day === today && item.show.trim() !== '') { // Check if the "show" field is not empty
            const showItem = document.createElement('div');
            showItem.classList.add('show-item');
            showItem.innerHTML = `<strong>${item.day}</strong>: ${item.show} - ${item.time}`;
            scheduleContainer.appendChild(showItem);
            showsFound = true;
        }
    });

    if (!showsFound) {
        const noShowsMessage = document.createElement('div');
        noShowsMessage.classList.add('no-shows-message');
        noShowsMessage.textContent = 'No shows scheduled';
        scheduleContainer.appendChild(noShowsMessage);
    }
}

// Call the function to display schedule on page load
window.onload = function() {
    displaySchedule();
};
