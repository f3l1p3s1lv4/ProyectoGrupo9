import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-olvidar-contrasena',
  templateUrl: './olvidar-contrasena.page.html',
  styleUrls: ['./olvidar-contrasena.page.scss'],
})
export class OlvidarContrasenaPage implements OnInit {

  email: string;

  alumno = new FormGroup({
    correo: new FormControl('',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[d]{1}[u]{1}[o]{1}[c]{1}[u]{1}[c].[c]{1}[l]{1}$")]), 
  });

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

/*   olvidar(){
    var todosusUarios = this.usuarioService.obtenerUsuarios();
    todosusUarios.find
  } */
  olvidar(){
    if (this.usuarioService.validarCorreo(this.email)) {
      var usuarioCorreo = this.usuarioService.validarCorreo(this.email);
      alert('CORREO ENVIADO')
    }else{
      alert('CORREO NO EXISTE')
    }
  }
}
