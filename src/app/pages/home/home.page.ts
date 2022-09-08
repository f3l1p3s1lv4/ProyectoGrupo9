import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  alumno = new FormGroup({
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}-[0-9kK]{1}')]),
    correo: new FormControl('',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[d]{1}[u]{1}[o]{1}[c]{1}[u]{1}[c].[c]{1}[l]{1}$")]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[aA-zZ]{3,20}\\s[aA-zZ]{3,20}')]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern('[aA-zZ]{3,20}')]),
    tipo_usuario: new FormControl('alumno')
  });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  usuarios: any[] = [];
  verificar_password: string;

  constructor(private usuarioService: UsuarioService,private alertController: AlertController) {}

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //método del formulario
  registrar(){
    if (this.alumno.controls.password.value != this.verificar_password) {
      this.alertaContrasena();
      return;
    }
    
    var registrado: boolean = this.usuarioService.agregarUsuario(this.alumno.value);
    if (!registrado) {
      this.alertaYaexiste();
      return;
    }

    this.alertaRegistrar();
    this.alumno.reset();
    this.verificar_password = '';
  }

  eliminar(rutEliminar){
    this.usuarioService.eliminarUsuario(rutEliminar);
  }

  buscar(rutBuscar){
    var alumnoEncontrado = this.usuarioService.obtenerUsuario(rutBuscar);
    this.alumno.setValue(alumnoEncontrado);
    this.verificar_password = alumnoEncontrado.password;
  }

  modificar(){
    //console.log(this.alumno.value);
    if (this.alumno.controls.password.value != this.verificar_password) {
      this.alertaContrasena();
      return;
    }
    this.usuarioService.modificarUsuario(this.alumno.value);
    this.limpiar();
    this.alertaModificacion();
  }

  limpiar(){
    this.alumno.reset();
    this.verificar_password = '';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Preacaucion',
      subHeader: '¿Seguro quieres borrar este usuario?',
      message: 'Oprime "aceptar" para eliminarlo',
      buttons: ['Aceptar','Cancelar']
    });
    await alert.present();
  }

  async alertaRegistrar() {
    const alert = await this.alertController.create({
      header: 'FELICITACIONES',
      subHeader: 'USUARIO REGISTRADO',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async alertaModificacion() {
    const alert = await this.alertController.create({
      header: 'FELICITACIONES',
      subHeader: 'USUARIO MODIFICADO',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  async alertaYaexiste() {
    const alert = await this.alertController.create({
      header: 'ERROR',
      subHeader: 'USUARIO YA EXISTE',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  async alertaContrasena() {
    const alert = await this.alertController.create({
      header: 'ERROR',
      subHeader: 'CONTRASEÑAS NO COINCIDEN',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
