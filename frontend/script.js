// Function to get the user's location
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
        const response = await fetch('https://location-tracker-gray.vercel.app/store-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude })
        });

        const data = await response.json();
        console.log('Location stored successfully:', data);
    } catch (error) {
        console.error('Error storing location:', error);
    }
}

// Trigger the function to get the location
window.onload = getLocation;