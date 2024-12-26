// Create the map centered around a default location (e.g., London)
const map = L.map('map').setView([51.5074, -0.1278], 13); // Default to London

// Use OpenStreetMap tiles for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create a marker variable to represent the user's position
let userMarker;

// Try to get the user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Center the map at the user's location
            map.setView([userLocation.lat, userLocation.lng], 13);

            // Create a custom confirmation message in Bengali
            const confirmMessage = confirm("আপনার লোকেশন ফাইন্ড আউট করা হয়েছে, আপনি কি লাইভ রেকর্ড দেখতে চান?");
            
            // If the user agrees, show the location on the map with a pop-up
            if (confirmMessage) {
                // If the marker already exists, update its position, otherwise create a new one
                if (userMarker) {
                    userMarker.setLatLng([userLocation.lat, userLocation.lng]);
                } else {
                    userMarker = L.marker([userLocation.lat, userLocation.lng]).addTo(map)
                        .bindPopup("This is your current location. Welcome!")
                        .openPopup();
                }
            } else {
                alert("You chose not to view the live record.");
            }

        },
        function() {
            alert("Geolocation failed or is not supported by your browser.");
        }
    );
} else {
    alert("Geolocation is not supported by this browser.");
}