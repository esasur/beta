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
var ionic_native_1 = require("ionic-native");
var login_1 = require("./pages/login/login");
var account_create_1 = require("./pages/account-create/account-create");
var events_list_1 = require("./pages/events-list/events-list");
var account_edit_1 = require("./pages/account-edit/account-edit");
var account_events_list_1 = require("./pages/account-events-list/account-events-list");
var documents_1 = require("./pages/documents/documents");
// import {Accueil} from './pages/accueil/accueil';
var accueil_1 = require("./pages/accueil/accueil");
var publicite_home_1 = require("./pages/publicite-home/publicite-home");
var miki_person_1 = require("./services/miki-person");
var miki_publicite_1 = require("./services/miki-publicite");
var events_list_1_1 = require("./pages/events-list-1/events-list-1");
var events_list_2_1 = require("./pages/events-list-2/events-list-2");
var MyApp = (function () {
    function MyApp(app, platform, menu, events, mikiPerson, mikiPublicite, alertCtrl) {
        var _this = this;
        this.app = app;
        this.platform = platform;
        this.menu = menu;
        this.events = events;
        this.mikiPerson = mikiPerson;
        this.mikiPublicite = mikiPublicite;
        this.alertCtrl = alertCtrl;
        this.rootPage = publicite_home_1.PubliciteHome;
        this.accueilPage = accueil_1.Accueil;
        this.loginPage = login_1.Login;
        this.CreateAccountPage = account_create_1.AccountCreate;
        this.accountEdit = account_edit_1.AccountEdit;
        this.accountEventsList = account_events_list_1.AccountEventsList;
        this.EventsList = events_list_1.EventsList;
        this.Documents = documents_1.Documents;
        this.pushToken = '';
        // user: any = false;  // peut être FALSE ou un objet représentant la personne connectée
        this.eventsList_1 = events_list_1_1.EventsList1;
        this.eventsList_2 = events_list_2_1.EventsList2;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
            ionic_native_1.StatusBar.overlaysWebView(false);
            // initialise le stockage local
            // this.local = new Storage(LocalStorage);
            // récupert les publicités et lance le slide
            _this.mikiPublicite.refresh().then(function (data) {
                mikiPublicite.start('top');
                // this.events.publish('publicites:loaded');
                // let nav = this.app.getComponent('nav');
                _this.nav.setRoot(publicite_home_1.PubliciteHome, { pubType: 'start', user: _this.mikiPerson.user });
            });
            // this.checkConnection();
            _this.mikiPerson.checkConnection().then(function (data) {
                // si un utilisateur est authentifié et que le token est déjà enregistré, on met à jour le token de l'utilisateur
                if (data !== false && _this.mikiPerson.user) {
                    _this.mikiPerson.setPushToken(_this.pushToken);
                }
            });
            // lorsqu'une publicité est fermée
            _this.events.subscribe('homePublicite:closed', function (pubType) {
                if (pubType == 'start') {
                    _this.nav.setRoot(accueil_1.Accueil);
                }
                else if (pubType == 'fc_home') {
                    _this.nav.setRoot(events_list_1.EventsList, { idCategory: 1, user: _this.mikiPerson.user });
                }
                else if (pubType == 'ps_home') {
                    _this.nav.setRoot(events_list_1.EventsList, { idCategory: 15, user: _this.mikiPerson.user });
                }
            });
            // lorsqu'une personne est authentifiée
            _this.events.subscribe('user:login', function () {
                // rafraichit l'utilisateur puis ouvre une page
                _this.mikiPerson.refreshUser().then(function (data) {
                    _this.openPage(accueil_1.Accueil);
                });
                // et ajoute le token pour les notifications à l'utilisateur
                _this.mikiPerson.setPushToken(_this.pushToken);
            });
            // lorsqu'une personne est déconnectée
            _this.events.subscribe('user:logout', function () {
                // console.log('logout');
                // this.mikiPerson = false;
                // rafraichit l'utilisateur puis ouvre une page
                _this.mikiPerson.refreshUser().then(function (data) {
                    _this.openPage(accueil_1.Accueil);
                });
            });
            // lorsqu'un compte utilisateur est créé
            _this.events.subscribe('account:created', function () {
                // rafraichit l'utilisateur
                _this.mikiPerson.refreshUser();
            });
            // lorsqu'un compte utilisateur est créé et qu'on a clické sur "OK"
            _this.events.subscribe('account:createdOk', function () {
                // ouvre une page
                _this.openPage(account_edit_1.AccountEdit);
            });
            // lorsqu'un compte utilisateur est modifié
            _this.events.subscribe('account:updated', function () {
                // rafraichit l'utilisateur puis ouvre une page
                _this.mikiPerson.refreshUser();
            });
            // enregistre l'application pour la réception de notifications Push
            var push = ionic_native_1.Push.init({
                android: {
                    senderID: "1085264931012"
                },
                ios: {
                    alert: "true",
                    badge: true,
                    sound: 'true'
                },
                windows: {}
            });
            if (push != undefined) {
                push.on('registration', function (data) {
                    // sauvegarde le token
                    _this.pushToken = data.registrationId;
                    // si un utilisateur est authentifié, on met à jour son token
                    if (_this.mikiPerson.user) {
                        _this.mikiPerson.setPushToken(_this.pushToken);
                    }
                });
                push.on('notification', function (data) {
                    alert(data.message);
                    console.log(data.message);
                    console.log(data.title);
                    console.log(data.count);
                    console.log(data.sound);
                    console.log(data.image);
                    console.log(data.additionalData);
                });
                push.on('error', function (e) {
                    console.log(e.message);
                });
            }
        });
        // fin de l'enregistrement pour la réception de notifications Push
    }
    MyApp.prototype.openPage = function (page) {
        // if (page == Accueil && nav.length() > 1){
        //   console.log('pop');
        //   nav.pop();
        // }
        // else{
        // console.log('setRoot');
        this.nav.setRoot(page, { user: this.mikiPerson.user });
        // }
        this.menu.close();
    };
    // affiche la page des events. Permet de définir l'id de la catégorie à afficher. Si vide, affiche tous les events
    MyApp.prototype.openEvents = function (idCategory) {
        if (idCategory != undefined) {
            this.events.publish('eventCategory:changed', idCategory);
        }
        // on ouvre uniquement la page des events si elle n'est pas déjà affichée
        if (this.rootPage != this.EventsList) {
            // si la catégorie est fournie, on la passe à la page
            if (idCategory != undefined) {
                if (idCategory == 1) {
                    // si des publicités sont configurées on les affiche
                    if (this.mikiPublicite.publicites != undefined && this.mikiPublicite.publicites.fc_home.length > 0) {
                        this.nav.push(publicite_home_1.PubliciteHome, { pubType: 'fc_home', user: this.mikiPerson.user });
                    }
                    else {
                        this.nav.push(events_list_1.EventsList, { idCategory: idCategory, user: this.mikiPerson.user });
                    }
                }
                else if (idCategory == 15) {
                    // si des publicités sont configurées on les affiche
                    if (this.mikiPublicite.publicites != undefined && this.mikiPublicite.publicites.ps_home.length > 0) {
                        this.nav.push(publicite_home_1.PubliciteHome, { pubType: 'ps_home', user: this.mikiPerson.user });
                    }
                    else {
                        this.nav.push(events_list_1.EventsList, { idCategory: idCategory, user: this.mikiPerson.user });
                    }
                }
            }
            else {
                this.nav.setRoot(events_list_1.EventsList, { user: this.mikiPerson.user });
            }
        }
        else {
            if (idCategory != undefined) {
                this.events.publish('eventCategory:changed', idCategory);
            }
        }
        this.menu.close();
    };
    // décnnection
    MyApp.prototype.disconnect = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Déconnection',
            message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
            buttons: [
                {
                    text: 'Oui',
                    handler: function () {
                        _this.mikiPerson.disconnect();
                    }
                },
                {
                    text: 'Non',
                    handler: function () { }
                }
            ]
        });
        this.menu.close();
        confirm.present();
    };
    return MyApp;
}());
__decorate([
    core_1.ViewChild('content'),
    __metadata("design:type", ionic_angular_1.NavController)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    core_1.Component({
        templateUrl: 'build/app.html',
    }),
    __metadata("design:paramtypes", [ionic_angular_1.App, ionic_angular_1.Platform, ionic_angular_1.MenuController, ionic_angular_1.Events, miki_person_1.MikiPersonService, miki_publicite_1.MikiPubliciteService, ionic_angular_1.AlertController])
], MyApp);
exports.MyApp = MyApp;
// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/
ionic_angular_1.ionicBootstrap(MyApp, [miki_person_1.MikiPersonService, miki_publicite_1.MikiPubliciteService], {
    tabbarPlacement: 'bottom',
    prodMode: true
});
