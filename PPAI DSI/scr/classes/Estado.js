export class Estado {
    constructor(ambito, nombreEstado) {
      this.ambito = ambito;
      this.nombreEstado = nombreEstado;
    }
    estaPendienteRevision() {
        return this.nombreEstado == "Pendiente de revisión";
    }
    estaAutoDetectado() {
        return this.nombreEstado == "AutoDetectado";
    }
	esAmbitoEventoSismico() {
		return this.ambito == "Evento Sismico"
	}
	esBloqueadoEnRevision() {
		return this.nombreEstado == "Bloqueado en revisión"
	}
	esRechazado() {
		return this.nombreEstado == "Rechazado"
	}
}