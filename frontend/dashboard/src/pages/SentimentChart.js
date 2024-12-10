import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SentimentChart() {
  const [data, setData] = useState({ positive: 0, neutral: 0, negative: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Request: /sentiments")
    fetch('http://127.0.0.1:8000/testconnection')
      .then(response => response.json())
      .then(json => {
       alert(json.status)
      })
      .catch((error) => {
        console.error("Error fetching sentiments:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading... Note: Sentiments Analysis might take time (~ approx 2mins)</div>;

  const chartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiment Counts',
        data: [data.positive, data.neutral, data.negative],
        backgroundColor: ['green', 'gray', 'red']
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: '4Chan Sentiment Analysis for Job Market',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default SentimentChart;
