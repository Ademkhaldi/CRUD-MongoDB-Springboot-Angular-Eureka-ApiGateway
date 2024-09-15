import { Component, OnInit } from '@angular/core';
import { KPIDataService } from 'app/KPI/KPIdata.service';
import { EmailDataCamembertService } from 'app/Camembert/emaildatacamembert.service';
import { LineChartService } from 'app/Linear/linechart.service';
import { AreaUseractivityService } from 'app/Area/Areauseractivity.service';
import Chart from 'chart.js';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  chart: Chart;
  emailData: any; // Initialize with empty array
  lineChartData: any;

  capacity: string;
  revenue: string;
  errors: string;
  followers: string;

  constructor(private emailDataCamembertService: EmailDataCamembertService, private lineChartService: LineChartService, private areauserActivityService: AreaUseractivityService, private KPIdataService: KPIDataService) { }

  ngOnInit() {
    this.KPIdataService.getDataKPI().subscribe(data => {
      this.capacity = data.capacity;
      this.revenue = data.revenue;
      this.errors = data.errors;
      this.followers = data.followers;
    });

    this.areauserActivityService.getAreaUserActivityData().subscribe(data => {
      this.createArea(data);
    });

    this.emailDataCamembertService.getEmailDataCamabert().subscribe(data => {
      this.emailData = data;
      this.createChart();
    });

    this.lineChartService.getLineChartData().subscribe(data => {
      this.lineChartData = data;
      this.createLineChart();
    });
  }

  createChart() {
    const labels = this.emailData.map(stat => stat.label);
    const values = this.emailData.map(stat => stat.value);

    const backgroundColors = labels.map(() => this.getRandomColor());

    this.chart = new Chart('chartEmail', {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Emails',
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: backgroundColors,
          borderWidth: 0,
          data: values
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                var label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y;
                }
                return label;
              }
            }
          }
        },
        legend: {
          position: 'bottom',
          align: 'start',
          labels: {
            usePointStyle: true, // Utiliser le style de point (cercle)
            boxWidth: 10 // Taille des cercles dans la légende
          }
        }
    
      }
    });
  }

  createLineChart() {
    const canvas = document.getElementById("lineChartCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const lineChartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    const lineChart = new Chart(ctx, {
      type: 'line',
      hover: false,
      data: {
        labels: this.lineChartData.labels,
        datasets: this.lineChartData.datasets
      },
      options: lineChartOptions
    });
  }

  createArea(data: any): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("chartHours");
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }
          }],
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
        elements: {
          line: {
            fill: true // Fills the area under the line
          }
        }
      }
    });
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  
    return color;
  }
}  


