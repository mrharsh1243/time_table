function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", function () {
    updateComputerTime();
    setInterval(updateComputerTime, 1000);
});

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

function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60;
}

function editActivity(button) {
    const row = button.parentNode.parentNode;
    const activityCell = row.querySelector('td:nth-child(2)');
    activityCell.focus();
}