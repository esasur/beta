import {NavParams, LoadingController, Events, Tabs} from 'ionic-angular';
import {Component} from '@angular/core';
import {MikiEventsService} from '../../services/miki-events';
import {MikiPubliciteService} from '../../services/miki-publicite';
import {EventDetails1} from '../event-details-1/event-details-1';
import {EventDetails2} from '../event-details-2/event-details-2';
import {EventDetails3} from '../event-details-3/event-details-3';
import {ViewChild} from '@angular/core';


@Component({
  templateUrl: 'build/pages/event-details/event-details.html',
  providers: [MikiEventsService]
})
export class EventDetails {
  public event;
  public myEvent: any;
  public eventTitle: any;
  public eventReady = false;
  public user = false;
  public tabParams: any = {};

  private loading: any;

  private tab1: any;
  private tab2: any;
  private tab3: any;


  @ViewChild('myTabs') tabRef: Tabs;



  constructor(private events: MikiEventsService, private mikiPublicite: MikiPubliciteService, private loadingCtrl: LoadingController, private navParams: NavParams, private e: Events) {
    this.presentLoading();

    // lorsqu'une inscription a eu lieu, on affiche le premier onglet
    this.e.subscribe('event:subscribed', () => {
      this.tabRef.select(0);
    });

    // récupert l'event à afficher
    this.event = navParams.get('event');

    // récupert l'utilisateur connecté (passé en paramètres)
    if (navParams.get("user")){
      this.user = navParams.get("user");
    }
    else{
      this.user = false;
    }
    
    // ajoute l'état de la connexion de l'utilisateur aux paramètres passés aux pages des tabs
    this.tabParams.user = this.user;

    // récupert les données de l'event
    this.events.getEvent(this.event.id).subscribe(
      data => {
        this.myEvent = data.json().event;


        // ajoute l'event aux paramètres passés aux pages des tabs
        this.tabParams.myEvent = this.myEvent;

        // puis récupert les informations dont on a besoin
        this.eventTitle = this.myEvent.title.fr;

        // définit les tabs
        this.tab1 = EventDetails1;
        this.tab2 = EventDetails2;

        // si l'event est à venir (s'il n'a pas déjà eu lieu) on affiche le tab d'inscription
        if (this.event.futur) {
          this.tab3 = EventDetails3;
        }

        // dit que l'event est chargé
        this.eventReady = true;
      },
      err => console.error(err),
      () => {
        this.loading.dismiss();
      }
    );
  }



  presentLoading(){
    this.loading = this.loadingCtrl.create({
      content: "Veuillez patienter..."
    });
    this.loading.present();
  }
}
