export class Empleado{
    constructor(nombre, apellido, mail, telefono) {
		this.nombre = nombre
		this.apellido = apellido
		this.mail = mail
		this.telefono = telefono
    }

    getNombre(){
		return this
    }
  }