import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  alumno = new FormGroup({
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}-[0-9kK]{1}')]),
    correo: new FormControl('',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[d]{1}[u]{1}[o]{1}[c]{1}[u]{1}[c].[c]{1}[l]{1}$")]), 
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[aA-zZ]{3,20}\\s[aA-zZ]{3,20}')]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern('[aA-zZ]{3,20}')]),
    tipo_usuario: new FormControl('alumno')
  });

  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  //usuarios: any[] = [];
  verificar_password: string;

  constructor(private usuarioService: UsuarioService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    //this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //método del formulario
  registrar(){
    if (this.alumno.controls.password.value != this.verificar_password) {
      this.presentAlert1();
      return;
    }
    this.usuarioService.agregarUsuario(this.alumno.value);
    this.presentAlert();
    this.router.navigate(['/login']);
    this.alumno.reset();
    //this.verificar_password = '';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'FELICITACIONES',
      subHeader: 'USUARIO REGISTRADO',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'ERROR',
      subHeader: 'CONTRASEÑAS NO COINCIDEN',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}

