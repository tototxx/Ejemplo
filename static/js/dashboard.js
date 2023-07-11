$(function () {


  // =====================================
  // Profit
  // =====================================

  // Grafico de barras azul
  var chart = {
    series: [
      { name: "Earnings this month:", data: [355, 390, 300, 350, 390, 180, 355, 390] },
      { name: "Expense this month:", data: [280, 250, 325, 215, 250, 310, 280, 250] },
    ],

    chart: {
      type: "bar",
      height: 345,
      offsetX: -15,
      toolbar: { show: true },
      foreColor: "#adb0bb",
      fontFamily: 'inherit',
      sparkline: { enabled: false },
    },


    colors: ["#5D87FF", "#49BEFF"],


    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all'
      },
    },
    markers: { size: 0 },

    dataLabels: {
      enabled: false,
    },


    legend: {
      show: false,
    },


    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    xaxis: {
      type: "category",
      categories: ["16/08", "17/08", "18/08", "19/08", "20/08", "21/08", "22/08", "23/08"],
      labels: {
        style: { cssClass: "grey--text lighten-2--text fill-color" },
      },
    },


    yaxis: {
      show: true,
      min: 0,
      max: 400,
      tickAmount: 4,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 3,
      lineCap: "butt",
      colors: ["transparent"],
    },


    tooltip: { theme: "light" },

    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
            }
          },
        }
      }
    ]


  };

  var chart = new ApexCharts(document.querySelector("#chart"), chart);
  chart.render();


  // =====================================
  // Breakup
  // =====================================

  // Grafico circular de las zonas
  var breakup = {
    color: "#adb5bd",
    series: [45, 35, 20],
    labels: ["Cardozos", "San Pedro", "Vuelta la Barranca"],
    chart: {
      width: 180,
      type: "donut",
      fontFamily: "Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
        },
      },
    },
    stroke: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    colors: ["#5D87FF", "#ecf2ff", "#F9F9FD"],

    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 150,
          },
        },
      },
    ],
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  var chart = new ApexCharts(document.querySelector("#breakup"), breakup);
  chart.render();



  // =====================================
  // Earning
  // =====================================
  var earning = {
    chart: {
      id: "sparkline3",
      type: "area",
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
    },
    series: [
      {
        name: "Earnings",
        color: "#49BEFF",
        data: [25, 66, 20, 40, 12, 58, 20],
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: ["#f3feff"],
      type: "solid",
      opacity: 0.05,
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };
  new ApexCharts(document.querySelector("#earning"), earning).render();
})

///////////////////////////////////////////////////////////////////

//Grafico de barras de muchos colores
var option = {
  series: [{
  name: 'Net Profit',
  data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
}, {
  name: 'Revenue',
  data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
}, {
  name: 'Free Cash Flow',
  data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
}],
  chart: {
  type: 'bar',
  height: 350
},
plotOptions: {
  bar: {
    horizontal: false,
    columnWidth: '55%',
    endingShape: 'rounded'
  },
},
dataLabels: {
  enabled: false
},
stroke: {
  show: true,
  width: 2,
  colors: ['transparent']
},
xaxis: {
  categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
},
yaxis: {
  title: {
    text: '$ (thousands)'
  }
},
fill: {
  opacity: 1
},
tooltip: {
  y: {
    formatter: function (val) {
      return "$ " + val + " thousands"
    }
  }
}
};

var chart = new ApexCharts(document.querySelector("#chart2"), option);
chart.render();


