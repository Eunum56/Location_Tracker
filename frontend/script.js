async function getLocation() {
    if (navigator.geolocation) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            showPosition(position);
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Display position (Latitude and Longitude)
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Send the location to the backend (using async/await)
    sendLocationToBackend(latitude, longitude);
}

// Send location to backend using async/await
async function sendLocationToBackend(latitude, longitude) {
    try {
        const response = await fetch('https://youtube-videobackend.vercel.app/api/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ latitude, longitude })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Location stored successfully:', data);
    } catch (error) {
        console.error('Error storing location:', error);
    }
}

// Trigger the function to get the location
window.onload = getLocation;