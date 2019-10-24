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
var account_events_list_1_1 = require("../account-events-list-1/account-events-list-1");
var account_events_list_2_1 = require("../account-events-list-2/account-events-list-2");
var AccountEventsList = (function () {
    function AccountEventsList(platform, events, mikiPerson, e, nav, navParams) {
        this.platform = platform;
        this.events = events;
        this.mikiPerson = mikiPerson;
        this.e = e;
        this.nav = nav;
        this.navParams = navParams;
        this.user = false;
        this.tabParams = {};
        this.year = '';
        this.nextYear = '';
        // récupert l'utilisateur connecté (passé en paramètres)
        if (navParams.get("user")) {
            this.user = navParams.get("user");
        }
        else {
            this.user = false;
        }
        // ajoute l'état de la connexion de l'utilisateur aux paramètres passés aux pages des tabs
        this.tabParams.user = this.user;
        // définit les tabs
        this.tab1 = account_events_list_1_1.AccountEventsList1;
        this.tab2 = account_events_list_2_1.AccountEventsList2;
    }
    return AccountEventsList;
}());
AccountEventsList = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/account-events-list/account-events-list.html',
        providers: [miki_events_1.MikiEventsService]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, miki_events_1.MikiEventsService, miki_person_1.MikiPersonService, ionic_angular_1.Events, ionic_angular_1.NavController, ionic_angular_1.NavParams])
], AccountEventsList);
exports.AccountEventsList = AccountEventsList;
