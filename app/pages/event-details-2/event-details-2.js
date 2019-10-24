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
var miki_publicite_1 = require("../../services/miki-publicite");
var EventDetails2 = (function () {
    function EventDetails2(nav, navParams, mikiPublicite) {
        this.nav = nav;
        this.navParams = navParams;
        this.mikiPublicite = mikiPublicite;
        this.user = false;
        this.eventDescription = '';
        // récupert l'event passé en paramètre
        this.myEvent = navParams.data.myEvent;
        // ainsi que l'état de la connexion de l'utilisateur
        this.user = navParams.data.user;
        // puis récupert les informations dont on a besoin
        this.eventDescription = this.myEvent.description.fr;
    }
    return EventDetails2;
}());
EventDetails2 = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/event-details-2/event-details-2.html'
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.NavParams, miki_publicite_1.MikiPubliciteService])
], EventDetails2);
exports.EventDetails2 = EventDetails2;
