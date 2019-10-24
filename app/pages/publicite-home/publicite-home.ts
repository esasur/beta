import {Platform, NavController, Events, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {MikiPubliciteService} from '../../services/miki-publicite';


@Component({
  templateUrl: 'build/pages/publicite-home/publicite-home.html',
  providers: [MikiPubliciteService]
})
export class PubliciteHome{

  private pubType: string = '';
  private printButton: boolean = false;
  private canPrintButton: boolean = false;

  constructor(private platform: Platform, private mikiPublicite: MikiPubliciteService, private events: Events, private navParams: NavParams) {
      
  	// récupert le type de publicité à afficher (fc_home/ps_home pour "formation continue/premiers secours")
    if (navParams.data.pubType){
      this.pubType = navParams.data.pubType;

      // si c'est la publicité de démarrage, affiche le bouton pour quitter la pub seulement après 3 secondes
      if (this.pubType == 'start'){
        this.printButton = false;
        
        var el = this;

        setTimeout(function(){ 
          el.printButton = true; 
        }, 4000);
      }
      else{
        this.printButton = true;
      }
    }
  }

  close(){
    this.events.publish('homePublicite:closed', this.pubType);
  }
}