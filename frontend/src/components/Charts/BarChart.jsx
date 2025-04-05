





import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ title, labels, data }) {
  const chartData = {
    labels,
    datasets: [{
      label: title,
      data,
      backgroundColor: '#3498db', // Your original blue color
      borderRadius: 4, // Matches your bar rounding
      barThickness: 20 // Controls bar width
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Matches your original (no legend)
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y}`; // Simple number display
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0 // No decimals like your original
        },
        grid: {
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false // No vertical grid lines
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
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}