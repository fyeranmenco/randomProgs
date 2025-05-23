export class PantallaSismos {
    constructor(gestor) {
        this.gestor = gestor;
		this.gestor.setBoundary(this)
    }

    registrarRevisionDeSismos() {
        console.log("Usuario inicia la acción: registrarRevisionDeSismos()");
        this.habilitarVentana();
    }

    habilitarVentana() {
		document.getElementById('btnRegistrarRevision').addEventListener('click', () => {
			this.gestor.tomarEventosNoRevisados()
		})
    }

	mostrarEventosNoRevisados(punterosEventos, datosEventosNoRevisados) {
		const listaEventosDiv = document.getElementById("listaEventos");
		const detalleEventoCard = document.getElementById("detalleEvento");
		const detalleEventoContenido = document.getElementById("detalleEventoContenido");
		const btnRegistrarRevision = document.getElementById("btnRegistrarRevision");

		listaEventosDiv.style.display = 'block';  // Mostrar lista 
		btnRegistrarRevision.style.display = 'none'; // <<< Oculta el botón al mostrar eventos
	
		if (datosEventosNoRevisados.length === 0) {
		listaEventosDiv.innerHTML = `<div class="alert alert-info">No hay eventos sísmicos sin revisar.</div>`;
		detalleEventoCard.classList.add("d-none");
		return
		}
		
		const eventosOrdenados = this.ordenarEventos(datosEventosNoRevisados)
		const punterosEventosOrdenados = this.ordenarEventos(punterosEventos)

		let html = `
		<table class="table table-hover table-striped">
			<thead class="table-dark">
			<tr>
				<th>Fecha y Hora</th>
				<th>Epicentro (Lat, Lon)</th>
				<th>Hipocentro (Lat, Lon)</th>
				<th>Magnitud</th>
				<th>Acción</th>
			</tr>
			</thead>
			<tbody>
		`;
	
		eventosOrdenados.forEach((evento, index) => {
		html += `
			<tr>
			<td>${evento.fechaHoraOcurrencia}</td>
			<td>${evento.latitudEpicentro.toFixed(2)}, ${evento.longitudEpicentro.toFixed(2)}</td>
			<td>${evento.latitudHipocentro.toFixed(2)}, ${evento.longitudHipocentro.toFixed(2)}</td>
			<td>${evento.valorMagnitud.toFixed(1)}</td>
			<td><button class="btn btn-sm btn-primary btn-seleccionar" data-index="${index}">Seleccionar</button></td>
			</tr>
		`;
		})
	
		html += `
			</tbody>
		</table>
		`
	
		listaEventosDiv.innerHTML = html;
		detalleEventoCard.classList.add("d-none");
		detalleEventoContenido.innerHTML = "";
	
		// Añadir listener a cada botón "Seleccionar"
		const botones = listaEventosDiv.querySelectorAll("button.btn-seleccionar");
		botones.forEach(boton => {
		boton.addEventListener("click", () => {
			const id = parseInt(boton.getAttribute("data-index"));
			const evento = punterosEventosOrdenados[id];
			if (evento) {
			this.seleccionarEventoSismico(evento)
			}
		})
		})
	}

	ordenarEventos(eventos) {
		return eventos.sort((a, b) => {
			if (a.fechaHoraOcurrencia > b.fechaHoraOcurrencia) {
				return 1;
			}
			if (a.fechaHoraOcurrencia < b.fechaHoraOcurrencia) {
				return -1;
			}
			return 0;})
	}

	seleccionarEventoSismico(evento) {
		this.gestor.seleccionarEventoSismico(evento)
	}

	mostrarDatosEventoSismico(evento, datos) {
		const listaEventosDiv = document.getElementById("listaEventos");
  		const detalleEventoCard = document.getElementById("detalleEvento");
		detalleEventoCard.classList.remove("d-none")
    	listaEventosDiv.style.display = 'none'

		let html = `
		<h5>Detalle Evento Sísmico</h5>
      <div>
        <strong>Fecha y Hora de Ocurrencia:</strong> ${datos.datosEventoSismico.fechaHoraOcurrencia}<br>
        <strong>Alcance:</strong> ${datos.datosEventoSismico.alcanceSismo ?? 'No disponible'}<br>
        <strong>Clasificación:</strong> ${datos.datosEventoSismico.clasificacion ?? 'No disponible'}<br>
        <strong>Origen de Generación:</strong> ${datos.datosEventoSismico.origenGeneracion ?? 'No disponible'}<br>
        <strong>Magnitud:</strong> ${datos.datosEventoSismico.valorMagnitud}<br>
      </div>
      <hr>
      <h6>Series Temporales</h6>
    `;
    detalleEventoContenido.innerHTML = html;

    if (!datos.datosSeriesTemporales || datos.datosSeriesTemporales.length === 0) {
      html += `<p>No hay series temporales registradas.</p>`;
    } else {
      datos.datosSeriesTemporales.forEach(serie => {
        html += `<div class="mb-3 border rounded p-2">
          <strong>Estación Sismológica:</strong> ${serie.estacion ?? 'No definido'}<br>
          <table class="table table-sm table-bordered mt-2">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Velocidad de Onda</th>
                <th>Frecuencia de Onda</th>
                <th>Longitud</th>
              </tr>
            </thead>
            <tbody>
        `;
  
	serie.muestras.forEach(muestra => {
	html += `
		<tr>
		<td>${muestra.fechaHoraMuestra}</td>
	`;

	muestra.detalles.forEach(detalle => {
		html += `
		<td>
			${detalle.valor} ${detalle.tipoDato.nombreUnidadMedida}
		</td>
		`;
	});
	});
	
			html += `</tr></tbody></table></div>`;
		});
		}
		detalleEventoContenido.innerHTML = html;
		html += `
				<div class="mb-3">
			<label for="selectAccion" class="form-label">Acción a realizar</label>
			<select id="selectAccion" class="form-select" required>
				<option value="">Seleccione acción</option>
				<option value="confirmar">Confirmar evento</option>
				<option value="rechazar">Rechazar evento</option>
				<option value="revision">Solicitar revisión a experto</option>
			</select>
			</div>
		<button id="btnVolver" class="btn btn-secondary mt-3">Volver</button>
		<button id="btnEditar" class="btn btn-primary mt-3 ms-2">Editar</button>
		<button id="btnConfirmarAccion" class="btn btn-success mt-3 ms-2">Confirmar Acción</button>

		`;
	
		
		detalleEventoContenido.innerHTML = html;
	
		document.getElementById("btnVolver").onclick = () => {
		detalleEventoCard.classList.add("d-none");
		this.gestor.buscarEventosNoRevisados()
		};
	
		document.getElementById("btnEditar").onclick = () => {
		this.gestor.seleccionarModificarEvento(evento)
		};

		document.getElementById("btnConfirmarAccion").onclick = () => {
	const accion = document.getElementById("selectAccion").value;

	if (!accion) {
		alert("Debe seleccionar una acción antes de confirmar.");
		return;
	}

	switch (accion) {
		case "confirmar":
		alert("Evento confirmado.");

		break;
		case "rechazar":
		alert("Evento rechazado.");
			this.seleccionarRechazarEvento(evento)
		break;
		case "revision":
		alert("Revisión solicitada.");
		break;
	}

	// Opcional: volver a la lista o actualizar vista
	detalleEventoCard.classList.add("d-none");
	this.gestor.buscarEventosNoRevisados()
	};

	}

	seleccionarRechazarEvento(evento) {
		this.gestor.rechazarEventoSismico(evento)
	}

	habilitarModificacionDeDatosSismicos(evento, alcances, origenes, datosEvento) {
		detalleEventoContenido.innerHTML = `
      <h5>Editar Evento Sísmico</h5>
      <form id="formEdicion">
        <div class="mb-3">
          <label for="inputMagnitud" class="form-label">Magnitud</label>
          <input type="number" step="0.1" class="form-control" id="inputMagnitud" value="${datosEvento.valorMagnitud ?? ''}" required>
        </div>


          <div class="mb-3">
    <label for="selectAlcance" class="form-label">Alcance del Sismo</label>
    <select id="selectAlcance" class="form-select" required>
      <option value="">Seleccione alcance</option>
      ${alcances.map(a => `
        <option value="${a.nombre}" ${datosEvento.alcanceSismo === a.nombre ? 'selected' : ''}>
          ${a.nombre}
        </option>
      `).join('')}
    </select>
  </div>

  <div class="mb-3">
    <label for="selectOrigen" class="form-label">Origen de Generación</label>
    <select id="selectOrigen" class="form-select" required>
      <option value="">Seleccione origen</option>
      ${origenes.map(o => `
        <option value="${o.nombre}" ${datosEvento.origenGeneracion === o.nombre ? 'selected' : ''}>
          ${o.nombre}
        </option>
      `).join('')}
    </select>
  </div>

        <button type="submit" class="btn btn-success">Guardar</button>
        <button type="button" id="btnCancelar" class="btn btn-secondary ms-2">Cancelar</button>
      </form>
    `;

  
    // Cancelar vuelve a modo solo lectura sin guardar
    document.getElementById("btnCancelar").onclick = () => {
		this.gestor.seleccionarEventoSismico(evento, true)
    };
  
    // Guardar cambios
    document.getElementById("formEdicion").onsubmit = (e) => {
      e.preventDefault();
  
      const magnitud = parseFloat(document.getElementById("inputMagnitud").value);
      const alcance = document.getElementById("selectAlcance").value;
      const origen = document.getElementById("selectOrigen").value;
  
      if (isNaN(magnitud) || !alcance || !origen) {
        alert("Por favor complete todos los campos correctamente.");
        return;
      }
	  this.gestor.modificarEvento(evento, alcance, origen, magnitud)
    };
	}
}