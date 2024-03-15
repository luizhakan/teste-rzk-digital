import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
})
export class CurrencySelectComponent implements OnInit {
  // Dicionário de códigos de moeda
  currencyCodes: { [key: string]: string } = {
    BRL: 'Real Brasileiro',
    USD: 'Dólar Americano',
    EUR: 'Euro',
    GBP: 'Libra Esterlina',
    JPY: 'Iene Japonês',
    AUD: 'Dólar Australiano',
    CAD: 'Dólar Canadense',
    CHF: 'França Suíça',
    CNY: 'Yuan Chinês',
    INR: 'Rupia Indiana',
    KRW: 'Won Sul-Coreano',
    MXN: 'Peso Mexicano',
    RUB: 'Rublo Russo',
    TRY: 'Lira Turca',
    ZAR: 'Rand Sul-Africano',
    HKD: 'Dólar de Hong Kong',
    SGD: 'Dólar de Singapura',
    SEK: 'Coroa Sueca',
    NOK: 'Coroa Norueguesa',
    DKK: 'Coroa Dinamarquesa',
    PLN: 'Zlotão',
    THB: 'Baht Tailandesa',
    IDR: 'Rupia Indonésia',
    MYR: 'Ringgit Malaio',
    AED: 'Dirham dos Emirados Árabes Unidos',
    AFN: 'Afegane Afegão',
    ALL: 'Lek Albanês',
    AMD: 'Dram Armênio',
    AOA: 'Kwanza Angolano',
    ARS: 'Peso Argentino',
    AWG: 'Florim Arubano',
    AZN: 'Manat Azeri',
    BAM: 'Marco Bósnio-Herzegovino',
    BBD: 'Dólar Barbadense',
    BDT: 'Taka Bangladeshi',
    BGN: 'Lev Búlgaro',
    BHD: 'Dinar Bareinita',
    BIF: 'Franco Burundinês',
    BND: 'Dólar do Brunei',
    BOB: 'Boliviano Boliviano',
    BOV: 'Mvdol Boliviano',
    BYN: 'Rublo Bielorrusso',
    BZD: 'Dólar Belizeano',
    CDF: 'Franco Congolês',
    CLP: 'Peso Chileno',
    COP: 'Peso Colombiano',
    CRC: 'Colon Costarriquenho',
    CUP: 'Peso Cubano',
    CVE: 'Escudo Cabo-Verdiano',
    CZK: 'Coroa Checa',
    DJF: 'Franco Djiboutiano',
    DOP: 'Peso Dominicano',
    DZD: 'Dinar Argelino',
    EGP: 'Libra Egípcia',
    ERN: 'Nakfa Eritreia',
    ETB: 'Birr Etíope',
    FJD: 'Dólar Fijiano',
    FKP: 'Libra das Ilhas Falkland',
    GEL: 'Lari Georgiano',
    GHS: 'Cedi Ganês',
    GIP: 'Libra de Gibraltar',
    GMD: 'Dalasi Gambiano',
    GNF: 'Franco Guineano',
    GTQ: 'Quetzal Guatemalteco',
    GYD: 'Dólar Guianense',
    HNL: 'Lempira Hondurenho',
    HRK: 'Kuna Croata',
    HTG: 'Gourde Haitiano',
    HUF: 'Forint Húngaro',
    ISK: 'Coroa Islandesa',
    JMD: 'Dólar Jamaicano',
    JOD: 'Dinar Jordaniano',
    KGS: 'Som Quirguiz',
    KHR: 'Riel Cambojano',
    KMF: 'Franco Comoriano',
    KPW: 'Won Norte-Coreano',
    KWD: 'Dinar Kuwaitiano',
    KYD: 'Dólar das Ilhas Cayman',
    KZT: 'Tenge Cazaque',
    LAK: 'Kip Laosiano',
    LBP: 'Libra Libanesa',
    LKR: 'Rúpia Sri Lanka',
    LLD: 'Dólar Libanês',
    LSL: 'Loti Lesoto',
    LTL: 'Litas Lituano',
    LVL: 'Lats Letão',
    LYD: 'Dinar Líbio',
    MAD: 'Dirham Marroquino',
    MDL: 'Leu Moldavo',
    MGA: 'Ariary Malgaxe',
    MKD: 'Dinar Macedônio',
    MMK: 'Kyat Mianmarense',
    MNT: 'Tugrik Mongol',
    MOP: 'Pataca Macaense',
    MRO: 'Ouguiya Mauritano',
    MUR: 'Rúpia Mauriciana',
    MVR: 'Rufiyaa Maldivana',
    MWK: 'Kwacha Malauiano',
    MZN: 'Metical Moçambicano',
    NAD: 'Dólar Namibiano',
    NGN: 'Naira Nigeriana',
    NIO: 'Córdoba Nicaraguense',
    NPR: 'Rúpia Nepalês',
  };

  // Variáveis para armazenar as moedas selecionadas
  selectedCurrency1!: string;
  selectedCurrency2!: string;

  // Flag para verificar se o campo de moeda está vazio
  campoVazio: boolean = true;

  ngOnInit(): void {
    // Inicialização padrão das moedas selecionadas
    this.selectedCurrency1 = 'BRL';
    this.selectedCurrency2 = 'BRL';
  }

  // Retorna uma lista de códigos de moeda
  getCurrencyCodes(): string[] {
    return Object.keys(this.currencyCodes);
  }

  // Manipulador de evento para alteração da primeira moeda selecionada
  onCurrency1Change(event: any): string {
    this.selectedCurrency1 = event.target.value;
    this.campoVazio = false;

    return this.selectedCurrency1.toString();
  }

  // Manipulador de evento para alteração da segunda moeda selecionada
  onCurrency2Change(event: any): string {
    this.selectedCurrency2 = event.target.value;
    this.campoVazio = false;

    return this.selectedCurrency2.toString();
  }

  // Emite os valores selecionados de moeda
  emitirValores() {
    const codigoMoeda = `${this.selectedCurrency1}-${this.selectedCurrency2}`;
    this.buscar.emit(codigoMoeda);
  }

  // Emite um evento para buscar a moeda selecionada
  buscarMoeda() {
    const codigoMoeda = `${this.selectedCurrency1}-${this.selectedCurrency2}`;
    this.buscar.emit(codigoMoeda);
  }

  // Evento de saída para buscar a moeda
  @Output() buscar = new EventEmitter<string>();

  // Evento de saída para limpar as seleções de moeda
  @Output() limpar = new EventEmitter<any>();
}
