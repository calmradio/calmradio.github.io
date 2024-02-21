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
        }
    });
}

// Function to check if the audio stream is live
function isAudioStreamLive() {
    const audio = document.querySelector('audio');
    return !audio.paused && audio.readyState >= 2;
}

// Function to display schedule items if the audio stream is live
function displayScheduleIfLive() {
    if (isAudioStreamLive()) {
        displaySchedule();
    }
}

// Call the function to display schedule items if the audio stream is live
window.addEventListener('load', function() {
    displayScheduleIfLive();

    // Listen for changes in the audio stream state
    const audio = document.querySelector('audio');
    audio.addEventListener('play', displaySchedule);
    audio.addEventListener('pause', displaySchedule);
});
