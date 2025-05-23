import { DetalleMuestraSismica } from './DetalleMuestraSismica.js';

export class MuestraSismica {
  constructor(fechaHoraMuestra, detalles) {
    if (!Array.isArray(detalles)) {
      throw new Error('El parametro "detalles" debe ser un array');
    }

    for (const detalle of detalles) {
      if (!(detalle instanceof DetalleMuestraSismica)) {
        throw new Error('el array "detalles" debe tener instancias de DetalleMuestraSismica');
      }
    }

    this.fechaHoraMuestra = fechaHoraMuestra;
    this.detalles = detalles;
  }
  	getFechaHoraMuestra() {
		return this.fechaHoraMuestra
	}

  getDetalleMuestra(){
	let detalles = []
	this.detalles.forEach(d => {
		detalles.push(d.getTipoDeDato())
	})
	return detalles 
  }     
}