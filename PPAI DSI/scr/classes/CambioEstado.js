import { Estado } from './Estado.js';

export class CambioEstado {
  constructor(fechaHoraInicio, fechaHoraFin, estado) {
    if (!(estado instanceof Estado)) {
      throw new Error('"estado" debe ser una instancia de la clase Estado');
    }

    this.fechaHoraInicio = fechaHoraInicio;
    this.fechaHoraFin = fechaHoraFin;
    this.estado = estado;
  }

  esEstadoActual() {
    return this.fechaHoraFin == null
  }

  getEstado() {
	return this.estado
  }

  setFechaYHoraFin(fechaHoraFin){
    this.fechaHoraFin = fechaHoraFin;
  }
}