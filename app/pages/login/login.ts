import {Platform, NavController, ToastController} from 'ionic-angular';
import {Component} from '@angular/core';
// import {, AbstractControl} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../services/validation';
import {MikiPersonService} from '../../services/miki-person';
import {MikiPubliciteService} from '../../services/miki-publicite';


@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [MikiPersonService]
})
export class Login{

  authForm: FormGroup;
  email: any;
  password: any;

  constructor(private platform: Platform, private toastCtrl: ToastController, private mikiPerson: MikiPersonService, private mikiPublicite: MikiPubliciteService) {

    this.authForm = new FormGroup({  
      email: new FormControl('', [Validators.required, ValidationService.emailValidator]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(value: any): void {
    if(this.authForm.valid){
      
      this.mikiPerson.testConnection(value.email, value.password).then(data => {

        // si erreur
        if (data == false){
          let toast = this.toastCtrl.create({
            message: "Échec lors de l'authentification.\n\rVeuillez contrôler votre nom d'utilisateur et votre mot de passe.",
            duration: 3000
          });
          toast.present();
        }
      });
    }
  }
}