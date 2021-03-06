import {NavParams, LoadingController, ToastController, AlertController, Events} from 'ionic-angular';
import {Component} from '@angular/core';
// import {AbstractControl} from '@angular/common';  
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';
import {MikiPersonService} from '../../services/miki-person';
import {MikiEventsService} from '../../services/miki-events';
import {MikiPubliciteService} from '../../services/miki-publicite';
import {ValidationService} from '../../services/validation';


@Component({
  templateUrl: 'build/pages/account-edit/account-edit.html',
  providers: [MikiEventsService, MikiPersonService]
})
export class AccountEdit {
  private loading: any;

  private user: any = false;
  public userBirthdayArray: any;


  public codesPros: any = [];
  public countries: any = [];


  public accountEditForm: FormGroup;
  
  public days = [];
  public months = [];
  public years = [];


  public type: any;
  public lastname: any;
  public firstname: any;
  public birthday_day: any;
  public birthday_month: any;
  public birthday_year: any;
  public addressBillingType: any;
  public addressMailingType: any;
  public privateAddress: any;
  public privateNpa: any;
  public privateCity: any;
  public privateCountry: any;
  public privateMobile: any;
  public privateFixe: any;
  public privateEmail: any;
  public proCompany: any;
  public proCompanyCode: any;
  public codeProOther: any;
  public proAddress: any;
  public proNpa: any;
  public proCity: any;
  public proCountry: any;
  public proTel: any;
  public proFax: any;
  public proEmail: any;
  public password1: any;
  public password2: any;



  constructor(private mikiPerson: MikiPersonService, private mikiEvents: MikiEventsService, private mikiPublicite: MikiPubliciteService, private events: Events, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private navParams: NavParams, public toastCtrl: ToastController) {

    // récupert l'utilisateur connecté (passé en paramètres)
    if (navParams.get("user")){
      this.user = navParams.get("user");
    }
    else{
      this.user = false;
    }

    // initialise le forumlaire
    this.initForm(); 

    

    // récupert la liste des codes professionnels
    this.mikiEvents.getCodesPros().subscribe(
      data => {
        let codes = data.json().codes;

        
        this.codesPros = codes;

        // recherche le nom du code profesionnel de l'utilisateur
        if (this.user){
          this.user.company_code_name = '';
          for(let i = 0; i < codes.length; i++) {
            if(codes[i].numero == this.user.others.company_code){
              this.user.company_code_name = codes[i].nom;
            }
          }
        }
      },
      err => console.error(err),
      () => {}
    );

    // récupert la liste des pays
    this.mikiEvents.getCountries().subscribe(
      data => {
        this.countries = data.json().countries;

        if (this.user){
          this.user.countryName = '';
          this.user.company.countryName = '';
        }

        let france_index = null;
        let suisse_index = null;

        // recherche le nom du pays de l'utilisateur et récupert la France et la Suisse
        for(let i = 0; i < this.countries.length; i++) {
          if (this.user){
            if(this.countries[i].id == this.user.country){
              this.user.countryName = this.countries[i].name.fr;
            }
            if(this.countries[i].id == this.user.company.country){
              this.user.company.countryName = this.countries[i].name.fr;
            }
          }

          if (this.countries[i].name.fr == 'France'){
            france_index = i;
          }

          if (this.countries[i].name.fr == 'Suisse'){
            suisse_index = i;
          }
        }

        // place la Suisse et la France en début de tableau
        if (france_index != null){
          let temp = this.countries[france_index];
          this.countries.splice(france_index, 1);
          this.countries.unshift(temp);
        }

        if (suisse_index != null){
          let temp = this.countries[suisse_index];
          this.countries.splice(suisse_index, 1);
          this.countries.unshift(temp);
        }
      },
      err => console.error(err),
      () => {}
    );
  }


