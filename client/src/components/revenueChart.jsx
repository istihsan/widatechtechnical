import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Paper,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import axios from 'axios'
import currencyFormatter from '../hooks/useCurrencyFormatter'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
)

const RevenueGraph = () => {
  const [revenueData, setRevenueData] = useState([])
  const [timeFrame, setTimeFrame] = useState('Daily')

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/revenue')
        const aggregatedData = response.data.reduce((acc, curr) => {
          let date
          if (timeFrame === 'Daily') {
            date = new Date(curr.date).toISOString().split('T')[0]
          } else if (timeFrame === 'Weekly') {
            const weekStart = new Date(curr.date)
            weekStart.setDate(weekStart.getDate() - weekStart.getDay())
            date = weekStart.toISOString().split('T')[0]
          } else if (timeFrame === 'Monthly') {
            date = new Date(curr.date).toISOString().split('T')[0].slice(0, 7)
          }

          if (!acc[date]) {
            acc[date] = { date, revenue: 0 }
          }
          acc[date].revenue += curr.revenue
          return acc
        }, {})

        setRevenueData(Object.values(aggregatedData))
      } catch (error) {
        console.error('Error fetching revenue data', error)
      }
    }

    fetchRevenueData()
  }, [timeFrame])

  const data = {
    labels: revenueData.map((item) => item.date),
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.map((item) => item.revenue),
        fill: false,
        borderColor: '#1976d2',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue Over Time',
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
        pan: {
          enabled: true,
          mode: 'xy',
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: timeFrame === 'Monthly' ? 'Month' : 'Date',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Revenue (Rupiah)',
        },
        ticks: {
          callback: (value) => currencyFormatter(value),
        },
      },
    },
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: '90%',
        maxHeight: '75%',
        margin: 'auto',
        marginTop: '2%',
      }}
    >
      <Box p={4}>
        <Typography variant="h6" gutterBottom>
          Your {timeFrame} Revenue
        </Typography>
        <ToggleButtonGroup
          value={timeFrame}
          exclusive
          onChange={(event, newTimeFrame) => {
            if (newTimeFrame) setTimeFrame(newTimeFrame)
          }}
          aria-label="time frame"
        >
          <ToggleButton value="Daily" aria-label="Daily">
            Daily
          </ToggleButton>
          <ToggleButton value="Weekly" aria-label="Weekly">
            Weekly
          </ToggleButton>
          <ToggleButton value="Monthly" aria-label="Monthly">
            Monthly
          </ToggleButton>
        </ToggleButtonGroup>
        <Line data={data} options={options} />
      </Box>
    </Paper>
  )
}

export default RevenueGraph
