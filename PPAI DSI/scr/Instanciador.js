import { Estado } from './classes/Estado.js';
import { AlcanceSismo } from './classes/AlcanceSismo.js';
import { OrigenDeGeneracion } from './classes/OrigenDeGeneracion.js';
import { ClasificacionSismo } from './classes/clasificacionSismo.js';
import { TipoDeDato } from './classes/TipoDeDato.js';
import { SerieTemporal } from './classes/SerieTemporal.js';
import { MuestraSismica } from './classes/MuestraSismica.js';
import { EstacionSismologica } from './classes/EstacionSismologica.js';
import { Sismografo } from './classes/Sismografo.js';
import { CambioEstado } from './classes/CambioEstado.js';
import { DetalleMuestraSismica } from './classes/DetalleMuestraSismica.js';
import { EventoSismico } from './classes/EventoSismico.js';
import { Sesion } from './classes/Sesion.js';
import { Usuario } from './classes/Usuario.js';
import { Empleado } from './classes/Empleado.js';

const estadoPendienteRevision = new Estado("Evento Sismico","Pendiente de revisión");
const estadoBloqueadoEnRevision = new Estado("Evento Sismico","Bloqueado en revisión");
const estadoRechazado = new Estado("Evento Sismico","Rechazado");
const estados = [estadoBloqueadoEnRevision, estadoPendienteRevision, estadoRechazado]

const cambio1 = new CambioEstado("2025-05-21T12:00:00", null, estadoPendienteRevision);  
const cambio2 = new CambioEstado("2025-05-20T08:15:00", null, estadoPendienteRevision);

//ALCANCES
const alcanceLocal = new AlcanceSismo("Local", "Afecta áreas muy cercanas");
const alcanceRegional = new AlcanceSismo("Regional", "Afecta regiones cercanas");
const alcances = [alcanceLocal, alcanceRegional]

//Origen
const origenTectonico = new OrigenDeGeneracion("Tectónico", "Movimiento en placas");
const origenVolcanico = new OrigenDeGeneracion("Volcánico", "Actividad volcánica");
const origenes = [origenTectonico, origenVolcanico]

//CLASIFICACIONES
const clasificacionLeve = new ClasificacionSismo("Leve", 0, 40);
const clasificacionModerado = new ClasificacionSismo("Moderado", 0, 70);
const clasificaciones = [clasificacionLeve, clasificacionModerado]

//TipodeDatos
const tipoVelocidad  = new TipoDeDato("Velocidad de onda", "m/s", 3.0);
const tipoFrecuencia  = new TipoDeDato("Frecuencia de onda", "Hz", 15.0);
const tipoLongitud  = new TipoDeDato("Longitud", "m", 200.0);
const tiposDeDatos = [tipoFrecuencia, tipoLongitud, tipoVelocidad]

const detalle1 = new DetalleMuestraSismica(2.5, tipoVelocidad);
const detalle2 = new DetalleMuestraSismica(2.7, tipoVelocidad);
const detalle3 = new DetalleMuestraSismica(10, tipoFrecuencia);
const detalle4 = new DetalleMuestraSismica(11, tipoFrecuencia);
const detalle5 = new DetalleMuestraSismica(100, tipoLongitud);
const detalle6 = new DetalleMuestraSismica(110, tipoLongitud);
const detalle7 = new DetalleMuestraSismica(2.6, tipoVelocidad);
const detalle8 = new DetalleMuestraSismica(12, tipoFrecuencia);
const detalle9 = new DetalleMuestraSismica(105, tipoLongitud);
const detalle10 = new DetalleMuestraSismica(2.6, tipoVelocidad);
const detalle11 = new DetalleMuestraSismica(12, tipoFrecuencia);
const detalle12 = new DetalleMuestraSismica(105, tipoLongitud);
const detalle13 = new DetalleMuestraSismica(2.6, tipoVelocidad);
const detalle14 = new DetalleMuestraSismica(12, tipoFrecuencia);
const detalle15 = new DetalleMuestraSismica(105, tipoLongitud);
const detalle16 = new DetalleMuestraSismica(2.6, tipoVelocidad);
const detalle17 = new DetalleMuestraSismica(12, tipoFrecuencia);
const detalle18 = new DetalleMuestraSismica(105, tipoLongitud);

// Muestras
const muestras1 = [
  new MuestraSismica("2025-05-20 14:30:01",[detalle1,detalle3,detalle5]),
  new MuestraSismica("2025-05-20 14:30:02",[detalle2,detalle4,detalle6])
];

const muestras2 = [
  new MuestraSismica("2025-05-20 14:31:01",[detalle7,detalle8,detalle9]),
  new MuestraSismica("2025-05-20 14:31:02",[detalle10,detalle11,detalle12])
];

const muestras3 = [
  new MuestraSismica("2025-05-20 14:32:01",[detalle13,detalle14,detalle15]),
  new MuestraSismica("2025-05-20 14:32:02",[detalle16,detalle17,detalle18])
];



//EstacionSismologica
const estacion1 = new EstacionSismologica(
  "EST001",
  "certificacion_est001.pdf",
  "2024-03-15",
  -33.45,
  -70.65,
  "Estación Central",
  "CERT-001"
);

const estacion2 = new EstacionSismologica(
  "EST002",
  "certificacion_est002.pdf",
  "2024-04-10",
  -34.60,
  -58.38,
  "Estación Sur",
  "CERT-002"
);

const estacion3 = new EstacionSismologica(
  "EST003",
  "certificacion_est003.pdf",
  "2024-05-05",
  -16.50,
  -68.15,
  "Estación Norte",
  "CERT-003"
);

//Instancias de Sismografo 
const sismografo1 = new Sismografo("2024-06-01", "SISM-001", "SN-1001", estacion1);
const sismografo2 = new Sismografo("2024-06-10", "SISM-002", "SN-1002", estacion2);
const sismografo3 = new Sismografo("2024-06-15", "SISM-003", "SN-1003", estacion3);

// Instancias de SerieTemporal
const serie1 = new SerieTemporal("Normal", "2025-05-20 14:30:00", "2025-05-20 14:30:10", 1.0, muestras1, sismografo1);
const serie2 = new SerieTemporal("Alarma leve", "2025-05-20 14:31:00", "2025-05-20 14:31:10", 1.0, muestras2, sismografo2);
const serie3 = new SerieTemporal("Alarma moderada", "2025-05-20 14:32:00", "2025-05-20 14:32:10", 1.0, muestras3, sismografo3);

const evento1 = new EventoSismico("2025-05-21T12:30:00", "2025-05-21T12:00:00", -31.4201, -64.1888, -31.4301, -64.1988, 5.7, clasificacionLeve, origenTectonico, alcanceLocal, estadoPendienteRevision, [cambio1], [serie1], null);
const evento2 = new EventoSismico("2025-05-20T08:45:00", "2025-05-20T08:15:00", -32.8908, -68.8440, -32.9000, -68.8500, 4.9, clasificacionModerado, origenVolcanico, alcanceRegional, estadoPendienteRevision, [cambio2], [serie2,serie3], null);
const eventosSismicos = [evento1, evento2]

const empleado = new Empleado("Jose", "Fonseca", "jose@gmail.com", "3513653788")
const usuario = new Usuario("Usuario 1", "usu1Yei", empleado)
const sesion = new Sesion(new Date(), usuario)

export {
	eventosSismicos,
	estados,
	alcances,
	origenes,
	sesion
};