var map = L.map('main_map').setView([-34.571249, -58.427353], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([-34.5825, -58.4343]).addTo(map);
L.marker([-34.5650, -58.4273]).addTo(map);
L.marker([-34.57882, -58.41579]).addTo(map);