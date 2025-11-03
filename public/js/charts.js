const ctx = document.getElementById('fundingChart');
if (ctx) {
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Funding', 'Investments'],
      datasets: [{
        data: [95, 5],
        backgroundColor: ['#0d6efd', '#ffc107'],
      }]
    }
  });
}