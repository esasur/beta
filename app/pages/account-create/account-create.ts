import {Platform, ToastController, Events} from 'ionic-angular';
import {Component} from '@angular/core';
// import {AbstractControl} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../services/validation';
import {MikiPersonService} from '../../services/miki-person';
import {MikiPubliciteService} from '../../services/miki-publicite';


@Component({
  templateUrl: 'build/pages/account-create/account-create.html',
  providers: [MikiPersonService]
})
export class AccountCreate{

  createAccountForm: FormGroup;
  lastname: FormControl;
  firstname: FormControl;
  email: FormControl;
  password: FormControl;
  password2: FormControl;
  formSubmitedInvalid: boolean = false;

  constructor(private platform: Platform, private mikiPerson: MikiPersonService, private mikiPublicite: MikiPubliciteService, private events: Events, public toastCtrl: ToastController) {

    this.createAccountForm = new FormGroup({  
      lastname: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, ValidationService.emailValidator]),
      passwords: new FormGroup({
        password: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
      }, {}, ValidationService.passwordConfirmationValidator)
    });
  }

  onSubmit(value: any): void {
    console.log(this.createAccountForm);
    if(this.createAccountForm.valid){

      // créé le compte utilisateur
      this.mikiPerson.createAccount(value).then(data => {
        
        if (data.result == 1){
          this.events.publish('account:created');

          let toast = this.toastCtrl.create({
            message: 'Création de compte réussie',
            duration: 3000
          });

          toast.onDidDismiss(() => {
            this.events.publish('account:createdOk');
          });

          toast.present();
        }
        else{
          let toast = this.toastCtrl.create({
            message: 'Erreur lors de la création du compte : ' + data.error,
            duration: 3000
          });

          toast.onDidDismiss(() => {
            // this.events.publish('account:created');
          });

          toast.present();
        }
      });
    }
    else{
      this.formSubmitedInvalid = true;
    }
  }
}