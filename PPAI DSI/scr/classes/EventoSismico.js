import { ClasificacionSismo } from './clasificacionSismo.js';
import { OrigenDeGeneracion } from './OrigenDeGeneracion.js';
import { AlcanceSismo } from './AlcanceSismo.js';
import { Estado } from './Estado.js';
import { CambioEstado } from './CambioEstado.js';
import { SerieTemporal } from './SerieTemporal.js';

export class EventoSismico {
    constructor(
      fechaHoraFin,
      fechaHoraOcurrencia,
      latitudEpicentro,
      longitudEpicentro,
      latitudHipocentro,
      longitudHipocentro,
      valorMagnitud,
      clasificacion,
      origenGeneracion,
      alcanceSismo,
      estadoActual,
      cambiosEstado,
      seriesTemporales
    ) {
      if (!(clasificacion instanceof ClasificacionSismo)) {
        throw new Error('"clasificacion" debe ser una instancia de ClasificacionSismo');
      }
      if (!(origenGeneracion instanceof OrigenDeGeneracion)) {
        throw new Error('"origenGeneracion" debe ser una instancia de OrigenDeGeneracion');
      }
      if (!(alcanceSismo instanceof AlcanceSismo)) {
        throw new Error('"alcanceSismo" debe ser una instancia de AlcanceSismo');
      }
      if (!(estadoActual instanceof Estado)) {
        throw new Error('"estadoActual" debe ser una instancia de Estado');
      }
      if (!Array.isArray(cambiosEstado)) {
        throw new Error('"cambiosEstado" debe ser un array');
      }
      for (const cambio of cambiosEstado) {
        if (!(cambio instanceof CambioEstado)) {
          throw new Error('"cambiosEstado" debe ser una instancia de CambioEstado');
        }
      }
      if (!Array.isArray(seriesTemporales)) {
        throw new Error('"seriesTemporales" debe ser un array de SeriesTemporales');
      }
      for (const serie of seriesTemporales) {
        if (!(serie instanceof SerieTemporal)) {
          throw new Error('"seriesTemporales" debe ser una instancia de SerieTemporal');
        }
      }
  
      this.fechaHoraFin = fechaHoraFin;
      this.fechaHoraOcurrencia = fechaHoraOcurrencia;
      this.latitudEpicentro = latitudEpicentro;
      this.longitudEpicentro = longitudEpicentro;
      this.latitudHipocentro = latitudHipocentro;
      this.longitudHipocentro = longitudHipocentro;
      this.valorMagnitud = valorMagnitud;
      this.clasificacion = clasificacion;
      this.origenGeneracion = origenGeneracion;
      this.alcanceSismo = alcanceSismo;
      this.estadoActual = estadoActual;
      this.cambiosEstado = cambiosEstado;
      this.seriesTemporales = seriesTemporales;


      
    }

	estaAutoDetectado() {
		this.cambiosEstado.forEach(c => {
			if (c.esEstadoActual()) {
				return c.getEstado().esAutoDetectado()
			}
		})
	}

	estaPendienteRevision() {
		let bandera = false
		this.cambiosEstado.forEach(c => {
			if (c.esEstadoActual()) {
				bandera = c.getEstado().estaPendienteRevision()
			}
		})
		return bandera
	}

	getCambioEstadoActual(){
		let actual = null
		this.cambiosEstado.forEach(c => {
			if (c.esEstadoActual()) {
				actual = c
			}
		})
	return actual; // Si ninguno cumple la condición
	}

	cambiarEstadoBloqueado(estadoBloqueado,fechaHoraActual){
	const cambioEstadoActual = this.getCambioEstadoActual();
	cambioEstadoActual.setFechaYHoraFin(fechaHoraActual)
	const bloqueado = new CambioEstado(fechaHoraActual, null, estadoBloqueado);
	this.cambiosEstado.push(bloqueado)
	this.setEstadoActual(estadoBloqueado)
	}

	setEstadoActual(estadoActual){
		this.estadoActual = estadoActual;
	}

	getDatosEventoSismico(){
		const alcanceSismo = this.getAlcance()
		const clasificacion = this.getClasificacion()
		const origenGeneracion = this.getOrigenGeneracion()
		const valorMagnitud = this.getValorMagnitud()
		const fechaHoraOcurrencia = this.getFechaHoraOcurrencia()
		return {fechaHoraOcurrencia, alcanceSismo, clasificacion, origenGeneracion, valorMagnitud}
	}

	getDatosSeriesTemporales(){
		let series = []
		this.seriesTemporales.forEach(s => {
			const muestras = s.getMuestrasSismicas()
			const estacion = s.getEstacionSismografica()
			series.push({muestras, estacion})
		})
		return series
	}

	getAlcance(){
	return this.alcanceSismo.getNombre()
	}
	getClasificacion(){
	return this.clasificacion.getNombre() 
	}
	getOrigenGeneracion(){
	return this.origenGeneracion.getNombre()
	}


	cambiarEstadoRechazado(fechahoraActual,estadoRechazado){
	const cambioActual = this.getCambioEstadoActual()
	cambioActual.setFechaYHoraFin(fechahoraActual)
	const cambioNew = new CambioEstado(fechahoraActual, null, estadoRechazado);
	this.cambiosEstado.push(cambioNew)
	this.setEstadoActual(estadoRechazado)
	}


	setMagnitud(magnitud){
	this.valorMagnitud = magnitud

	}
	setOrigen(Origen){
	this.origenGeneracion = Origen

	}
	setAlcance(alcance){
	this.alcanceSismo = alcance
	}

	getLongitudHipocentro()
	{
	return this.longitudHipocentro 
	}

	getLatitudHipocentro()
	{
	return this.latitudHipocentro 
	}

	getLongitudEpicentro()
	{
	return this.longitudEpicentro 
	}

	getLatitudEpicentro()
	{
	return this.latitudEpicentro 
	}

	getFechaHoraOcurrencia(){
	return this.fechaHoraOcurrencia 
	}
	getValorMagnitud(){
	return this.valorMagnitud
	}

}


