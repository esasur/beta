import {Platform, NavController, NavParams, Loading, Events} from 'ionic-angular';
import {Component} from '@angular/core';
import {EventDetails} from '../event-details/event-details';
import {MikiEventsService} from '../../services/miki-events';
import {MikiPersonService} from '../../services/miki-person';
import {AccountEventsList1} from '../account-events-list-1/account-events-list-1';
import {AccountEventsList2} from '../account-events-list-2/account-events-list-2';


@Component({
   templateUrl: 'build/pages/account-events-list/account-events-list.html',
  providers: [MikiEventsService]
})
export class AccountEventsList {
  private user: boolean = false;
  public tabParams: any = {};
  private year: any = '';
  private nextYear: any = '';

  private tab1: any;
  private tab2: any;
  

  constructor(private platform: Platform, private events: MikiEventsService, private mikiPerson: MikiPersonService, private e: Events, private nav: NavController, private navParams: NavParams) {
    
    // récupert l'utilisateur connecté (passé en paramètres)
    if (navParams.get("user")){
      this.user = navParams.get("user");
    }
    else{
      this.user = false;
    }

    // ajoute l'état de la connexion de l'utilisateur aux paramètres passés aux pages des tabs
    this.tabParams.user = this.user;

    // définit les tabs
    this.tab1 = AccountEventsList1;
    this.tab2 = AccountEventsList2;
  }
}
