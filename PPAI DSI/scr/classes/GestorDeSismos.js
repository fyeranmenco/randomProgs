export class GestorDeSismos {
	constructor(estados, sesion, eventosSismicos, alcances, origenes) {
		this.estados = estados
		this.sesion = sesion
		this.eventosSismicos = eventosSismicos
		this.alcances = alcances
		this.origenes = origenes
	}

    	setBoundary(boundary) {
		this.boundary = boundary
	}

    buscarEventosNoRevisados() {
		let eventosNoRevisados = []
		this.eventosSismicos.forEach(e => {
			if (!e.estaPendienteRevision()) {}
			else {
				eventosNoRevisados.push(e)
			}
		})
		this.boundary.mostrarEventosNoRevisados(eventosNoRevisados)
    }

	seleccionarEventoSismico(evento, esVuelta = false) {
		if(!esVuelta) this.bloquearEventoSismico(evento)
		const datosEventoSismico = this.obtenerDatosEventoSismico(evento)
		const datosSeriesTemporales = this.obtenerSeriesTemporales(evento)
		this.boundary.mostrarDatosEventoSismico(evento, {datosEventoSismico, datosSeriesTemporales})
	}

	bloquearEventoSismico(evento) {
		this.estados.forEach(e => {
			if (e.esAmbitoEventoSismico() && e.esBloqueadoEnRevision()) {
				this.estadoBloqueadoEnRevision = e
				return
			}
		})
		this.obtenerFechaYHora()
		evento.cambiarEstadoBloqueado(this.estadoBloqueadoEnRevision, this.fechaHoraActual)
	}

	obtenerFechaYHora() {
		this.fechaHoraActual = new Date()
	}

	obtenerDatosEventoSismico(evento) {
		return evento.getDatosEventoSismico()
	}

	obtenerSeriesTemporales(evento) {
		return evento.getDatosSeriesTemporales()
	}

	rechazarEventoSismico(evento) {
		this.buscarEstadoParaAsignar()
		this.cambiarEstadoRechazado(evento)
	}

	buscarEstadoParaAsignar() {
		this.estados.forEach(e => {
			if (e.esAmbitoEventoSismico() && e.esRechazado()) {
				this.estadoRechazado = e
				return
			}
		})
	}

	cambiarEstadoRechazado(evento) {
		this.obtenerFechaYHora()
		evento.cambiarEstadoRechazado(this.fechaHoraActual, this.estadoRechazado)
		console.log(evento)
	}

	seleccionarModificarEvento(evento) {
		const alcanceSismo = evento.getAlcance()
		const origenGeneracion = evento.getOrigenGeneracion()
		const valorMagnitud = evento.getValorMagnitud()
		this.boundary.habilitarModificacionDeDatosSismicos(evento, alcances, origenes, {alcanceSismo, origenGeneracion, valorMagnitud}) 
	}

	modificarEvento(evento, alcance, origen, magnitud) {
		const alcanceSeleccionado = alcances.find(a => a.nombre === alcance);
		const origenSeleccionado = origenes.find(o => o.nombre === origen);
		evento.setMagnitud(magnitud) ;
		evento.setAlcance(alcanceSeleccionado);
		evento.setOrigen(origenSeleccionado);
		document.getElementById("detalleEvento").classList.add("d-none");
		this.seleccionarEventoSismico(evento, true)
	}

	FinCU() {
		console.log("SE ACABO")
	}
}