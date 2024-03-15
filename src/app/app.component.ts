import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { GraficoMoedaService } from './service/grafico-moeda.service';
import { GraficoMoeda } from './interface/interface';
import { interval, startWith, switchMap } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  title = 'teste-rzk-digital';
  dados: number[] = [];
  arrayBid: string[] = [];
  currentTime!: string;
  categories: string[] = [];

  updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}:${seconds}`;

    if (
      this.categories.length === 0 ||
      Date.now() - this.lastUpdateTime > 2000
    ) {
      this.categories.push(this.currentTime);
      this.lastUpdateTime = Date.now();
    }
  }

  atualizarGraficoComIntervalo(): void {
    this.lastUpdateTime = 0;

    const dataObs = interval(30 * 1000).pipe(
      startWith(0),
      switchMap(() => this.graficoMoedaService.getMoedas('brl-thb'))
    );

    const timeObs = interval(30 * 1000);

    dataObs.subscribe((dados: GraficoMoeda) => {
      if (dados && Object.keys(dados).length > 0) {
        const key = Object.keys(dados)[0];
        const code = dados[key].code;
        const codeIn = dados[key].codein;
        const codeMoreCodeIn = `${code}${codeIn}`;

        console.log('codeMoreCodeIn', codeMoreCodeIn);

        // Extrai o valor de 'bid' e converte para número
        let valorBid = Number(dados[codeMoreCodeIn].bid);
        console.log('valorBid:', valorBid);
        this.dados = [...this.dados, valorBid];
        this.atualizarGrafico();
      } else {
        console.log('Nenhum dado encontrado');
      }
    });

    timeObs.subscribe(() => this.updateTime());
  }

  atualizarGrafico() {
    this.chartOptions = {
      series: [
        {
          name: 'My-series',
          data: this.dados,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      title: {
        text: 'Cotação moedas',
      },
      xaxis: {
        categories: this.categories,
      },
    };
  }

  ngOnInit(): void {
    this.atualizarGraficoComIntervalo();
  }

  constructor(private graficoMoedaService: GraficoMoedaService) {
    this.categories = [];

    this.chartOptions = {
      series: [
        {
          name: 'My-series',
          data: this.dados,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      title: {
        text: 'Cotação moedas',
      },
      xaxis: {
        categories: [],
      },
    };
  }

  lastUpdateTime: number = 0;
}
