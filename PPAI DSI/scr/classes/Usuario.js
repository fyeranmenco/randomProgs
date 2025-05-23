export class Usuario{
    constructor(nombre, contraseña, empleado) {
		this.nombre = nombre
		this.contraseña = contraseña
		this.empleado = empleado
    }

    getASLogueado(){
		this.empleado.getNombre()
    }
  }