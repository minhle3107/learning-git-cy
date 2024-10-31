const BASE_URL = "http://localhost:8080/api/v1";
let map;
let markers = [];
let kmlLayers = {};
let provinces = [];
let selectedYear;

const getAllProvince = () => {
    $.ajax({
        url: `${BASE_URL}/administrative-regions`,
        type: "GET",
        success: function (data) {
            console.log("data", data);
            provinces = data;
            provinceTree(data);
            setupSearch(data);
            initializeMap();
            populateProvinceDropdowns(data); //
        },
        error: function (error) {
            console.log("error: ", error);
        }
    });
}

getAllProvince();

const initializeMap = () => {
    map = L.map('map').setView([21.028511, 105.804817], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
};

const createTree = (data, searchTerm = '') => {
    let html = '<ul>';

    data.forEach(region => {
        if (searchTerm) {
            region.provinces.forEach(province => {
                if (province.name.toLowerCase().includes(searchTerm)) {
                    html += `
                        <li>
                            <input type="checkbox" class="province-checkbox" data-lat="${province.latitude}" data-lng="${province.longitude}" data-code-name="${province.code_name}">
                            ${province.name}
                        </li>
                    `;
                }
            });
        } else {
            html += `
                <li>
                    <input type="checkbox" class="region-checkbox">
                    <i class="bi bi-caret-right-fill me-2"></i>
                    <span style="cursor: pointer;">${region.name}</span>
                    <ul style="display: none;">
            `;

            region.provinces.forEach(province => {
                html += `
                    <li>
                        <input type="checkbox" class="province-checkbox" data-lat="${province.latitude}" data-lng="${province.longitude}" data-code-name="${province.code_name}">
                        ${province.name}
                    </li>
                `;
            });

            html += '</ul></li>';
        }
    });

    html += '</ul>';
    return html;
};

const provinceTree = (provinces, searchTerm = '') => {
    const regionTree = document.getElementById('regionTree');
    regionTree.innerHTML = createTree(provinces, searchTerm);

    if (!searchTerm) {
        document.querySelectorAll('#regionTree > ul > li > span').forEach(span => {
            span.addEventListener('click', function () {
                const ul = this.nextElementSibling;
                const icon = this.previousElementSibling;
                ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
                icon.classList.toggle('bi-caret-down-fill');
                icon.classList.toggle('bi-caret-right-fill');
            });
        });

        document.querySelectorAll('.region-checkbox').forEach(regionCheckbox => {
            regionCheckbox.addEventListener('change', function () {
                const provinceCheckboxes = this.parentElement.querySelectorAll('.province-checkbox');
                provinceCheckboxes.forEach(provinceCheckbox => {
                    provinceCheckbox.checked = this.checked;
                    toggleMarker(provinceCheckbox);
                });
            });
        });
    }

    document.querySelectorAll('.province-checkbox').forEach(provinceCheckbox => {
        provinceCheckbox.addEventListener('change', function () {
            toggleMarker(this);
        });
    });
};

const toggleMarker = (checkbox) => {
    const lat = checkbox.getAttribute('data-lat');
    const lng = checkbox.getAttribute('data-lng');
    const name = checkbox.nextSibling.textContent.trim();
    const code_name = checkbox.getAttribute('data-code-name');
    const province = provinces.flatMap(region => region.provinces).find(p => p.code_name === code_name);
    const rainfallData = province.rainfallData.find(data => data.year === selectedYear);

    if (checkbox.checked) {
        const marker = L.marker([lat, lng]).addTo(map);

        if (selectedYear) {
            marker.bindTooltip(`${name} - Rainfall in ${selectedYear}: ${rainfallData ? rainfallData.rainfall_amount : 'N/A'} mm`);
        } else {
            marker.bindTooltip(`${name}`);
        }

        marker.on('click', () => {
            if (marker.selected) {
                if (kmlLayers[code_name]) {
                    map.removeLayer(kmlLayers[code_name]);
                }
                marker.selected = false;
            } else {
                if (kmlLayers[code_name]) {
                    map.removeLayer(kmlLayers[code_name]);
                }
                kmlLayers[code_name] = omnivore.kml(`./kml/${code_name}.kml`).addTo(map);
                marker.selected = true;
            }
        });
        markers.push({checkbox, marker});
    } else {
        const markerIndex = markers.findIndex(m => m.checkbox === checkbox);
        if (markerIndex !== -1) {
            map.removeLayer(markers[markerIndex].marker);
            if (kmlLayers[code_name]) {
                map.removeLayer(kmlLayers[code_name]);
                delete kmlLayers[code_name];
            }
            markers.splice(markerIndex, 1);
        }
    }
};

const filterRainfall = () => {
    selectedYear = parseInt(document.getElementById('yearSelect').value, 10);
    markers.forEach(({checkbox, marker}) => {
        map.removeLayer(marker);
    });
    markers = [];
    document.querySelectorAll('.province-checkbox:checked').forEach(checkbox => {
        toggleMarker(checkbox);
    });
};

const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

const setupSearch = (data) => {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(function () {
        const searchTerm = this.value.toLowerCase();
        const filteredData = data.map(region => {
            return {
                ...region,
                provinces: region.provinces.filter(province => province.name.toLowerCase().includes(searchTerm))
            };
        }).filter(region => region.provinces.length > 0);
        provinceTree(filteredData, searchTerm);
    }, 300));
};

document.getElementById('yearSelect').addEventListener('change', filterRainfall);

let routeControl = null;

const populateProvinceDropdowns = (provinces) => {
    const startProvinceSelect = document.getElementById('startProvince');
    const endProvinceSelect = document.getElementById('endProvince');

    provinces.forEach(region => {
        region.provinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province.code_name;
            option.textContent = province.name;
            startProvinceSelect.appendChild(option.cloneNode(true));
            endProvinceSelect.appendChild(option);
        });
    });
};

const getProvinceByCodeName = (codeName) => {
    return provinces.flatMap(region => region.provinces).find(p => p.code_name === codeName);
};

document.getElementById('calculateDistanceBtn').addEventListener('click', () => {
    const startProvinceCode = document.getElementById('startProvince').value;
    const endProvinceCode = document.getElementById('endProvince').value;

    if (!startProvinceCode || !endProvinceCode) {
        alert('Please select both start and end provinces.');
        return;
    }

    const startProvince = getProvinceByCodeName(startProvinceCode);
    const endProvince = getProvinceByCodeName(endProvinceCode);

    if (!startProvince || !endProvince) {
        alert('Invalid province selection.');
        return;
    }

    const lat1 = startProvince.latitude;
    const lon1 = startProvince.longitude;
    const lat2 = endProvince.latitude;
    const lon2 = endProvince.longitude;

    if (routeControl) {
        map.removeControl(routeControl);
    }

    routeControl = L.Routing.control({
        waypoints: [
            L.latLng(lat1, lon1),
            L.latLng(lat2, lon2)
        ],
        routeWhileDragging: true
    }).addTo(map);

    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    alert(`Distance between ${startProvince.name} and ${endProvince.name}: ${distance.toFixed(2)} km`);
});

document.getElementById('clearRouteBtn').addEventListener('click', () => {
    if (routeControl) {
        map.removeControl(routeControl);
        routeControl = null;
    }
    document.getElementById('startProvince').value = '';
    document.getElementById('endProvince').value = '';
    alert('Route and distance cleared.');
});