import {Platform, NavParams, NavController, LoadingController, Events} from 'ionic-angular';
import {Component} from '@angular/core';
import {EventDetails} from '../event-details/event-details';
import {MikiEventsService} from '../../services/miki-events';
import {MikiPersonService} from '../../services/miki-person';
import {MikiPubliciteService} from '../../services/miki-publicite';


@Component({
  templateUrl: 'build/pages/account-events-list-1/account-events-list-1.html',
  providers: [MikiEventsService, MikiPersonService]
})
export class AccountEventsList1 {
  public allEvents: any;
	public foundEvents: any = [];
  private loading: any;
  public search: string = '';
  private user: any = false;
  private pageTitle: string = 'Formations';
  private idCategory: any = '';
  


  constructor(private platform: Platform, private events: MikiEventsService, private mikiPerson: MikiPersonService, private mikiPublicite: MikiPubliciteService, private e: Events, private loadingCtrl: LoadingController, private navParams: NavParams, private nav: NavController) {
    // this.presentLoading();

    // affiche tous les events
    this.idCategory = '';

    // définit le titre de la page
    this.pageTitle = 'Formations suivies'



    // récupert l'utilisateur connecté (passé en paramètres)
    if (navParams.get("user")){
      this.user = navParams.get("user");
    }
    else{
      this.user = false;
    }
  }



  ionViewDidEnter(){
    // this.presentLoading();
    this.refrechEvents();
  }



  presentLoading(){
    this.loading = this.loadingCtrl.create({
      content: "Veuillez patienter..."
    });
    this.loading.present();
  }



  // récupert la liste des events depuis le site
  refrechEvents(){
    if (this.user){
      this.events.getEventsFromPerson(this.user.id, 2).subscribe(
        data => {
          this.foundEvents = data.json().events;
          this.allEvents = this.foundEvents;
        },
        err => console.error(err),
        () => {
          // this.loading.dismiss();
        }
      );
    }
    else{
      // this.loading.dismiss();
    }
  }



	// lors d'un clic sur un event
  eventClick(event, item) {
		this.nav.push(EventDetails, {
			event: item,
      user: this.user
		});
  }



  // filtre les events
  searchEvents(){
    let temp = [];
    let searchValue = this.search.toLowerCase();
    
    for(let event of this.allEvents){
      if (event.title.fr.toLowerCase().indexOf(searchValue) != -1 || event.description.fr.toLowerCase().indexOf(searchValue) != -1){
        temp.push(event);
      }
    }

    this.foundEvents = temp;
  }



  // action lors d'un refresh manuel (pull to refresh)
  doRefresh(refresher){
    if (this.user) {
      this.events.getEventsFromPerson(this.user.id, 2).subscribe(
        data => {
          this.foundEvents = data.json().events;
          this.allEvents = this.foundEvents;
        },
        err => {
          console.error(err);
        },
        () => {
          refresher.complete();
        }
      );
    }
    else{
      console.log('non connecté !');
    }
  }



  // réinitialise les events
  clearSearchEvents(){
    this.foundEvents = this.allEvents;
  }
}
