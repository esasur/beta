import {Injectable} from '@angular/core';  
import {Http, Headers} from '@angular/http';

@Injectable()
export class MikiEventsService {

  constructor(private http: Http) {
	}



  /**
   * Récupère les events. Permet de définir l'id de la catégorie à récupérer. Si vide, récupert tous les events
   *
   * type : 1 = tous les events à venir; 2 = les events de l'année en cours (passés et à venir); 3 = les events de l'année prochaine
   *
   * public : true = récupère les événements de visibilité publique + privée
   *          false = récupère uniquement les événements de visibilité publique
   */
  getEvents(type: number, isPublic: any, idCategory?: any) {
    if (isPublic) {
      isPublic = 1;
    }
    else {
      isPublic = 0;
    }

    if (idCategory != undefined && idCategory != '') {
      // return this.http.get('http://es-asur.ch/api/index.php/events/list/' + type + '/' + isPublic + '/' + idCategory);
      return this.http.get('https://asur-formation.ch/api/events/' + type + '/' + isPublic + '/' + idCategory);
    }
    else {
      // return this.http.get('http://es-asur.ch/api/index.php/events/list/' + type + '/' + isPublic);
      return this.http.get('https://asur-formation.ch/api/events/' + type + '/' + isPublic);
    }
  }



  /**
   * Récupère les events auquel une personne donnée participe. Permet de définir l'id de la catégorie à récupérer. Si vide, récupert tous les events
   *
   * type : 1 = tous les events; 2 = les events passés; 3 = les events à venir
   */
  getEventsFromPerson(idPerson: number, type: number, idCategory?: any) {
    if (idCategory != undefined && idCategory != '') {
    return this.http.get('http://es-asur.ch/api/index.php/events/person/list/' + idPerson + '/' + type + '/' + idCategory);
    }
    else {
    return this.http.get('http://es-asur.ch/api/index.php/events/person/list/' + idPerson + '/' + type + '/');
    }
  }



  getEvent(event_id: number) {
    return this.http.get('http://es-asur.ch/api/index.php/event/' + event_id);;
  }



  isSubscribed(event_id: number, user_id: number){
    return this.http.get('http://es-asur.ch/api/index.php/event/' + event_id + '/is_subscribed/' + user_id);
  }



  getCodesPros(){
    return this.http.get('http://es-asur.ch/api/index.php/events/infos/codes_pros');
  }



  getCountries(){
    return this.http.get('http://es-asur.ch/api/index.php/countries/list');
  }



  getCategoriesFromType(type: string){
    return this.http.get('http://es-asur.ch/api/index.php/categories/' + type);
  }



  // inscrit une personne à un événement
  subscribe(eventId, personId, datas): any{
    let params = "";

    params += 'eventId=' + eventId + '&personId=' + personId;
    params += '&params=' + JSON.stringify(datas);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');


    // retourne une promise
    return new Promise((resolve, reject) => {

      this.http.post('http://es-asur.ch/api/index.php/events/subscribe/', params, { headers: headers }).subscribe(
        data => {
          resolve(data.json());
        },
        err => {
          console.error(err);
          resolve(datas);
        }/*,
        () => console.log('Authentication Complete')*/
      );   
    });
  }



  // retourne la date formatée correctement
  getDate(date): string{
    let dateTemp = date.split(" ");
    dateTemp = dateTemp[0];
    dateTemp = dateTemp.split("-");
    return dateTemp[2] + "/" + dateTemp[1] + "/" + dateTemp[0];
  }
}