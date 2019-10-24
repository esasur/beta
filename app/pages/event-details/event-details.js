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
var event_details_1_1 = require("../event-details-1/event-details-1");
var event_details_2_1 = require("../event-details-2/event-details-2");
var event_details_3_1 = require("../event-details-3/event-details-3");
var core_2 = require("@angular/core");
var EventDetails = (function () {
    function EventDetails(events, mikiPublicite, loadingCtrl, navParams, e) {
        var _this = this;
        this.events = events;
        this.mikiPublicite = mikiPublicite;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.e = e;
        this.eventReady = false;
        this.user = false;
        this.tabParams = {};
        this.presentLoading();
        // lorsqu'une inscription a eu lieu, on affiche le premier onglet
        this.e.subscribe('event:subscribed', function () {
            _this.tabRef.select(0);
        });
        // récupert l'event à afficher
        this.event = navParams.get('event');
        // récupert l'utilisateur connecté (passé en paramètres)
        if (navParams.get("user")) {
            this.user = navParams.get("user");
        }
        else {
            this.user = false;
        }
        // ajoute l'état de la connexion de l'utilisateur aux paramètres passés aux pages des tabs
        this.tabParams.user = this.user;
        // récupert les données de l'event
        this.events.getEvent(this.event.id).subscribe(function (data) {
            _this.myEvent = data.json().event;
            // ajoute l'event aux paramètres passés aux pages des tabs
            _this.tabParams.myEvent = _this.myEvent;
            // puis récupert les informations dont on a besoin
            _this.eventTitle = _this.myEvent.title.fr;
            // définit les tabs
            _this.tab1 = event_details_1_1.EventDetails1;
            _this.tab2 = event_details_2_1.EventDetails2;
            // si l'event est à venir (s'il n'a pas déjà eu lieu) on affiche le tab d'inscription
            if (_this.event.futur) {
                _this.tab3 = event_details_3_1.EventDetails3;
            }
            // dit que l'event est chargé
            _this.eventReady = true;
        }, function (err) { return console.error(err); }, function () {
            _this.loading.dismiss();
        });
    }
    EventDetails.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Veuillez patienter..."
        });
        this.loading.present();
    };
    return EventDetails;
}());
__decorate([
    core_2.ViewChild('myTabs'),
    __metadata("design:type", ionic_angular_1.Tabs)
], EventDetails.prototype, "tabRef", void 0);
EventDetails = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/event-details/event-details.html',
        providers: [miki_events_1.MikiEventsService]
    }),
    __metadata("design:paramtypes", [miki_events_1.MikiEventsService, miki_publicite_1.MikiPubliciteService, ionic_angular_1.LoadingController, ionic_angular_1.NavParams, ionic_angular_1.Events])
], EventDetails);
exports.EventDetails = EventDetails;
