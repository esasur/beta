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
var forms_1 = require("@angular/forms");
var events_list_1 = require("../events-list/events-list");
var login_1 = require("../login/login");
var account_create_1 = require("../account-create/account-create");
var account_edit_1 = require("../account-edit/account-edit");
var publicite_home_1 = require("../publicite-home/publicite-home");
var miki_person_1 = require("../../services/miki-person");
var miki_publicite_1 = require("../../services/miki-publicite");
var Accueil = (function () {
    function Accueil(nav, platform, alertCtrl, navParams, events, mikiPerson, mikiPublicite) {
        var _this = this;
        this.nav = nav;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.events = events;
        this.mikiPerson = mikiPerson;
        this.mikiPublicite = mikiPublicite;
        // private user: boolean = false;
        this.loginPage = login_1.Login;
        this.createAccountPage = account_create_1.AccountCreate;
        this.accountEdit = account_edit_1.AccountEdit;
        // private accountEventsList: any = AccountEventsList;
        this.EventsList = events_list_1.EventsList;
        // vérifie si un utilisateur est connecté
        this.mikiPerson.checkConnection();
        // lorsqu'une personne est authentifiée
        this.events.subscribe('user:login', function () {
            _this.mikiPerson.refreshUser();
        });
        // lorsqu'un compte utilisateur est modifié
        this.events.subscribe('account:updated', function () {
            // rafraichit l'utilisateur puis ouvre une page
            _this.mikiPerson.refreshUser();
        });
    }
    // décnnection
    Accueil.prototype.disconnect = function () {
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
        confirm.present();
    };
    Accueil.prototype.goto = function (number) {
        switch (number) {
            case 1:
                // formation continue
                // si des publicités sont configurées on les affiche
                if (this.mikiPublicite.publicites != undefined && this.mikiPublicite.publicites.fc_home.length > 0) {
                    this.nav.push(publicite_home_1.PubliciteHome, { pubType: 'fc_home', user: this.mikiPerson.user });
                }
                else {
                    this.nav.push(events_list_1.EventsList, { idCategory: 1, user: this.mikiPerson.user });
                }
                break;
            case 2:
                // 1ers secours
                // si des publicités sont configurées on les affiche
                if (this.mikiPublicite.publicites != undefined && this.mikiPublicite.publicites.ps_home.length > 0) {
                    this.nav.push(publicite_home_1.PubliciteHome, { pubType: 'ps_home', user: this.mikiPerson.user });
                }
                else {
                    this.nav.push(events_list_1.EventsList, { idCategory: 15, user: this.mikiPerson.user });
                }
                break;
            case 3:
                // login
                this.nav.push(this.loginPage, { user: this.mikiPerson.user });
                break;
            case 4:
                // création d'un compte utilisateur
                this.nav.push(this.createAccountPage, { user: this.mikiPerson.user });
                break;
            case 5:
                // mon compte
                this.nav.push(this.accountEdit, { user: this.mikiPerson.user });
                break;
            case 6:
                // déconnexion
                this.disconnect();
                break;
        }
    };
    return Accueil;
}());
Accueil = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/accueil/accueil.html',
        directives: [forms_1.REACTIVE_FORM_DIRECTIVES],
        providers: [miki_person_1.MikiPersonService]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.Platform, ionic_angular_1.AlertController, ionic_angular_1.NavParams, ionic_angular_1.Events, miki_person_1.MikiPersonService, miki_publicite_1.MikiPubliciteService])
], Accueil);
exports.Accueil = Accueil;
