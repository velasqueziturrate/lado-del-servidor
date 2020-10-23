var map = L.map('main_map').setView([-34.601242, -58.3861], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result) {
        console.log(result)
        result.bicicletas.map((e, i) => {
            L.marker(e.ubicacion, { title: e.id }).addTo(map)
        })
    }
})