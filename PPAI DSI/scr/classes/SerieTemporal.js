import { MuestraSismica } from './MuestraSismica.js';
import { Sismografo } from './Sismografo.js';

export class SerieTemporal {
  constructor(condicionAlarma, fechaHoraInicioRegistroMuestras, fechaHoraRegistro, frecuenciaMuestreo, muestrasSismica, sismografo) {
    if (!Array.isArray(muestrasSismica)) {
      throw new Error('"muestras" debe ser un array de muestras ');
    }

    for (const muestra of muestrasSismica) {
      if (!(muestra instanceof MuestraSismica)) {
        throw new Error('"muestras" debe tener instancias de MuestraSismica');
      }
    }

    if (!(sismografo instanceof Sismografo)) {
      throw new Error('"sismografo" debe ser una instancia de la clase Sismografo');
    }

    this.condicionAlarma = condicionAlarma;
    this.fechaHoraInicioRegistroMuestras = fechaHoraInicioRegistroMuestras;
    this.fechaHoraRegistro = fechaHoraRegistro;
    this.frecuenciaMuestreo = frecuenciaMuestreo;
    this.muestrasSismica = muestrasSismica;
    this.sismografo = sismografo; 

  }
    getEstacionSismografica(){
      return this.sismografo.getCodigoEstacionSismologica()
    }
  
    getMuestrasSismicas(){
		let muestras = []
		this.muestrasSismica.forEach(m => {
			const fechaHoraMuestra = m.getFechaHoraMuestra()
			const detalles = m.getDetalleMuestra()
			muestras.push({fechaHoraMuestra, detalles})
		})
		return muestras
    }
}