import { EstacionSismologica } from './EstacionSismologica.js';

export class Sismografo {
  constructor(fechaAdquisicion, identificadorSismografo, nroSerie, estacionSismologica) {
    if (!(estacionSismologica instanceof EstacionSismologica)) {
      throw new Error('El parámetro "estacionSismologica" debe ser una instancia de la clase EstacionSismologica');
    }

    this.fechaAdquisicion = fechaAdquisicion;
    this.identificadorSismografo = identificadorSismografo;
    this.nroSerie = nroSerie;
    this.estacionSismologica = estacionSismologica;
  }

  getCodigoEstacionSismologica(){
    return this.estacionSismologica.getCodigoEstacion()
  }
}