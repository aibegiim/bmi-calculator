document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    const resultDiv = document.getElementById('result');
    
    if (weight > 0 && height > 0) {
        const bmi = (weight / (height * height)).toFixed(1);
        let category, color;
        
        if (bmi < 16) {
            category = 'Выраженный дефицит массы тела';
            color = '#FF4444';
        } else if (bmi < 18.5) {
            category = 'Недостаточная масса тела';
            color = '#FF8888';
        } else if (bmi < 25) {
            category = 'Нормальная масса тела';
            color = '#00C851';
        } else if (bmi < 30) {
            category = 'Избыточная масса тела';
            color = '#FFBB33';
        } else if (bmi < 35) {
            category = 'Ожирение I степени';
            color = '#FF8800';
        } else if (bmi < 40) {
            category = 'Ожирение II степени';
            color = '#CC0000';
        } else {
            category = 'Ожирение III степени';
            color = '#990000';
        }
        
        resultDiv.innerHTML = Ваш ИМТ: ${bmi} (${category});
        updateChart(bmi, category, color);
    } else {
        resultDiv.innerHTML = 'Пожалуйста, введите корректные значения';
        clearChart();
    }
});

function updateChart(bmi, category, color) {
    const ctx = document.getElementById('bmiChart').getContext('2d');
    if (window.bmiChart) {
        window.bmiChart.destroy();
    }
    window.bmiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ваш ИМТ', 'Дефицит', 'Норма', 'Избыток', 'Ожирение I', 'Ожирение II', 'Ожирение III'],
            datasets: [{
                label: 'ИМТ',
                data: [bmi, 18.5, 25, 30, 35, 40, 45],
                backgroundColor: [color, '#FF8888', '#00C851', '#FFBB33', '#FF8800', '#CC0000', '#990000'],
                borderColor: ['#333', '#333', '#333', '#333', '#333', '#333', '#333'],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 50,
                    title: {
                        display: true,
                        text: 'Значение ИМТ'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Категории'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ${context.dataset.label}: ${context.raw};
                        }
                    }
                }
            }
        }
    });
}

function clearChart() {
    const ctx = document.getElementById('bmiChart').getContext('2d');
    if (window.bmiChart) {
        window.bmiChart.destroy();
    }
}
