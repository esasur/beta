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
// import {AbstractControl} from '@angular/common';
var forms_1 = require("@angular/forms");
var miki_events_1 = require("../../services/miki-events");
var miki_publicite_1 = require("../../services/miki-publicite");
var validation_1 = require("../../services/validation");
var login_1 = require("../login/login");
var http_1 = require("@angular/http");
// modal pour les modalités
var modalites = (function () {
    function modalites(viewCtrl, mikiPublicite, params) {
        this.viewCtrl = viewCtrl;
        this.mikiPublicite = mikiPublicite;
        this.params = params;
        this.title = '';
        this.text = '';
        this.title = params.get('title');
        this.text = params.get('text');
    }
    modalites.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return modalites;
}());
modalites = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/modal/modalites.html',
    }),
    __metadata("design:paramtypes", [ionic_angular_1.ViewController, miki_publicite_1.MikiPubliciteService, ionic_angular_1.NavParams])
], modalites);
// fin des modalités
var EventDetails3 = (function () {
    function EventDetails3(toastCtrl, modalCtrl, navParams, events, mikiPublicite, http, e, nav) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.events = events;
        this.mikiPublicite = mikiPublicite;
        this.http = http;
        this.e = e;
        this.nav = nav;
        this.loginPage = login_1.Login;
        this.eventPrices = [];
        this.priceId = '';
        this.choosenPriceId = '';
        this.msgParticipants = '';
        this.accompanist = '';
        this.codeAutorises = '';
        this.eventSubscription = '';
        this.subscriptionState = 0;
        this.codesPros = [];
        this.countries = [];
        this.days = [];
        this.months = [];
        this.years = [];
        // récupert l'event passé en paramètre
        this.myEvent = navParams.data.myEvent;
        // ainsi que l'état de la connexion de l'utilisateur
        this.user = navParams.data.user;
        // puis récupert les informations dont on a besoin :
        // les prix de l'event
        for (var _i = 0, _a = this.myEvent.prices; _i < _a.length; _i++) {
            var myPrice = _a[_i];
            var priceName = myPrice.price;
            if (myPrice.title.fr != '') {
                priceName = myPrice.title.fr + ' - ' + priceName;
            }
            this.eventPrices.push({ id: myPrice.id, title: myPrice.title.fr, description: myPrice.description.fr, price: myPrice.price, priceName: priceName });
        }
        ;
        // le nombre max de participants ou de places restantes
        if (this.myEvent.max_participants == 0) {
            this.msgParticipants = "illimité";
        }
        else {
            this.msgParticipants = (this.myEvent.max_participants - this.myEvent.nb_participants) + " places restantes";
        }
        // le nombre d'accompagnants autorisés
        this.accompanist = this.myEvent.accompanist;
        // la liste des codes professionnels autorisés pour l'event
        if (this.myEvent.others.code_autorises && this.myEvent.others.code_autorises.trim() != '') {
            this.codeAutorises = this.myEvent.others.code_autorises.trim().split(',');
            for (var i = 0; i < this.codeAutorises.length; i++) {
                this.codeAutorises[i] = this.codeAutorises[i].trim();
            }
        }
        else {
            this.codeAutorises = "";
        }
        // la liste des codes professionnels
        this.events.getCodesPros().subscribe(function (data) {
            var codes = data.json().codes;
            // si il n'y a pas de restriction au niveau des codes professionnels on les permet tous
            if (_this.codeAutorises == '') {
                _this.codesPros = codes;
            }
            else {
                _this.codesPros = [];
                for (var i = 0; i < codes.length; i++) {
                    if (_this.arrayContains(_this.codeAutorises, codes[i].numero)) {
                        _this.codesPros.push(codes[i]);
                    }
                }
            }
            // recherche le nom du code profesionnel de l'utilisateur
            if (_this.user) {
                _this.user.company_code_name = '';
                for (var i = 0; i < codes.length; i++) {
                    if (codes[i].numero == _this.user.others.company_code) {
                        _this.user.company_code_name = codes[i].nom;
                    }
                }
            }
        }, function (err) { return console.error(err); }, function () { });
        // la liste des pays
        this.events.getCountries().subscribe(function (data) {
            _this.countries = data.json().countries;
            if (_this.user) {
                _this.user.countryName = '';
                _this.user.company.countryName = '';
            }
            var france_index = null;
            var suisse_index = null;
            // recherche le nom du pays de l'utilisateur
            for (var i = 0; i < _this.countries.length; i++) {
                if (_this.user) {
                    if (_this.countries[i].id == _this.user.country) {
                        _this.user.countryName = _this.countries[i].name.fr;
                    }
                    if (_this.countries[i].id == _this.user.company.country) {
                        _this.user.company.countryName = _this.countries[i].name.fr;
                    }
                }
                if (_this.countries[i].name.fr == 'France') {
                    france_index = i;
                }
                if (_this.countries[i].name.fr == 'Suisse') {
                    suisse_index = i;
                }
            }
            // place la Suisse et la France en début de tableau
            if (france_index != null) {
                var temp = _this.countries[france_index];
                _this.countries.splice(france_index, 1);
                _this.countries.unshift(temp);
            }
            if (suisse_index != null) {
                var temp = _this.countries[suisse_index];
                _this.countries.splice(suisse_index, 1);
                _this.countries.unshift(temp);
            }
        }, function (err) { return console.error(err); }, function () { });
        // si l'event est de type public ou privé
        if (this.myEvent.others.hasOwnProperty('public_type')) {
            this.eventPublicType = this.myEvent.others.public_type;
        }
        else {
            this.eventPublicType = 0;
        }
        // si l'utilisateur est connecté, on vérifie s'il est déjà inscrit à l'event
        if (this.user) {
            this.events.isSubscribed(this.myEvent.id, this.user.id).subscribe(function (data) {
                _this.subscriptionState = data.json().state;
                // met à jour l'affichage du formulaire d'inscription en fonction de différents paramètres
                _this.updateSubscriptionView();
            }, function (err) { return console.error(err); }, function () { });
        }
        // la configuration générale des inscriptions aux events
        this.eventSubscription = this.myEvent.event_subscription;
        // initialise le forumlaire
        this.initForm();
        // met à jour l'affichage du formulaire d'inscription en fonction de différents paramètres
        this.updateSubscriptionView();
    }
    // initialise le formulaire
    EventDetails3.prototype.initForm = function () {
        // prépare les données pour la date de naissance
        for (var i = 1; i <= 31; i++) {
            this.days.push(i);
        }
        this.months[1] = "Janvier";
        this.months[2] = "Février";
        this.months[3] = "Mars";
        this.months[4] = "Avril";
        this.months[5] = "Mai";
        this.months[6] = "Juin";
        this.months[7] = "Juillet";
        this.months[8] = "Août";
        this.months[9] = "Septembre";
        this.months[10] = "Octobre";
        this.months[11] = "Novembre";
        this.months[12] = "Décembre";
        var now = new Date();
        var yearNow = now.getFullYear();
        for (var i = yearNow - 10; i > yearNow - 100; i--) {
            this.years.push(i);
        }
        // récupert la date de naissance de l'utilisateur
        if (this.user) {
            this.userBirthdayArray = this.user.birthday.split('/');
            if (this.userBirthdayArray.length != 3) {
                this.userBirthdayArray = ['', '', ''];
            }
            this.eventSubscribeForm = new forms_1.FormGroup({
                subscriptionType: new forms_1.FormControl(this.user.type, forms_1.Validators.required),
                subscriptionLastname: new forms_1.FormControl(this.user.lastname, forms_1.Validators.required),
                subscriptionFirstname: new forms_1.FormControl(this.user.firstname, forms_1.Validators.required),
                subscriptionBirthday_day: new forms_1.FormControl(this.userBirthdayArray[0], forms_1.Validators.required),
                subscriptionBirthday_month: new forms_1.FormControl(this.userBirthdayArray[1], forms_1.Validators.required),
                subscriptionBirthday_year: new forms_1.FormControl(this.userBirthdayArray[2], forms_1.Validators.required),
                subscriptionAddressBillingType: new forms_1.FormControl(this.user.others.type_adresse_facturation, forms_1.Validators.required),
                subscriptionAddressMailingType: new forms_1.FormControl(this.user.others.type_adresse_courrier, forms_1.Validators.required),
                subscriptionPrivateAddress: new forms_1.FormControl(this.user.address, forms_1.Validators.required),
                subscriptionPrivateNpa: new forms_1.FormControl(this.user.npa, forms_1.Validators.required),
                subscriptionPrivateCity: new forms_1.FormControl(this.user.city, forms_1.Validators.required),
                subscriptionPrivateCountry: new forms_1.FormControl(this.user.country, forms_1.Validators.required),
                subscriptionPrivateMobile: new forms_1.FormControl(this.user.tel2, forms_1.Validators.required),
                subscriptionPrivateFixe: new forms_1.FormControl(this.user.tel1),
                subscriptionPrivateEmail: new forms_1.FormControl(this.user.email1, [forms_1.Validators.required, validation_1.ValidationService.emailValidator]),
                subscriptionProCompany: new forms_1.FormControl(this.user.company.name, forms_1.Validators.required),
                subscriptionProCompanyCode: new forms_1.FormControl(this.user.others.company_code, forms_1.Validators.required),
                subscriptionCodeProOther: new forms_1.FormControl(''),
                subscriptionProAddress: new forms_1.FormControl(this.user.company.address, forms_1.Validators.required),
                subscriptionProNpa: new forms_1.FormControl(this.user.company.npa, forms_1.Validators.required),
                subscriptionProCity: new forms_1.FormControl(this.user.company.city, forms_1.Validators.required),
                subscriptionProCountry: new forms_1.FormControl(this.user.company.country, forms_1.Validators.required),
                subscriptionProTel: new forms_1.FormControl(this.user.company.tel, forms_1.Validators.required),
                subscriptionProFax: new forms_1.FormControl(this.user.company.fax),
                subscriptionProEmail: new forms_1.FormControl(this.user.company.email, [forms_1.Validators.required, validation_1.ValidationService.emailValidator]),
                subscriptionComment: new forms_1.FormControl(this.user.subscriptionComment),
                subscriptionConditions: new forms_1.FormControl(false, validation_1.ValidationService.checkboxValidator)
            });
            // si l'inscription est payante, on rend obligatoire le choix du prix
            if (this.myEvent.entrance_type == 1) {
                this.eventSubscribeForm.addControl('subscriptionPriceId', new forms_1.FormControl(this.eventPrices[0] != undefined ? this.eventPrices[0].id : '', forms_1.Validators.required));
            }
        }
        else {
            this.eventSubscribeForm = new forms_1.FormGroup({
                subscriptionPriceId: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionType: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionLastname: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionFirstname: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionBirthday_day: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionBirthday_month: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionBirthday_year: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionAddressBillingType: new forms_1.FormControl('Choisir', forms_1.Validators.required),
                subscriptionAddressMailingType: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionPrivateAddress: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionPrivateNpa: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionPrivateCity: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionPrivateCountry: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionPrivateMobile: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionPrivateFixe: new forms_1.FormControl(''),
                subscriptionPrivateEmail: new forms_1.FormControl('', [forms_1.Validators.required, validation_1.ValidationService.emailValidator]),
                subscriptionProCompany: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionProCompanyCode: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionCodeProOther: new forms_1.FormControl(''),
                subscriptionProAddress: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionProNpa: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionProCity: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionProCountry: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionProTel: new forms_1.FormControl('', forms_1.Validators.required),
                subscriptionProFax: new forms_1.FormControl(''),
                subscriptionProEmail: new forms_1.FormControl('', [forms_1.Validators.required, validation_1.ValidationService.emailValidator]),
                subscriptionComment: new forms_1.FormControl(''),
                subscriptionConditions: new forms_1.FormControl('', forms_1.Validators.required)
            });
        }
        // si c'est un cours de type privé, on prend automatiquement l'adresse privée pour l'adresse de facturation et de correspondance
        if (this.eventPublicType == 1) {
            this.eventSubscribeForm.controls.subscriptionAddressBillingType.updateValue("Privée");
            this.eventSubscribeForm.controls.subscriptionAddressMailingType.updateValue("Privée");
        }
        // sélectionne la suisse par défaut si aucun pays défini
        if (!this.user || this.user.country == '') {
            for (var i_1 = 0; i_1 < this.countries.length; i_1++) {
                if (this.countries[i_1].name.fr == 'Suisse') {
                    this.eventSubscribeForm.controls.subscriptionPrivateCountry.updateValue(this.countries[i_1].id);
                }
            }
        }
        if (!this.user || this.user.company.country == '') {
            for (var i_2 = 0; i_2 < this.countries.length; i_2++) {
                if (this.countries[i_2].name.fr == 'Suisse') {
                    this.eventSubscribeForm.controls.subscriptionProCountry.updateValue(this.countries[i_2].id);
                }
            }
        }
    };
    // met à jour l'affichage du formulaire d'inscription en fonction de différents paramètres
    EventDetails3.prototype.updateSubscriptionView = function () {
        // si les inscriptions sont fermées
        if (this.myEvent.event_subscription == 0) {
            this.stateSubscription = 0;
        }
        else if (this.codeAutorises != '' && this.user && this.user.hasOwnProperty('company_code') && !this.arrayContains(this.codeAutorises, this.user.company_code)) {
            this.stateSubscription = 1;
        }
        else if (this.myEvent.event_subscription == 1 && !this.user) {
            this.stateSubscription = 2;
        }
        else if (this.user && this.subscriptionState == 1) {
            this.stateSubscription = 3;
        }
        else if (this.user && this.subscriptionState == 2) {
            this.stateSubscription = 4;
        }
        else {
            this.stateSubscription = 5;
        }
    };
    // teste si un tableau contient une valeur donnée
    EventDetails3.prototype.arrayContains = function (array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    };
    // affiche les modalités pratiques
    EventDetails3.prototype.openConditions = function () {
        var _this = this;
        var pageName = '';
        if (this.myEvent.category.id == 1) {
            pageName = 'conditions_utilisation';
        }
        else if (this.myEvent.category.id == 15) {
            pageName = 'conditions_utilisation_1er_secours';
        }
        else {
            return false;
        }
        this.http.get('http://es-asur.ch/api/index.php/page/' + pageName).subscribe(function (data) {
            var modal = _this.modalCtrl.create(modalites, {
                title: "Conditions d'utilisation",
                text: data.json().content
            });
            modal.present();
        }, function (err) {
            console.log('error', err);
        } /*,
        () => console.log('Authentication Complete')*/);
    };
    EventDetails3.prototype.gotoLogin = function () {
        this.nav.rootNav.setRoot(this.loginPage);
    };
    EventDetails3.prototype.onSubmit = function (value) {
        var _this = this;
        if (this.eventSubscribeForm.valid) {
            value.eventPublicType = this.eventPublicType;
            var userId = '';
            if (this.user) {
                userId = this.user.id;
            }
            this.events.subscribe(this.myEvent.id, userId, value).then(function (data) {
                if (data.result == 1) {
                    var toast = _this.toastCtrl.create({
                        cssClass: 'toast-success',
                        message: data.msg,
                        showCloseButton: true,
                        closeButtonText: 'Ok'
                    });
                    toast.onDidDismiss(function () {
                        _this.e.publish('event:subscribed');
                    });
                    toast.present();
                }
                else if (data.result == 0) {
                    var toast = _this.toastCtrl.create({
                        cssClass: 'toast-error',
                        message: data.error,
                        showCloseButton: true,
                        closeButtonText: 'Ok'
                    });
                    toast.present();
                }
            });
        }
    };
    return EventDetails3;
}());
EventDetails3 = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/event-details-3/event-details-3.html',
        providers: [miki_events_1.MikiEventsService]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.ToastController, ionic_angular_1.ModalController, ionic_angular_1.NavParams, miki_events_1.MikiEventsService, miki_publicite_1.MikiPubliciteService, http_1.Http, ionic_angular_1.Events, ionic_angular_1.NavController])
], EventDetails3);
exports.EventDetails3 = EventDetails3;
