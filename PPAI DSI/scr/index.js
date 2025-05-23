import { PantallaSismos } from './classes/PantallaSismos.js';
import { GestorDeSismos } from './classes/GestorDeSismos.js';
import { eventosSismicos, estados, alcances, origenes, sesion } from './Instanciador.js';

// Instanciación
const gestor = new GestorDeSismos(estados, sesion, eventosSismicos, alcances, origenes);
const boundary = new PantallaSismos(gestor);

// Simulación de la interacción
boundary.registrarRevisionDeSismos()
