
export default {
  supportTrackerRadialBar: {
    chartData: {
      pendingOrders: 50,
      drivingOrders: 43,
      completedOrders: 263,
      totalOrders: 356
    },
    series: [Math.round(263 / 356 * 100)],
    chartOptions: {
      plotOptions: {
        radialBar: {
          size: 150,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "65%"
          },
          track: {
            background: "#fff",
            strokeWidth: "100%"
          },
          dataLabels: {
            value: {
              offsetY: 30,
              color: "#99a2ac",
              fontSize: "2rem"
            }
          }
        }
      },
      colors: ["#EA5455"],
      fill: {
        type: "gradient",
        gradient: {
          // enabled: true,
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#7367F0"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 8
      },
      chart: {
        sparkline: {}
      },
      labels: ["Completed Orders"]
    }
  }
}
