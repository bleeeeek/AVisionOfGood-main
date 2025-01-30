import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function DonationChart({ events }) {

  const totalAmount = events.reduce((sum, event) => sum + event.amountCollected, 0);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Donations Collected Per Event',
        color: 'black',
        font: {
          size: window.innerWidth < 768 ? 16 : 24,
          family: "'Inter', sans-serif",
          weight: 300
        },
        padding: {
          top: 10,
          bottom: window.innerWidth < 768 ? 15 : 10
        }
      }
    },
    scales: {
      x: {
        ticks: { 
          color: 'black',
          font: {
            size: window.innerWidth < 768 ? 9 : 12,
            family: "'Inter', sans-serif"
          },
          maxRotation: 75,
          minRotation: 75,
          padding: window.innerWidth < 768 ? 20 : 5,
          autoSkip: false,
          align: 'end'
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: { 
          color: 'black',
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
            family: "'Inter', sans-serif"
          },
          callback: function(value) {
            if (value === 0) return 'RM0';
            if (window.innerWidth < 768) {
              return 'RM' + (value/1000).toFixed(1) + 'k';
            }
            return 'RM ' + (value/1000).toFixed(1) + 'k';
          },
          maxTicksLimit: window.innerWidth < 768 ? 6 : 8
        },
        title: {
          display: false
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    layout: {
      padding: {
        left: window.innerWidth < 768 ? 5 : 20,
        right: window.innerWidth < 768 ? 5 : 20,
        top: window.innerWidth < 768 ? 5 : 20,
        bottom: window.innerWidth < 768 ? 60 : 20
      }
    }
  };

  const data = {
    labels: events.map(event => event.name),
    datasets: [
      {
        data: events.map(event => event.amountCollected),
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#2b1c12',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: window.innerWidth < 768 ? 20 : 30
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'black',
          font: {
            family: "'Inter', sans-serif"
          }
        }
      },
      title: {
        display: true,
        text: 'Distribution of Donations',
        color: 'black',
        font: {
          size: 24,
          family: "'Inter', sans-serif",
          weight: 300
        }
      }
    }
  };

  const pieData = {
    labels: events.map(event => event.name),
    datasets: [
      {
        data: events.map(event => event.amountCollected),
        backgroundColor: events.map((event) => {
          // Find the max amount to calculate relative intensity
          const maxAmount = Math.max(...events.map(e => e.amountCollected));
          // Calculate opacity between 0.15 and 0.8 for more distinction
          const opacity = 0.15 + (event.amountCollected / maxAmount) * 0.65;
          return `rgba(139, 154, 71, ${opacity})`; // #8B9A47 with wider opacity range
        }),
        borderColor: events.map((event) => {
          // Find the max amount to calculate relative intensity
          const maxAmount = Math.max(...events.map(e => e.amountCollected));
          // Mix between lighter (#8B9A47) and much darker (#4B5A27) green for more contrast
          const ratio = event.amountCollected / maxAmount;
          const r = Math.round(139 - (ratio * (139 - 75))); // Bigger range for red
          const g = Math.round(154 - (ratio * (154 - 90))); // Bigger range for green
          const b = Math.round(71 - (ratio * (71 - 39)));   // Bigger range for blue
          return `rgb(${r}, ${g}, ${b})`;
        }),
        borderWidth: 1.5, // Slightly thicker border for better visibility
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[40vh] md:h-[50vh]">
          <Bar options={options} data={data} />
        </div>
        <div className="relative h-[40vh] md:h-[50vh]">
          <Pie options={pieOptions} data={pieData} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default DonationChart;