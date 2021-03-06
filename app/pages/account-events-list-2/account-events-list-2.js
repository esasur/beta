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
var event_details_1 = require("../event-details/event-details");
var miki_events_1 = require("../../services/miki-events");
var miki_person_1 = require("../../services/miki-person");
var miki_publicite_1 = require("../../services/miki-publicite");
var AccountEventsList2 = (function () {
    function AccountEventsList2(platform, events, mikiPerson, mikiPublicite, e, loadingCtrl, navParams, nav) {
        // this.presentLoading();
        this.platform = platform;
        this.events = events;
        this.mikiPerson = mikiPerson;
        this.mikiPublicite = mikiPublicite;
        this.e = e;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.foundEvents = [];
        this.search = '';
        this.user = false;
        this.pageTitle = 'Formations';
        this.idCategory = '';
        // affiche tous les events
        this.idCategory = '';
        // définit le titre de la page
        this.pageTitle = 'Formations prévues';
        // récupert l'utilisateur connecté (passé en paramètres)
        if (navParams.get("user")) {
            this.user = navParams.get("user");
        }
        else {
            this.user = false;
        }
    }
    AccountEventsList2.prototype.ionViewDidEnter = function () {
        // this.presentLoading();
        this.refrechEvents();
    };
    AccountEventsList2.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Veuillez patienter..."
        });
        this.loading.present();
    };
    // récupert la liste des events depuis le site
    AccountEventsList2.prototype.refrechEvents = function () {
        var _this = this;
        if (this.user) {
            this.events.getEventsFromPerson(this.user.id, 3).subscribe(function (data) {
                _this.foundEvents = data.json().events;
                _this.allEvents = _this.foundEvents;
            }, function (err) { return console.error(err); }, function () {
                // this.loading.dismiss();
            });
        }
        else {
            // this.loading.dismiss();
            console.log('non connecté !');
        }
    };
    // lors d'un clic sur un event
    AccountEventsList2.prototype.eventClick = function (event, item) {
        this.nav.push(event_details_1.EventDetails, {
            event: item,
            user: this.user
        });
    };
    // filtre les events
    AccountEventsList2.prototype.searchEvents = function () {
        var temp = [];
        var searchValue = this.search.toLowerCase();
        for (var _i = 0, _a = this.allEvents; _i < _a.length; _i++) {
            var event_1 = _a[_i];
            if (event_1.title.fr.toLowerCase().indexOf(searchValue) != -1 || event_1.description.fr.toLowerCase().indexOf(searchValue) != -1) {
                temp.push(event_1);
            }
        }
        this.foundEvents = temp;
    };
    // action lors d'un refresh manuel (pull to refresh)
    AccountEventsList2.prototype.doRefresh = function (refresher) {
        var _this = this;
        if (this.user) {
            this.events.getEventsFromPerson(this.user.id, 3).subscribe(function (data) {
                _this.foundEvents = data.json().events;
                _this.allEvents = _this.foundEvents;
            }, function (err) {
                console.error(err);
            }, function () {
                refresher.complete();
            });
        }
        else {
            console.log('non connecté !');
        }
    };
    // réinitialise les events
    AccountEventsList2.prototype.clearSearchEvents = function () {
        this.foundEvents = this.allEvents;
    };
    return AccountEventsList2;
}());
AccountEventsList2 = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/account-events-list-2/account-events-list-2.html',
        providers: [miki_events_1.MikiEventsService]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, miki_events_1.MikiEventsService, miki_person_1.MikiPersonService, miki_publicite_1.MikiPubliciteService, ionic_angular_1.Events, ionic_angular_1.LoadingController, ionic_angular_1.NavParams, ionic_angular_1.NavController])
], AccountEventsList2);
exports.AccountEventsList2 = AccountEventsList2;
