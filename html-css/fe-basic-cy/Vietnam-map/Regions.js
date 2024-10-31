const BASE_URL = "http://localhost:8080/api/v1";
let map;
let markers = [];
let kmlLayer;

const getAllProvince = () => {
    $.ajax({
        url: `${BASE_URL}/administrative-regions`,
        type: "GET",
        success: function (data) {
            console.log("data", data);
            provinceTree(data);
            setupSearch(data);
            initializeMap();
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
                            <input type="checkbox" class="province-checkbox" data-lat="${province.latitude}" data-lng="${province.longitude}" data-code="${province.code_name}">
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
                        <input type="checkbox" class="province-checkbox" data-lat="${province.latitude}" data-lng="${province.longitude}" data-code="${province.code_name}">
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
    const code_name = checkbox.getAttribute('data-code');

    if (checkbox.checked) {
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindTooltip(name);
        marker.on('click', () => {
            if (marker.selected) {
                map.removeLayer(kmlLayer);
                marker.selected = false;
            } else {
                if (kmlLayer) {
                    map.removeLayer(kmlLayer);
                }
                kmlLayer = omnivore.kml(`./kml/${code_name}.kml`).addTo(map);
                marker.selected = true;
            }
        });
        markers.push({checkbox, marker});
    } else {
        const markerIndex = markers.findIndex(m => m.checkbox === checkbox);
        if (markerIndex !== -1) {
            map.removeLayer(markers[markerIndex].marker);
            markers.splice(markerIndex, 1);
        }
    }
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

function filterRainfall() {
    const year = document.getElementById('yearSelect').value;
    console.log('Filtering rainfall data for year:', year);
}