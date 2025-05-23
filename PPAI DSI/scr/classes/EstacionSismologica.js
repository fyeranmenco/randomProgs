export class EstacionSismologica {
  constructor(
    codigoEstacion,
    documentoCertificacionAdquirido,
    fechaSolicitudCertificacion,
    latitud,
    longitud,
    nombre,
    nroCertificacionAdquisicion
  ) {
    this.codigoEstacion = codigoEstacion;
    this.documentoCertificacionAdquirido = documentoCertificacionAdquirido;
    this.fechaSolicitudCertificacion = fechaSolicitudCertificacion;
    this.latitud = latitud;
    this.longitud = longitud;
    this.nombre = nombre;
    this.nroCertificacionAdquisicion = nroCertificacionAdquisicion;
  }

  getCodigoEstacion(){
    return this.codigoEstacion;
  }
}