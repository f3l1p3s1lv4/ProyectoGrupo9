import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //variables necesarias para el trabajo del CRUD:
  usuarios: any[] = [
    {
      rut: '21013600-2',
      nom_completo: 'Nicolas',
      fecha_nac: '2002-05-11',
      semestre: 1,
      password: 'profesor',
      tipo_usuario: 'administrador'
    },
    /* {
      rut: '20998720-1',
      correo: 'feli.silva@duocuc.cl',
      nom_completo: 'Felipe',
      fecha_nac: '2002-04-11',
      semestre: 4,
      password: 'alumno',
      tipo_usuario: 'alumno'
    } */
  ];

  constructor() { }

  //métodos del CRUD:
  agregarUsuario(usuario): boolean{
    if ( this.obtenerUsuario(usuario.rut) == undefined ) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }
  eliminarUsuario(rut){
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }
  modificarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }
  obtenerUsuario(rut){
    return this.usuarios.find(usuario => usuario.rut == rut);
  }
  obtenerUsuarios(){
    return this.usuarios;
  }

  //MÉTODO CUSTOMER:
  //validar rut y contraseña: método que recibe rut y password y me entrega un JSON de un usuario
  validarRutPassword(rut, pass){
    return this.usuarios.find(u => u.rut == rut && u.password == pass);
  }

  validarCorreo(correo){
    return this.usuarios.find(u => u.correo == correo);
  }
}
