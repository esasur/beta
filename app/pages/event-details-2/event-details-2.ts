import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {MikiPubliciteService} from '../../services/miki-publicite';


@Component({
  templateUrl: 'build/pages/event-details-2/event-details-2.html'
})
export class EventDetails2 {
  private myEvent: any;
  private user = false;

  public eventDescription: any = '';


  constructor(private nav: NavController, private navParams: NavParams, private mikiPublicite: MikiPubliciteService) {
    // récupert l'event passé en paramètre
  	this.myEvent = navParams.data.myEvent;
    
    // ainsi que l'état de la connexion de l'utilisateur
    this.user = navParams.data.user;

    // puis récupert les informations dont on a besoin
    this.eventDescription = this.myEvent.description.fr;
  }
}