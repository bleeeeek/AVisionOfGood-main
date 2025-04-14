import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

function DonationChart({ events }) {
  const totalAmount = events.reduce((sum, event) => sum + event.amountCollected, 0);
  
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(43, 28, 18, 0.8)',
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: function(context) {
            const event = events[context[0].dataIndex];
            return event.name;
          },
          label: function(context) {
            return `RM ${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'black',
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
            family: "'Inter', sans-serif"
          },
          maxRotation: 45,
          minRotation: 45,
          padding: window.innerWidth < 768 ? 15 : 10
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(139, 154, 71, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'black',
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
            family: "'Inter', sans-serif"
          },
          callback: function(value) {
            if (value === 0) return 'RM0';
            return 'RM' + (value/1000).toFixed(1) + 'k';
          },
          padding: 10,
          stepSize: 2000
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: '#fff'
      }
    }
  };

  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(139, 154, 71, 0.4)');
    gradient.addColorStop(1, 'rgba(139, 154, 71, 0)');
    return gradient;
  };

  const lineData = {
    labels: events.map(event => {
      const date = event.date.split(' - ')[0]; // Take the start date if it's a range
      // Convert to more readable format
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
      return formattedDate;
    }),
    datasets: [
      {
        data: events.map(event => event.amountCollected),
        borderColor: '#2b1c12',
        borderWidth: 2,
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx} = chart;
          return createGradient(ctx);
        },
        pointBackgroundColor: '#2b1c12',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#2b1c12',
        pointHoverRadius: 6,
        cubicInterpolationMode: 'monotone'
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: window.innerWidth < 768 ? 'bottom' : 'right',
        align: 'center',
        labels: {
          boxWidth: window.innerWidth < 768 ? 8 : 14,
          padding: window.innerWidth < 768 ? 5 : 15,
          color: '#2b1c12',
          font: {
            size: window.innerWidth < 768 ? 8 : 11,
            family: "'Inter', sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle',
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                // Truncate label if too long and add amount
                const truncatedLabel = window.innerWidth < 768 
                  ? (label.length > 10 ? label.substring(0, 10) + '...' : label)
                  : (label.length > 20 ? label.substring(0, 20) + '...' : label);
                return {
                  text: `${truncatedLabel} (RM${value.toLocaleString()})`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor,
                  lineWidth: data.datasets[0].borderWidth,
                  hidden: isNaN(data.datasets[0].data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      title: {
        display: false,
        text: 'Distribution of Funds',
        color: '#2b1c12',
        font: {
          size: window.innerWidth < 768 ? 16 : 24,
          family: "'Inter', sans-serif",
          weight: 500
        },
        padding: {
          top: 10,
          bottom: window.innerWidth < 768 ? 15 : 30
        },
        position: 'top',
        align: 'start'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = (value / totalAmount * 100).toFixed(1);
            return `${label}: RM${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        right: window.innerWidth < 768 ? 5 : 20,
        bottom: window.innerWidth < 768 ? 30 : 20,
        left: window.innerWidth < 768 ? 5 : 40
      }
    }
  };

  const pieData = {
    labels: events.map(event => 
      window.innerWidth < 768 && event.name.length > 12 
        ? event.name.substring(0, 12) + '...' 
        : event.name
    ),
    datasets: [
      {
        data: events.map(event => event.amountCollected),
        backgroundColor: [
          'rgba(139, 154, 71, 0.8)',  // Olive green
          'rgba(43, 28, 18, 0.8)',    // Brown
          'rgba(180, 190, 130, 0.8)', // Light olive
          'rgba(90, 70, 55, 0.8)',    // Light brown
          'rgba(160, 170, 110, 0.8)', // Medium olive
          'rgba(70, 50, 35, 0.8)',    // Medium brown
          'rgba(200, 210, 150, 0.8)', // Very light olive
          'rgba(110, 90, 75, 0.8)',   // Very light brown
          'rgba(120, 130, 70, 0.8)',  // Dark olive
          'rgba(60, 40, 25, 0.8)',    // Dark brown
          'rgba(150, 165, 90, 0.8)',  // Additional olive
          'rgba(80, 60, 45, 0.8)',    // Additional brown
          'rgba(190, 200, 140, 0.8)', // Additional light olive
          'rgba(100, 80, 65, 0.8)',   // Additional light brown
          'rgba(130, 140, 80, 0.8)',  // Additional dark olive
          'rgba(50, 30, 20, 0.8)',    // Additional dark brown
          'rgba(170, 180, 120, 0.8)', // Additional medium olive
        ],
        borderColor: '#ffffff',
        borderWidth: 1.5,
        hoverOffset: 10,
      }
    ]
  };

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      <div className="bg-[#2b1c12] p-4 md:p-8 rounded-xl shadow-lg text-center relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-15" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238B9A47' stroke-width='1'%3E%3Cpath d='M50 20L80 40L65 75H35L20 40z' /%3E%3Cpath d='M0 0L30 20L15 55H-15L-30 20z' /%3E%3Cpath d='M100 0L130 20L115 55H85L70 20z' /%3E%3Cpath d='M50 -30L80 -10L65 25H35L20 -10z' /%3E%3Cpath d='M50 70L80 90L65 125H35L20 90z' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
            backgroundRepeat: 'repeat'
          }}
        />
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%236B7A37' stroke-width='1' transform='rotate(72 50 50)'%3E%3Cpath d='M50 20L80 40L65 75H35L20 40z' /%3E%3Cpath d='M0 0L30 20L15 55H-15L-30 20z' /%3E%3Cpath d='M100 0L130 20L115 55H85L70 20z' /%3E%3Cpath d='M50 -30L80 -10L65 25H35L20 -10z' /%3E%3Cpath d='M50 70L80 90L65 125H35L20 90z' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
            backgroundRepeat: 'repeat'
          }}
        />
        <h2 className="text-xl md:text-2xl font-light mb-2 relative z-10 text-white">
          Total amount donated for the sake of <span className="font-arabic">الله</span>
        </h2>
        <p className="text-2xl md:text-4xl font-bold text-white relative z-10">
          MYR {totalAmount.toLocaleString()}
        </p>
      </div>    
    
      <div className="bg-gray-50 p-4 md:p-8 rounded-xl shadow-lg max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="h-[400px] md:h-[500px]">
            <Line options={lineOptions} data={lineData} />
          </div>
          <div className="h-[400px] md:h-[550px] pt-2">
            <Pie options={pieOptions} data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationChart;