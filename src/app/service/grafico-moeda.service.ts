import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotacao, GraficoMoeda } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class GraficoMoedaService {
  private readonly API: string = 'https://economia.awesomeapi.com.br/last';

  constructor(private http: HttpClient) { }

  getMoedas(moeda: string): Observable<GraficoMoeda> {
    const url = `${this.API}/${moeda}`;
    return this.http.get<GraficoMoeda>(url);
  }

}
