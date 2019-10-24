import {Platform, NavController, NavParams, Loading, Events, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {EventDetails} from '../event-details/event-details';
import {MikiEventsService} from '../../services/miki-events';
import {MikiPersonService} from '../../services/miki-person';
// import {MikiPubliciteService} from '../../services/miki-publicite';
import {EventsList1} from '../events-list-1/events-list-1';
import {EventsList2} from '../events-list-2/events-list-2';



@Component({
  templateUrl: 'build/pages/events-list/events-list.html',
  providers: [MikiEventsService]
})
export class EventsList {
  private user: boolean = false;
  public tabParams: any = {};
  private year: any = '';
  private nextYear: any = '';
  private pubViewed: boolean = false;

  private tab1: any;
  private tab2: any;
  

  constructor(private events: MikiEventsService, private mikiPerson: MikiPersonService, private e: Events, private nav: NavController, private navParams: NavParams) {
    // récupert l'utilisateur connecté (passé en paramètres)
    if (navParams.get("user")){
      this.user = navParams.get("user");
    }
    // sinon on affiche toutes les catégories
    else{
      this.user = false;
    }
    
    // ajoute l'état de la connexion de l'utilisateur aux paramètres passés aux pages des tabs
    this.tabParams.user = this.user;

    // passe l'id de la catégorie à afficher si donnée
    if (navParams.get("idCategory")){
      this.tabParams.idCategory = navParams.get("idCategory");
    }
    // sinon on affiche toutes les catégories
    else{
      this.tabParams.idCategory = '';
    }

    this.year = new Date().getFullYear();
    this.nextYear = this.year + 1;

    // définit les tabs
    this.tab1 = EventsList1;
    this.tab2 = EventsList2;
  }
}
