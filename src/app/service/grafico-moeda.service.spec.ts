import { TestBed } from '@angular/core/testing';

import { GraficoMoedaService } from './grafico-moeda.service';

describe('GraficoMoedaService', () => {
  let service: GraficoMoedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficoMoedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
