export class Sesion{
    constructor(fechaInicioSesion, usuario) {
		this.fechaInicioSesion = fechaInicioSesion
		this.usuario = usuario
    }

    getAnalistaSismico(){
		return this.usuario.getASLogueado()
    }
  }