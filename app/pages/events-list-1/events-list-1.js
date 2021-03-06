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
var EventsList1 = (function () {
    function EventsList1(events, mikiPerson, mikiPublicite, e, loadingCtrl, navParams, nav) {
        // this.presentLoading();
        var _this = this;
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
        this.themes = [];
        this.id_theme = '';
        this.subvention_vd = '';
        this.gender = "f";
        // récupert l'id de la catégorie à afficher si donné
        if (navParams.data.idCategory) {
            this.idCategory = navParams.data.idCategory;
        }
        else {
            this.idCategory = '';
        }
        // récupert l'état de la connexion de l'utilisateur
        this.user = navParams.data.user;
        // this.refrechEvents();
        // définit le titre de la page
        this.refreshTitle();
        // s'inscrit au changement de catégorie des events
        this.e.subscribe('eventCategory:changed', function (idCategory) {
            _this.idCategory = idCategory;
            // définit le titre de la page
            _this.refreshTitle();
            // rafraichit les cours
            _this.refrechEvents();
        });
        // récupert la liste des thèmes
        this.events.getCategoriesFromType('miki_event_theme').subscribe(function (data) {
            _this.themes = data.json().categories;
            // ne prend pas le thème "Aucun"
            var temp = [];
            for (var _i = 0, _a = _this.themes; _i < _a.length; _i++) {
                var theme = _a[_i];
                if (theme.name.fr != undefined && theme.name.fr != "Aucun") {
                    temp.push(theme);
                }
            }
            _this.themes = temp;
            // sélectionne le premier thème
            if (_this.themes.length > 0) {
                // this.id_theme = this.themes[0].id;
                _this.id_theme = "";
            }
        }, function (err) { return console.error(err); });
    }
    EventsList1.prototype.ionViewDidEnter = function () {
        // console.log('enter');
        // this.presentLoading();
        // console.log('enter2');
        this.refrechEvents();
        // console.log('enter3');
    };
    // re-définit le titre de la page en fonction de la catégorie de cours affichés
    EventsList1.prototype.refreshTitle = function () {
        if (this.idCategory == 1) {
            this.pageTitle = 'Formations Continue ' + (new Date().getFullYear());
        }
        else if (this.idCategory == 15) {
            this.pageTitle = '1ers Secours ' + (new Date().getFullYear());
        }
        else {
            this.pageTitle = 'Formations ' + (new Date().getFullYear());
        }
    };
    EventsList1.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Veuillez patienter..."
        });
        // console.log('enter2.1');
        this.loading.present();
        // console.log('enter2.2');
    };
    // récupert la liste des events depuis le site
    EventsList1.prototype.refrechEvents = function () {
        var _this = this;
        this.events.getEvents(2, this.user === false, this.idCategory).subscribe(function (data) {
            _this.foundEvents = data.json().events;
            var eventsFutur = Array();
            var eventsPassed = Array();
            // place les cours futurs avant les cours passés
            for (var _i = 0, _a = _this.foundEvents; _i < _a.length; _i++) {
                var event_1 = _a[_i];
                if (event_1.futur) {
                    eventsFutur.push(event_1);
                }
                else {
                    eventsPassed.push(event_1);
                }
                _this.foundEvents = eventsFutur.concat(eventsPassed);
            }
            _this.allEvents = _this.foundEvents;
            _this.searchEvents();
        }, function (err) { return console.error(err); }, function () {
            // this.loading.dismiss();
        });
    };
    // lors d'un clic sur un event
    EventsList1.prototype.eventClick = function (event, item) {
        this.nav.rootNav.push(event_details_1.EventDetails, {
            //   console.log(this.nav);
            //   console.log(this.nav.parent);
            // this.nav.parent.push(EventDetails, {
            event: item,
            user: this.user
        });
    };
    // filtre les events
    EventsList1.prototype.searchEvents = function () {
        var temp = [];
        var searchValue = this.search.toLowerCase();
        for (var _i = 0, _a = this.allEvents; _i < _a.length; _i++) {
            var event_2 = _a[_i];
            var keep = true;
            // si le thème ne correspond pas, on ne prend pas en compte l'event
            if (this.id_theme != '' && event_2.id_theme != this.id_theme) {
                keep = false;
            }
            // si la subvention ne correspond pas, on ne prend pas en compte l'event
            if (this.subvention_vd != '' && event_2.subvention_vaud != this.subvention_vd) {
                keep = false;
            }
            // si les termes de recherche ne correspondent pas, on ne prend pas en compte l'event
            if (event_2.title.fr.toLowerCase().indexOf(searchValue) == -1 && event_2.description.fr.toLowerCase().indexOf(searchValue) == -1) {
                keep = false;
            }
            // si on doit prendre en compte l'event
            if (keep) {
                temp.push(event_2);
            }
        }
        this.foundEvents = temp;
    };
    // action lors d'un refresh manuel (pull to refresh)
    EventsList1.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.events.getEvents(2, this.user === false, this.idCategory).subscribe(function (data) {
            _this.foundEvents = data.json().events;
            var eventsFutur = Array();
            var eventsPassed = Array();
            // place les cours futurs avant les cours passés
            for (var _i = 0, _a = _this.foundEvents; _i < _a.length; _i++) {
                var event_3 = _a[_i];
                if (event_3.futur) {
                    eventsFutur.push(event_3);
                }
                else {
                    eventsPassed.push(event_3);
                }
                _this.foundEvents = eventsFutur.concat(eventsPassed);
            }
            _this.allEvents = _this.foundEvents;
        }, function (err) {
            console.error(err);
        }, function () {
            refresher.complete();
        });
    };
    // réinitialise les events
    EventsList1.prototype.clearSearchEvents = function () {
        this.foundEvents = this.allEvents;
    };
    return EventsList1;
}());
EventsList1 = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/events-list-1/events-list-1.html',
        providers: [miki_events_1.MikiEventsService]
    }),
    __metadata("design:paramtypes", [miki_events_1.MikiEventsService, miki_person_1.MikiPersonService, miki_publicite_1.MikiPubliciteService, ionic_angular_1.Events, ionic_angular_1.LoadingController, ionic_angular_1.NavParams, ionic_angular_1.NavController])
], EventsList1);
exports.EventsList1 = EventsList1;
