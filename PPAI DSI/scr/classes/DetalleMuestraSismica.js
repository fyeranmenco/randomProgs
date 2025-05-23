import { TipoDeDato } from './TipoDeDato.js';

export class DetalleMuestraSismica {
  constructor(valor, tipoDeDato) {
    if (!(tipoDeDato instanceof TipoDeDato)) {
      throw new Error('El parametro "tipoDeDato" debe ser una instancia de la clase TipoDeDato');
    }

    this.valor = valor;
    this.tipoDeDato = tipoDeDato;
  }

  getTipoDeDato(){
	const valor = this.valor
	const tipoDato = this.tipoDeDato.getDenominacion()
	return {valor, tipoDato}
  }
}