import {Platform, NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {MikiDocumentsService} from '../../services/miki-documents';
import {MikiPersonService} from '../../services/miki-person';


@Component({
  templateUrl: 'build/pages/documents/documents-list.html',
  providers: [MikiDocumentsService]
})
export class DocumentsList {
  private user: boolean = false;
  public categoryId : any = 60;

  constructor(navParams: NavParams, private mikiPerson: MikiPersonService, private mikiDocuments: MikiDocumentsService, private platform: Platform) {
    
    // récupert l'utilisateur connecté (passé en paramètres)
    if (navParams.get("user")){
      this.user = navParams.get("user");
    }
    else{
      this.user = false;
    }

    this.categoryId = JSON.parse(navParams.data).categoryId;
  }
  
  // pour l'ouverture d'un document
  openDoc(url): void{
    if (this.platform.is('ios')){
      window.open('http://es-asur.ch/' + url, '_blank', 'EnableViewPortScale=yes');
    }
    else{
      window.open('http://es-asur.ch/' + url, '_system', 'location=yes');
    }
  }
}



@Component({
  templateUrl: 'build/pages/documents/documents.html'
})
export class Documents{

  private tab1: any;
  private tab2: any;

  constructor(private platform: Platform) {
    // définit les tabs
    this.tab1 = DocumentsList;
    this.tab2 = DocumentsList;
  }
}