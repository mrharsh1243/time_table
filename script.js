function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60;
}

function updateComputerTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    document.getElementById('computer-time').textContent = `Computer Time: ${formattedTime}`;

    const events = document.querySelectorAll('.event');
    const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    events.forEach(event => {
        const timeRange = event.getAttribute('data-time').split('-');
        const start = parseTime(timeRange[0]);
        const end = parseTime(timeRange[1]);

        if (currentTime >= start && currentTime <= end) {
            event.classList.add('highlight');
        } else {
            event.classList.remove('highlight');
        }
    });
}

function setNotification(message, timeInSeconds) {
    setTimeout(() => {
        alert(message);
    }, timeInSeconds * 1000);
}

function scheduleNotifications() {
    const events = document.querySelectorAll('.event');
    const currentTime = new Date();

    events.forEach(event => {
        const timeRange = event.getAttribute('data-time').split('-');
        const start = parseTime(timeRange[0]);
        const end = parseTime(timeRange[1]);

        const activity = event.querySelector('td:nth-child(2)').textContent;
        const startNotificationMessage = `Activity Alert: "${activity}" is starting soon!`;
        const endNotificationMessage = `Activity Alert: "${activity}" is ending in 5 minutes!`;

        if (currentTime >= start && currentTime <= end) {
            setNotification(endNotificationMessage, end - currentTime);
        } else if (currentTime < start) {
            setNotification(startNotificationMessage, start - currentTime - 300); // Show 5-minute advance notification
        }
    });
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", function () {
    updateComputerTime();
    setInterval(updateComputerTime, 1000);

    scheduleNotifications();
});
