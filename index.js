// Function to check if the audio stream is playing
function isAudioStreamPlaying() {
    const audio = document.querySelector('audio');
    return !audio.paused;
}

// Function to display or hide schedule based on audio stream status
function updateScheduleDisplay() {
    const scheduleContainer = document.getElementById('schedule');

    if (isAudioStreamPlaying()) {
        displaySchedule();
        scheduleContainer.style.display = 'block';
    } else {
        scheduleContainer.style.display = 'none';
    }
}

// Call the function to update schedule display based on audio stream status
window.addEventListener('load', function() {
    updateScheduleDisplay();

    // Periodically check the audio stream status
    setInterval(updateScheduleDisplay, 1000);
});
