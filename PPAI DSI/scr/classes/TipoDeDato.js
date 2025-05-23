export class TipoDeDato {
  constructor(denominacion, nombreUnidadMedida, valorUmbral) {
    this.denominacion = denominacion;
    this.nombreUnidadMedida = nombreUnidadMedida;
    this.valorUmbral = valorUmbral;
  }

  getDenominacion(){
	const denominacion = this.denominacion
	const nombreUnidadMedida = this.nombreUnidadMedida
	return {denominacion, nombreUnidadMedida}
  }
}