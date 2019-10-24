"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require("ionic-angular");
var core_1 = require("@angular/core");
var miki_events_1 = require("../../services/miki-events");
var miki_person_1 = require("../../services/miki-person");
// import {MikiPubliciteService} from '../../services/miki-publicite';
var events_list_1_1 = require("../events-list-1/events-list-1");
var events_list_2_1 = require("../events-list-2/events-list-2");
var EventsList = (function () {
    function EventsList(events, mikiPerson, e, nav, navParams) {
        this.events = events;
        this.mikiPerson = mikiPerson;
        this.e = e;
        this.nav = nav;
        this.navParams = navParams;
        this.user = false;
        this.tabParams = {};
        this.year = '';
        this.nextYear = '';
        this.pubViewed = false;
        // récupert l'utilisateur connecté (passé en paramètres)
        if (navParams.get("user")) {
            this.user = navParams.get("user");
        }
        else {
            this.user = false;
        }
        // ajoute l'état de la connexion de l'utilisateur aux paramètres passés aux pages des tabs
        this.tabParams.user = this.user;
        // passe l'id de la catégorie à afficher si donnée
        if (navParams.get("idCategory")) {
            this.tabParams.idCategory = navParams.get("idCategory");
        }
        else {
            this.tabParams.idCategory = '';
        }
        this.year = new Date().getFullYear();
        this.nextYear = this.year + 1;
        // définit les tabs
        this.tab1 = events_list_1_1.EventsList1;
        this.tab2 = events_list_2_1.EventsList2;
    }
    return EventsList;
}());
EventsList = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/events-list/events-list.html',
        providers: [miki_events_1.MikiEventsService]
    }),
    __metadata("design:paramtypes", [miki_events_1.MikiEventsService, miki_person_1.MikiPersonService, ionic_angular_1.Events, ionic_angular_1.NavController, ionic_angular_1.NavParams])
], EventsList);
exports.EventsList = EventsList;
