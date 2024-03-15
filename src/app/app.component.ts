import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { GraficoMoedaService } from './service/grafico-moeda.service';
import { Subscription, timer, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

// Interface para tipagem de opções do gráfico
export interface ChartOptions {
  series: any;
  chart: any;
  xaxis: any;
  title: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;

  // Variáveis de dados
  dados: number[] = [0];
  titulo: string = 'Cotação';
  categories: string[] = [];
  limpo: boolean = true;
  currentTime!: string;
  private unsubscribe: Subject<void> = new Subject<void>();
  private currentSubscription: Subscription | null = null;

  constructor(private graficoMoedaService: GraficoMoedaService) {
    // Inicialização das opções do gráfico
    this.initChartOptions();
  }

  // Inicialização das opções do gráfico
  private initChartOptions(): void {
    this.chartOptions = {
      series: [
        {
          name: this.titulo,
          data: this.dados,
          color: 'rgb(79,192,173)',
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        background: 'rgb(11,35,71)',
        foreColor: 'rgb(233,233,233)',
        dropShadow: {
          color: 'rgb(11,35,71)',
        },
      },
      title: {
        text: this.titulo,
        align: 'center',
        style: {
          color: 'rgb(233,233,233)',
        },
      },
      xaxis: {
        categories: this.categories,
        labels: {
          style: {
            colors: 'rgb(233,233,233)',
          },
        },
      },
    };
  }

  // Atualiza o horário atual
  private updateTime(): void {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}:${seconds}`;

    // Adiciona uma nova categoria se o tempo anterior for maior que 30 segundos
    if (this.categories.length > 0) {
      const lastTime = new Date(this.categories[this.categories.length - 1]);
      const diff = now.getTime() - lastTime.getTime();
      if (diff >= 30 * 100) {
        this.categories.push(this.currentTime);
      }
    }

    console.log("this.categories", this.categories);
  }

  // Atualiza o gráfico com os dados da moeda
  atualizarGraficoComIntervalo(moeda: any): void {
    // Define se os dados estão limpos ou não
    this.limpo = !moeda;

    // Cancela a subscrição anterior
    this.unsubscribe.next();

    if (!this.limpo) {
      const dataObs = timer(0, 30 * 1000).pipe(
        startWith(0),
        switchMap(() => {
          // Atualiza o tempo
          this.updateTime();
          return this.graficoMoedaService.getMoedas(moeda).pipe(takeUntil(this.unsubscribe));
        })
      );

      // Limpa os dados antigos
      this.dados = [];
      this.categories = [];

      if (this.currentSubscription) {
        this.currentSubscription.unsubscribe();
      }

      // Atualiza a subscrição
      this.currentSubscription = dataObs.subscribe((dados: any) => {

        if (dados && Object.keys(dados).length > 0) {
          const key = Object.keys(dados)[0];
          const code = dados[key].code;
          const codeIn = dados[key].codein;
          const codeMoreCodeIn = `${code}${codeIn}`;
          const name = dados[key].name;

          const valorBid = Number(dados[codeMoreCodeIn].bid);

          // Adiciona os novos dados aos arrays
          this.dados.push(valorBid);
          this.titulo = name;
          this.categories.push(this.currentTime);
          this.atualizarGrafico();
        } else {
          console.log('Nenhum dado encontrado');
        }
      });
    }
  }

  // Atualiza as opções do gráfico
  atualizarGrafico(): void {
    this.chartOptions = {
      series: [
        {
          name: this.titulo,
          data: this.dados,
          color: 'rgb(79,192,173)',
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        background: 'rgb(11,35,71)',
        foreColor: 'rgb(233,233,233)',
        dropShadow: {
          color: 'rgb(11,35,71)',
        },
      },
      title: {
        text: this.titulo,
        align: 'center',
        style: {
          color: 'rgb(233,233,233)',
        },
      },
      xaxis: {
        categories: this.categories,
        labels: {
          style: {
            colors: 'rgb(233,233,233)',
          },
        },
      },
    };
  }

  // Limpa os dados do gráfico
  limparDados(): void {
    this.limpo = true;
    this.dados = [];
    this.categories = [];
    this.atualizarGraficoComIntervalo('');

    if (this.limpo === true) {
      this.initChartOptions();
    }

    alert('Dados limpos com sucesso!');
  }

  // Destrói a subscrição quando o componente é destruído
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // Variáveis de opções do gráfico
  public chartOptions!: Partial<ChartOptions>;

  // Variáveis de controle
  private lastUpdateTime: number = 0;
}