/////////////////////////////////////////
/////////////////////////////////////////
var options = {
  series: [{
  data: makeData()
}],
  chart: {
  id: 'barYear',
  height: 400,
  width: '100%',
  type: 'bar',
  events: {
    dataPointSelection: function (e, chart, opts) {
      var quarterChartEl = document.querySelector("#chart-quarter");
      var yearChartEl = document.querySelector("#chart-year");

      if (opts.selectedDataPoints[0].length === 1) {
        if (quarterChartEl.classList.contains("active")) {
          updateQuarterChart(chart, 'barQuarter')
        } else {
          yearChartEl.classList.add("chart-quarter-activated")
          quarterChartEl.classList.add("active");
          updateQuarterChart(chart, 'barQuarter')
        }
      } else {
        updateQuarterChart(chart, 'barQuarter')
      }

      if (opts.selectedDataPoints[0].length === 0) {
        yearChartEl.classList.remove("chart-quarter-activated")
        quarterChartEl.classList.remove("active");
      }

    },
    updated:  function (chart) {
      updateQuarterChart(chart, 'barQuarter')
    }
  }
},
plotOptions: {
  bar: {
    distributed: true,
    horizontal: true,
    barHeight: '75%',
    dataLabels: {
      position: 'bottom'
    }
  }
},
dataLabels: {
  enabled: true,
  textAnchor: 'start',
  style: {
    colors: ['#fff']
  },
  formatter: function (val, opt) {
    return opt.w.globals.labels[opt.dataPointIndex]
  },
  offsetX: 0,
  dropShadow: {
    enabled: true
  }
},

colors: colors,

states: {
  normal: {
    filter: {
      type: 'desaturate'
    }
  },
  active: {
    allowMultipleDataPointsSelection: true,
    filter: {
      type: 'darken',
      value: 1
    }
  }
},
tooltip: {
  x: {
    show: false
  },
  y: {
    title: {
      formatter: function (val, opts) {
        return opts.w.globals.labels[opts.dataPointIndex]
      }
    }
  }
},
title: {
  text: 'Yearly Results',
  offsetX: 15
},
subtitle: {
  text: '(Click on bar to see details)',
  offsetX: 15
},
yaxis: {
  labels: {
    show: false
  }
}
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

var optionsQuarter = {
  series: [{
  data: []
}],
  chart: {
  id: 'barQuarter',
  height: 400,
  width: '100%',
  type: 'bar',
  stacked: true
},
plotOptions: {
  bar: {
    columnWidth: '50%',
    horizontal: false
  }
},
legend: {
  show: false
},
grid: {
  yaxis: {
    lines: {
      show: false,
    }
  },
  xaxis: {
    lines: {
      show: true,
    }
  }
},
yaxis: {
  labels: {
    show: false
  }
},
title: {
  text: 'Quarterly Results',
  offsetX: 10
},
tooltip: {
  x: {
    formatter: function (val, opts) {
      return opts.w.globals.seriesNames[opts.seriesIndex]
    }
  },
  y: {
    title: {
      formatter: function (val, opts) {
        return opts.w.globals.labels[opts.dataPointIndex]
      }
    }
  }
}
};

var chartQuarter = new ApexCharts(document.querySelector("#chart-quarter"), optionsQuarter);
chartQuarter.render();


chart.addEventListener('dataPointSelection', function (e, chart, opts) {
var quarterChartEl = document.querySelector("#chart-quarter");
var yearChartEl = document.querySelector("#chart-year");

if (opts.selectedDataPoints[0].length === 1) {
  if(quarterChartEl.classList.contains("active")) {
    updateQuarterChart(chart, 'barQuarter')
  }
  else {
    yearChartEl.classList.add("chart-quarter-activated")
    quarterChartEl.classList.add("active");
    updateQuarterChart(chart, 'barQuarter')
  }
} else {
    updateQuarterChart(chart, 'barQuarter')
}

if (opts.selectedDataPoints[0].length === 0) {
  yearChartEl.classList.remove("chart-quarter-activated")
  quarterChartEl.classList.remove("active");
}

})

chart.addEventListener('updated', function (chart) {
updateQuarterChart(chart, 'barQuarter')
})

document.querySelector("#model").addEventListener("change", function (e) {
chart.updateSeries([{
  data: makeData()
}])
})


/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////


var optionsCircle1 = {
  chart: {
    type: 'radialBar',
    height: 266,
    zoom: {
      enabled: false
    },
    offsetY: 20
  },
  colors: ['#E91E63'],
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: 0
        }
      }
    }
  },
  series: [65],
  theme: {
    monochrome: {
      enabled: false
    }
  },
  legend: {
    show: false
  },
  title: {
    text: 'Bounce Rate',
    align: 'left'
  }
}

var chartCircle1 = new ApexCharts(document.querySelector('#radialBar1'), optionsCircle1);
chartCircle1.render();


