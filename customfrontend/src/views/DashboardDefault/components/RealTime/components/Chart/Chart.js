import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  }
}));

const Chart = props => {
  const { data: dataProp, labels, className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        label: 'Views',
        backgroundColor: 'rgba(255,255,255,0.4)',
        data: dataProp
      }
    ],
    labels
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cornerRadius: 20,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [
        {
          stacked: false,
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.9,
          categoryPercentage: 1,
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            display: false
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks: {
        legend: () => {},
        title: () => {},
        label: tooltipItem => {
          let label = `Views: ${tooltipItem.yLabel}`;

          return label;
        }
      }
    }
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
};

Chart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired
};

export default Chart;