  // initialise le formulaire
  initForm(){

    // prépare les données pour la date de naissance
    for (var i = 1; i <= 31; i++){
      this.days.push(i);
    }

    this.months[1] = "Janvier";
    this.months[2] = "Février";
    this.months[3] = "Mars";
    this.months[4] = "Avril";
    this.months[5] = "Mai";
    this.months[6] = "Juin";
    this.months[7] = "Juillet";
    this.months[8] = "Août";
    this.months[9] = "Septembre";
    this.months[10] = "Octobre";
    this.months[11] = "Novembre";
    this.months[12] = "Décembre";

    let now = new Date();
    let yearNow = now.getFullYear();
    for (var i = yearNow - 10; i > yearNow - 100; i--){
      this.years.push(i);
    }


    // récupert la date de naissance de l'utilisateur
    if (this.user){
      // récupert la date de naissance de l'utilisateur
      this.userBirthdayArray = this.user.birthday.split('/');
      
      if (this.userBirthdayArray.length != 3){
        this.userBirthdayArray = ['', '', ''];
      }

      this.accountEditForm = new FormGroup({  
        type: new FormControl(this.user.type, Validators.required),
        lastname: new FormControl(this.user.lastname, Validators.required),
        firstname: new FormControl(this.user.firstname, Validators.required),
        birthday_day: new FormControl(this.userBirthdayArray[0], Validators.required),
        birthday_month: new FormControl(this.userBirthdayArray[1], Validators.required),
        birthday_year: new FormControl(this.userBirthdayArray[2], Validators.required),
        addressBillingType: new FormControl(this.user.others.type_adresse_facturation, Validators.required),
        addressMailingType: new FormControl(this.user.others.type_adresse_courrier, Validators.required),
        privateAddress: new FormControl(this.user.address, Validators.required),
        privateNpa: new FormControl(this.user.npa, Validators.required),
        privateCity: new FormControl(this.user.city, Validators.required),
        privateCountry: new FormControl(this.user.country, Validators.required),
        privateMobile: new FormControl(this.user.tel2, Validators.required),
        privateFixe: new FormControl(this.user.tel1),
        privateEmail: new FormControl(this.user.email1, [Validators.required, ValidationService.emailValidator]),
        proCompany: new FormControl(this.user.company.name, Validators.required),
        proCompanyCode: new FormControl(this.user.others.company_code, Validators.required),
        codeProOther: new FormControl(''),
        proAddress: new FormControl(this.user.company.address, Validators.required),
        proNpa: new FormControl(this.user.company.npa, Validators.required),
        proCity: new FormControl(this.user.company.city, Validators.required),
        proCountry: new FormControl(this.user.company.country, Validators.required),
        proTel: new FormControl(this.user.company.tel, Validators.required),
        proFax: new FormControl(this.user.company.fax),
        proEmail: new FormControl(this.user.company.email, [Validators.required, ValidationService.emailValidator]),
        passwords: new FormGroup({
          password1: new FormControl(''),
          password2: new FormControl('')
        }, {}, ValidationService.passwordConfirmationValidator)
      });
    }
    else{
      this.accountEditForm = new FormGroup({  
        type: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        firstname: new FormControl('', Validators.required),
        birthday_day: new FormControl('', Validators.required),
        birthday_month: new FormControl('', Validators.required),
        birthday_year: new FormControl('', Validators.required),
        addressBillingType: new FormControl('', Validators.required),
        addressMailingType: new FormControl('', Validators.required),
        privateAddress: new FormControl('', Validators.required),
        privateNpa: new FormControl('', Validators.required),
        privateCity: new FormControl('', Validators.required),
        privateCountry: new FormControl('', Validators.required),
        privateMobile: new FormControl('', Validators.required),
        privateFixe: new FormControl(''),
        privateEmail: new FormControl('', [Validators.required, ValidationService.emailValidator]),
        proCompany: new FormControl('', Validators.required),
        proCompanyCode: new FormControl('', Validators.required),
        codeProOther: new FormControl(''),
        proAddress: new FormControl('', Validators.required),
        proNpa: new FormControl('', Validators.required),
        proCity: new FormControl('', Validators.required),
        proCountry: new FormControl('', Validators.required),
        proTel: new FormControl('', Validators.required),
        proFax: new FormControl(''),
        proEmail: new FormControl('', [Validators.required, ValidationService.emailValidator]),
        passwords: new FormGroup({
          password1: new FormControl(''),
          password2: new FormControl('')
        }, {}, ValidationService.passwordConfirmationValidator)
      });
    }

    // sélectionne la suisse par défaut
    for(let i = 0; i < this.countries.length; i++) {
      if(this.countries[i].name.fr == 'Suisse'){
        this.proCountry.updateValue(this.countries[i].id);
      }
    }
  }



  // teste si un tableau contient une valeur donnée
  arrayContains(array: any, value: any){
    for(let i = 0; i < array.length; i++) {
      if(array[i] == value){
        return true;
      }
    }
    return false;
  }



  presentLoading(){
    this.loading = this.loadingCtrl.create({
      content: "Veuillez patienter..."
    });
    this.loading.present();
  }



  onSubmit(value: any): void {
  
    if(this.accountEditForm.valid){
      this.mikiPerson.editAccount(this.user.id, value).then(data => {
        if (data.result == 1){
          this.events.publish('account:updated');

          let toast = this.toastCtrl.create({
            cssClass: 'toast-success',
            message: data.msg,
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
        }
        else if (data.result == 0){
          let toast = this.toastCtrl.create({
            cssClass: 'toast-error',
            message: data.error,
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
        }
      });
    }
  }



  deleteAccountConfim(): void{

    let confirm = this.alertCtrl.create({
      title: 'Suppression de compte',
      message: 'Etes-vous sûr de vouloir supprimer votre compte utilisateur ? Cette action est irrémédiable !',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            confirm.dismiss();
            this.deleteAccount();
          }
        },
        {
          text: 'Non',
          handler: () => {}
        }
      ]
    });

    confirm.present();
  }



  deleteAccount(): void{
    this.mikiPerson.deleteAccount(this.user.id).then(data => {
      if (data.result == 1){
        // déconnecte l'utilisateur
        this.mikiPerson.disconnect();

        let toast = this.toastCtrl.create({
          cssClass: 'toast-success',
          message: data.msg,
          showCloseButton: true,
          closeButtonText: 'Ok'
        });

        toast.onDidDismiss(() => {
          // this.events.publish('account:created');
        });

        toast.present();
      }
      else if (data.result == 0){
        let toast = this.toastCtrl.create({
          cssClass: 'toast-error',
          message: data.error,
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
      }
    });
  }
}
