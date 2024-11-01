const url = new URL(window.location.href);

const code = url.searchParams.get('code');

console.log(code);

const BASE_URL = "http://localhost:8080/api/v1";


const getRainfallByProvince = (code) => {

    $.ajax({
        url: `${BASE_URL}/provinces/${code}`,
        type: 'GET',
        success: function (data) {
            console.log(data)

            data.rainfallData.sort((a, b) => a.year - b.year);

            console.log(data)

            const labels = data.rainfallData.map(y => y.year);

            const rainfallProvince = data.rainfallData.map(y => y.rainfall_amount);

            drawBarChartOfProvincialRainfall(labels, rainfallProvince, data.name)

            drawLineChartOfProvincialRainfall(labels, rainfallProvince)


        },
        error: function (error) {
            console.log(error)
        }
    })

}

getRainfallByProvince(code);

const drawBarChartOfProvincialRainfall = (labels, data, province) => {
    const ctx = document.getElementById('barChart');

    const nameChart = document.getElementById('name-province-simple');

    nameChart.textContent = `Biểu đồng lượng mưa - ${province}`

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rainfall by year',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

const drawLineChartOfProvincialRainfall = (labels, data) => {

    const ctxLine = document.getElementById('lineChart');

    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rainfall by year',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]

        }
    });

}

// Lấy danh sách province
const getAllProvince = () => {

    $.ajax({
        url: `${BASE_URL}/provinces`,
        type: 'GET',
        success: function (data) {

            const provincesData = data?.map(province => {
                return {
                    code: province.code,
                    name: province.name,
                    code_name: province.code_name
                };
            })

            console.log(provincesData)
            populateSelectElements(provincesData);


        },
        error: function (error) {
            console.log(error)
        }
    })

}

getAllProvince()

const populateSelectElements = (provincesData) => {
    const startProvinceSelect = document.getElementById('firstProvince');
    const endProvinceSelect = document.getElementById('secondProvince');

    provincesData.forEach(province => {
        const option = document.createElement('option');
        option.value = province.code;
        option.textContent = province.name;

        if (province.code === code) {
            option.selected = true;
        }

        startProvinceSelect.appendChild(option.cloneNode(true));
        endProvinceSelect.appendChild(option);
    });
};

document.getElementById('compareRainfallBtn').addEventListener('click', () => {
    const firstProvinceValue = document.getElementById('firstProvince').value;
    const secondProvinceValue = document.getElementById('secondProvince').value;

    const codeIds = [firstProvinceValue, secondProvinceValue];

    console.log('codeIds:', codeIds);

    $.ajax({
        url: `${BASE_URL}/provinces/compare-rainfall`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ codeIds: codeIds }),
        success: function (data) {
            console.log(data);
            renderHtmlCompareRainfall();
            drawBarChartCompareProvinces(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
});

const drawBarChartCompareProvinces = (data) => {
    const ctxComparisonChart = document.getElementById('comparisonChart').getContext('2d');

    const labels = ['2020', '2021', '2022', '2023'];
    const colors = [
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(54, 162, 235, 0.2)'
    ];
    const borderColors = [
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(54, 162, 235, 1)'
    ];

    const datasets = data.map((province, index) => {
        return {
            label: province.name,
            data: province.rainfallData.sort((a, b) => a.year - b.year).map(r => r.rainfall_amount),
            backgroundColor: colors[index % colors.length],
            borderColor: borderColors[index % borderColors.length],
            borderWidth: 1
        };
    });

    new Chart(ctxComparisonChart, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

const renderHtmlCompareRainfall = () => {
    const compareRainfall = document.getElementById('compare-rainfall');

    compareRainfall.innerHTML = `<div class="row my-5">
                    <div class="col-12 px-3 border">
                        <div class="card-body">
                            <canvas id="comparisonChart"></canvas>
                        </div>
                        <div class="card-footer my-3 text-center"><span>So sánh lượng mưa giữa các tỉnh</span></div>
                    </div>
                </div>`;
};

document.getElementById('clearComparisonBtn').addEventListener('click', () => {
    document.getElementById('firstProvince').value = '';
    document.getElementById('secondProvince').value = '';
    document.getElementById('compare-rainfall').innerHTML = '';
});