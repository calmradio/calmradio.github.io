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
        if (item.day === today) {
            for (let i = 0; i < item.shows.length; i++) {
                const showItem = document.createElement('div');
                showItem.classList.add('show-item');
                showItem.innerHTML = `<strong>${item.day}</strong>: ${item.shows[i]} - ${item.times[i]}`;
                scheduleContainer.appendChild(showItem);
            }
        }
    });
}

// Call the function to display schedule on page load
window.onload = function() {
    displaySchedule();
};
