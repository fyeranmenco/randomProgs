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

	tomarEventosNoRevisados() {
		this.buscarEventosNoRevisados()
	}

    buscarEventosNoRevisados() {
		let datosEventosNoRevisados = []
		let punterosEventos = []
		this.eventosSismicos.forEach(e => {
			if (e.estaPendienteRevision() || e.estaAutoDetectado()) {
				const fechaHoraOcurrencia = e.getFechaHoraOcurrencia()
				const latitudHipocentro = e.getLatitudHipocentro()
				const longitudHipocentro = e.getLongitudHipocentro()
				const latitudEpicentro = e.getLatitudEpicentro()
				const longitudEpicentro = e.getLongitudEpicentro()
				const valorMagnitud = e.getValorMagnitud()
				datosEventosNoRevisados.push({fechaHoraOcurrencia, latitudHipocentro, longitudHipocentro, latitudEpicentro, longitudEpicentro, valorMagnitud})
				punterosEventos.push(e)
			}
		})
		this.boundary.mostrarEventosNoRevisados(punterosEventos, datosEventosNoRevisados)
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

	llamarCUGenerarSismograma() {
		this.boundary.habilitarMapaEventosSismicos()
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
		const analista = this.sesion.getAnalistaSismico()
		evento.cambiarEstadoRechazado(this.fechaHoraActual, this.estadoRechazado, analista)
		console.log(evento)
		this.FinCU()
	}

	seleccionarModificarEvento(evento) {
		const alcanceSismo = evento.getAlcance()
		const origenGeneracion = evento.getOrigenGeneracion()
		const valorMagnitud = evento.getValorMagnitud()
		this.boundary.habilitarModificacionDeDatosSismicos(evento, this.alcances, this.origenes, {alcanceSismo, origenGeneracion, valorMagnitud}) 
	}

	modificarEvento(evento, alcance, origen, magnitud) {
		const alcanceSeleccionado = this.alcances.find(a => a.nombre === alcance);
		const origenSeleccionado = this.origenes.find(o => o.nombre === origen);
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