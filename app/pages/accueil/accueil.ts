import {Platform, NavParams, AlertController, Events, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventsList} from '../events-list/events-list';
import {Login} from '../login/login';
import {AccountCreate} from '../account-create/account-create';
import {AccountEdit} from '../account-edit/account-edit';
import {PubliciteHome} from '../publicite-home/publicite-home';
import {MikiPersonService} from '../../services/miki-person';
import {MikiPubliciteService} from '../../services/miki-publicite';


@Component({
  templateUrl: 'build/pages/accueil/accueil.html',
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [MikiPersonService]
})
export class Accueil{

  // private user: boolean = false;
  private loginPage: any = Login;
  private createAccountPage: any = AccountCreate;
  private accountEdit: any = AccountEdit;
  // private accountEventsList: any = AccountEventsList;
  private EventsList: any = EventsList;

  constructor(private nav: NavController, private platform: Platform, private alertCtrl: AlertController, private navParams: NavParams, private events: Events, private mikiPerson: MikiPersonService, private mikiPublicite: MikiPubliciteService) {
    
    // vérifie si un utilisateur est connecté
    this.mikiPerson.checkConnection();


    // lorsqu'une personne est authentifiée
    this.events.subscribe('user:login', () => {
      this.mikiPerson.refreshUser();
    });

    // lorsqu'un compte utilisateur est modifié
    this.events.subscribe('account:updated', () => {
      // rafraichit l'utilisateur puis ouvre une page
      this.mikiPerson.refreshUser();
    });
  }



  // décnnection
  disconnect(){
    let confirm = this.alertCtrl.create({
      title: 'Déconnection',
      message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.mikiPerson.disconnect();
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



  goto(number: number){
    switch(number){
      case 1:
        // formation continue

        // si des publicités sont configurées on les affiche
        if (this.mikiPublicite.publicites != undefined && this.mikiPublicite.publicites.fc_home.length > 0){
          this.nav.push(PubliciteHome, { pubType: 'fc_home', user: this.mikiPerson.user });
        }
        else{
          this.nav.push(EventsList, { idCategory: 1, user: this.mikiPerson.user });
        }

        break;
      case 2:
        // 1ers secours
        
        // si des publicités sont configurées on les affiche
        if (this.mikiPublicite.publicites != undefined && this.mikiPublicite.publicites.ps_home.length > 0){
          this.nav.push(PubliciteHome, { pubType: 'ps_home', user: this.mikiPerson.user });
        }
        else{
          this.nav.push(EventsList, { idCategory: 15, user: this.mikiPerson.user });
        }

        break;
      case 3:
        // login
        this.nav.push(this.loginPage, { user: this.mikiPerson.user });
        break;
      case 4:
        // création d'un compte utilisateur
        this.nav.push(this.createAccountPage, { user: this.mikiPerson.user });
        break;
      case 5:
        // mon compte
        this.nav.push(this.accountEdit, { user: this.mikiPerson.user });
        break;
      case 6:
        // déconnexion
        this.disconnect();
        break;
    }
  }
}