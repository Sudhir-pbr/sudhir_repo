import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({ title, labels, data }) {
  // Color scheme matching your original HTML
  const backgroundColors = [
    '#2ecc71', // green
    '#f39c12', // orange
    '#3498db', // blue
    '#e74c3c', // red
    '#9b59b6', // purple
    '#1abc9c', // teal
    '#95a5a6'  // gray
  ];

  const chartData = {
    labels,
    datasets: [{
      data,
      backgroundColor: backgroundColors,
      borderWidth: 0,
      cutout: '70%' // Matches your original donut thickness
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 12
          },
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button className="text-blue-600 text-sm">Export</button>
      </div>
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}