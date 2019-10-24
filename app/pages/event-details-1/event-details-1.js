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
var miki_publicite_1 = require("../../services/miki-publicite");
var EventDetails1 = (function () {
    function EventDetails1(events, mikiPublicite, nav, navParams) {
        this.events = events;
        this.mikiPublicite = mikiPublicite;
        this.nav = nav;
        this.navParams = navParams;
        this.user = false;
        this.eventDescription = '';
        this.eventAddress = '';
        this.eventPic = '';
        this.msgParticipants = '';
        this.entrance = '';
        this.eventPrices = [];
        // récupert l'event passé en paramètre
        this.myEvent = navParams.data.myEvent;
        // ainsi que l'état de la connexion de l'utilisateur
        this.user = navParams.data.user;
        // puis récupert les informations dont on a besoin
        this.eventTitle = this.myEvent.title.fr;
        this.eventDescription = this.myEvent.description.fr;
        var dateStartTemp = this.myEvent.date_start.split(" ");
        if (this.myEvent.date_start != '0000-00-00 00:00:00') {
            this.eventDateStart = events.getDate(this.myEvent.date_start);
        }
        else {
            this.eventDateStart = 'Date précisée ultérieurement';
        }
        if (this.myEvent.date_start != '0000-00-00 00:00:00') {
            this.eventDateStop = events.getDate(this.myEvent.date_stop);
        }
        else {
            this.eventDateStop = 'Date précisée ultérieurement';
        }
        // this.eventDateStop = events.getDate(this.myEvent.date_stop);
        this.eventCategory = this.myEvent.category.name.fr;
        // this.eventReady = true;  // pour savoir si on peut afficher les dates
        if (this.myEvent.place != "")
            this.eventAddress += "<div>" + this.myEvent.place + "</div>";
        if (this.myEvent.city != "") {
            if (this.myEvent.address != "")
                this.eventAddress += "<div itemprop='streetAddress'>" + this.myEvent.address + "</div>";
            if (this.myEvent.city != "")
                this.eventAddress += "<div itemprop='addressLocality'>" + this.myEvent.city + "</div>";
            if (this.myEvent.region != "" && this.myEvent.country != "")
                this.eventAddress += "<div><span itemprop='addressRegion'>" + this.myEvent.region + "</span>, <span itemprop='addressCountry'>" + this.myEvent.country + "</span></div>";
            else if (this.myEvent.country != "")
                this.eventAddress += "<div itemprop='addressCountry'>" + this.myEvent.country + "</div>";
        }
        // détermine l'image (si image par défaut on n'en affiche pas)
        if (this.myEvent.pics.length > 0) {
            this.eventPic = this.myEvent.pics[0];
        }
        // le nombre max de participants ou de places restantes
        if (this.myEvent.max_participants == 0) {
            this.msgParticipants = "illimité";
        }
        else {
            this.msgParticipants = (this.myEvent.max_participants - this.myEvent.nb_participants) + " places restantes";
        }
        // récupert les prix d'entrée
        if (this.myEvent.entrance_type == 0) {
            this.entrance = 'Libre';
        }
        else {
            for (var _i = 0, _a = this.myEvent.prices; _i < _a.length; _i++) {
                var myPrice = _a[_i];
                this.entrance += "<div class='event_price'><div class='event_price__title'>" + myPrice.title.fr + "</div>";
                if (myPrice.description.fr != '')
                    this.entrance += "<div class='event_price__description'>" + myPrice.description.fr + "</div>";
                this.entrance += "<div class='event_price__price'>" + myPrice.price + "</div></div>";
            }
        }
    }
    return EventDetails1;
}());
EventDetails1 = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/event-details-1/event-details-1.html',
        providers: [miki_events_1.MikiEventsService]
    }),
    __metadata("design:paramtypes", [miki_events_1.MikiEventsService, miki_publicite_1.MikiPubliciteService, ionic_angular_1.NavController, ionic_angular_1.NavParams])
], EventDetails1);
exports.EventDetails1 = EventDetails1;
