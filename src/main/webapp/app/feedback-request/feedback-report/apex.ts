// import ApexCharts from 'apexcharts';
//
// interface ApexOptions {
//   chart: any;
//   stroke: any;
//   dataLabels: any;
//   tooltip: any;
//   grid: any;
//   series: any[];
//   colors?: string[];
//   markers?: any;
//   xaxis?: any;
//   yaxis?: any;
//   legend?: any;
//   plotOptions?: any;
//   labels?: string[];
//   fill?: any;
//   title?: any;
//   subtitle?: any;
// }
// window.Apex = {
//   chart: {
//     foreColor: '#ccc',
//     toolbar: {
//       show: false
//     },
//   },
//   stroke: {
//     width: 3
//   },
//   dataLabels: {
//     enabled: false
//   },
//   tooltip: {
//     theme: 'dark'
//   },
//   grid: {
//     borderColor: "#535A6C",
//     xaxis: {
//       lines: {
//         show: true
//       }
//     }
//   }
// };
//
//
// //
// // new ApexCharts(document.querySelector("#spark1"), spark1).render();
// // new ApexCharts(document.querySelector("#spark2"), spark2).render();
// // new ApexCharts(document.querySelector("#spark3"), spark3).render();
// // new ApexCharts(document.querySelector("#spark4"), spark4).render();
// //
// //
// // var optionsLine = {
// //   chart: {
// //     height: 328,
// //     type: 'line',
// //     zoom: {
// //       enabled: false
// //     },
// //     dropShadow: {
// //       enabled: true,
// //       top: 3,
// //       left: 2,
// //       blur: 4,
// //       opacity: 1,
// //     }
// //   },
// //   stroke: {
// //     curve: 'smooth',
// //     width: 2
// //   },
// //   //colors: ["#3F51B5", '#2196F3'],
// //   series: [{
// //     name: "Music",
// //     data: [1, 15, 26, 20, 33, 27]
// //   },
// //     {
// //       name: "Photos",
// //       data: [3, 33, 21, 42, 19, 32]
// //     },
// //     {
// //       name: "Files",
// //       data: [0, 39, 52, 11, 29, 43]
// //     }
// //   ],
// //   title: {
// //     text: 'Media',
// //     align: 'left',
// //     offsetY: 25,
// //     offsetX: 20
// //   },
// //   subtitle: {
// //     text: 'Statistics',
// //     offsetY: 55,
// //     offsetX: 20
// //   },
// //   markers: {
// //     size: 6,
// //     strokeWidth: 0,
// //     hover: {
// //       size: 9
// //     }
// //   },
// //   grid: {
// //     show: true,
// //     padding: {
// //       bottom: 0
// //     }
// //   },
// //   labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
// //   xaxis: {
// //     tooltip: {
// //       enabled: false
// //     }
// //   },
// //   legend: {
// //     position: 'top',
// //     horizontalAlign: 'right',
// //     offsetY: -20
// //   }
// // }
// //
// // var chartLine = new ApexCharts(document.querySelector('#line-adwords'), optionsLine);
// // chartLine.render();
// //
// // var optionsCircle4 = {
// //   chart: {
// //     type: 'radialBar',
// //     height: 350,
// //     width: 380,
// //   },
// //   plotOptions: {
// //     radialBar: {
// //       size: undefined,
// //       inverseOrder: true,
// //       hollow: {
// //         margin: 5,
// //         size: '48%',
// //         background: 'transparent',
// //
// //       },
// //       track: {
// //         show: false,
// //       },
// //       startAngle: -180,
// //       endAngle: 180
// //
// //     },
// //   },
// //   stroke: {
// //     lineCap: 'round'
// //   },
// //   series: [71, 63, 77],
// //   labels: ['June', 'May', 'April'],
// //   legend: {
// //     show: true,
// //     floating: true,
// //     position: 'right',
// //     offsetX: 70,
// //     offsetY: 240
// //   },
// // }
// //
// // var chartCircle4 = new ApexCharts(document.querySelector('#radialBarBottom'), optionsCircle4);
// // chartCircle4.render();
// //
// //
// // var optionsBar = {
// //   chart: {
// //     height: 380,
// //     type: 'bar',
// //     stacked: true,
// //   },
// //   plotOptions: {
// //     bar: {
// //       columnWidth: '30%',
// //       horizontal: false,
// //     },
// //   },
// //   series: [{
// //     name: 'PRODUCT A',
// //     data: [14, 25, 21, 17, 12, 13, 11, 19]
// //   }, {
// //     name: 'PRODUCT B',
// //     data: [13, 23, 20, 8, 13, 27, 33, 12]
// //   }, {
// //     name: 'PRODUCT C',
// //     data: [11, 17, 15, 15, 21, 14, 15, 13]
// //   }],
// //   xaxis: {
// //     categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
// //   },
// //   fill: {
// //     opacity: 1
// //   },
// //
// // }
// //
// // var chartBar = new ApexCharts(
// //   document.querySelector("#barchart"),
// //   optionsBar
// // );
// //
// // chartBar.render();
// //
// // var optionsArea = {
// //   chart: {
// //     height: 380,
// //     type: 'area',
// //     stacked: false,
// //   },
// //   stroke: {
// //     curve: 'straight'
// //   },
// //   series: [{
// //     name: "Music",
// //     data: [11, 15, 26, 20, 33, 27]
// //   },
// //     {
// //       name: "Photos",
// //       data: [32, 33, 21, 42, 19, 32]
// //     },
// //     {
// //       name: "Files",
// //       data: [20, 39, 52, 11, 29, 43]
// //     }
// //   ],
// //   xaxis: {
// //     categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2'],
// //   },
// //   tooltip: {
// //     followCursor: true
// //   },
// //   fill: {
// //     opacity: 1,
// //   },
// //
// // }
// //
// // var chartArea = new ApexCharts(
// //   document.querySelector("#areachart"),
// //   optionsArea
// // );
// //
// // chartArea.render();
// // window. = {
// //   chart: {
// //     foreColor: '#ccc',
// //     toolbar: {
// //       show: false
// //     },
// //   },
// //   stroke: {
// //     width: 3
// //   },
// //   dataLabels: {
// //     enabled: false
// //   },
// //   tooltip: {
// //     theme: 'dark'
// //   },
// //   grid: {
// //     borderColor: "#535A6C",
// //     xaxis: {
// //       lines: {
// //         show: true
// //       }
// //     }
// //   }
// // };
// //
// // const spark1: ApexOptions = {
// //   chart: {
// //     id: 'spark1',
// //     group: 'sparks',
// //     type: 'line',
// //     height: 80,
// //     sparkline: {
// //       enabled: true
// //     },
// //     dropShadow: {
// //       enabled: true,
// //       top: 1,
// //       left: 1,
// //       blur: 2,
// //       opacity: 0.2,
// //     }
// //   },
// //   series: [{
// //     data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
// //   }],
// //   stroke: {
// //     curve: 'smooth'
// //   },
// //   markers: {
// //     size: 0
// //   },
// //   grid: {
// //     padding: {
// //       top: 20,
// //       bottom: 10,
// //       left: 110
// //     }
// //   },
// //   colors: ['#fff'],
// //   tooltip: {
// //     x: {
// //       show: false
// //     },
// //     y: {
// //       title: {
// //         formatter: function formatter(val: any) {
// //           return '';
// //         }
// //       }
// //     }
// //   }
// // };
// //
// // // Define spark2, spark3, and spark4 similarly...
// //
// // new ApexCharts(document.querySelector("#spark1"), spark1).render();
// // new ApexCharts(document.querySelector("#spark2"), spark2).render();
// // new ApexCharts(document.querySelector("#spark3"), spark3).render();
// // new ApexCharts(document.querySelector("#spark4"), spark4).render();
// //
// // const optionsLine: ApexOptions = {
// //   chart: {
// //     height: 328,
// //     type: 'line',
// //     zoom: {
// //       enabled: false
// //     },
// //     dropShadow: {
// //       enabled: true,
// //       top: 3,
// //       left: 2,
// //       blur: 4,
// //       opacity: 1,
// //     }
// //   },
// //   stroke: {
// //     curve: 'smooth',
// //     width: 2
// //   },
// //   series: [{
// //     name: "Music",
// //     data: [1, 15, 26, 20, 33, 27]
// //   },
// //     {
// //       name: "Photos",
// //       data: [3, 33, 21, 42, 19, 32]
// //     },
// //     {
// //       name: "Files",
// //       data: [0, 39, 52, 11, 29, 43]
// //     }
// //   ],
// //   title: {
// //     text: 'Media',
// //     align: 'left',
// //     offsetY: 25,
// //     offsetX: 20
// //   },
// //   subtitle: {
// //     text: 'Statistics',
// //     offsetY: 55,
// //     offsetX: 20
// //   },
// //   markers: {
// //     size: 6,
// //     strokeWidth: 0,
// //     hover: {
// //       size: 9
// //     }
// //   },
// //   grid: {
// //     show: true,
// //     padding: {
// //       bottom: 0
// //     }
// //   },
// //   labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
// //   xaxis: {
// //     tooltip: {
// //       enabled: false
// //     }
// //   },
// //   legend: {
// //     position: 'top',
// //     horizontalAlign: 'right',
// //     offsetY: -20
// //   }
// // };
// //
// // const chartLine = new ApexCharts(document.querySelector('#line-adwords'), optionsLine);
// // chartLine.render();
// //
// // // Define and render other charts (optionsCircle4, optionsBar, optionsArea) similarly...
