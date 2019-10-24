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
var miki_person_1 = require("../../services/miki-person");
var miki_events_1 = require("../../services/miki-events");
var miki_publicite_1 = require("../../services/miki-publicite");
var validation_1 = require("../../services/validation");
var AccountEdit = (function () {
    function AccountEdit(mikiPerson, mikiEvents, mikiPublicite, events, loadingCtrl, navParams, toastCtrl) {
        var _this = this;
        this.mikiPerson = mikiPerson;
        this.mikiEvents = mikiEvents;
        this.mikiPublicite = mikiPublicite;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.user = false;
        this.codesPros = [];
        this.countries = [];
        this.days = [];
        this.months = [];
        this.years = [];
        // récupert l'utilisateur connecté (passé en paramètres)
        if (navParams.get("user")) {
            this.user = navParams.get("user");
        }
        else {
            this.user = false;
        }
        // initialise le forumlaire
        this.initForm();
        // récupert la liste des codes professionnels
        this.mikiEvents.getCodesPros().subscribe(function (data) {
            var codes = data.json().codes;
            _this.codesPros = codes;
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
        // récupert la liste des pays
        this.mikiEvents.getCountries().subscribe(function (data) {
            _this.countries = data.json().countries;
            if (_this.user) {
                _this.user.countryName = '';
                _this.user.company.countryName = '';
            }
            var france_index = null;
            var suisse_index = null;
            // recherche le nom du pays de l'utilisateur et récupert la France et la Suisse
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
    }
    // initialise le formulaire
    AccountEdit.prototype.initForm = function () {
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
            // récupert la date de naissance de l'utilisateur
            this.userBirthdayArray = this.user.birthday.split('/');
            if (this.userBirthdayArray.length != 3) {
                this.userBirthdayArray = ['', '', ''];
            }
            this.accountEditForm = new forms_1.FormGroup({
                type: new forms_1.FormControl(this.user.type, forms_1.Validators.required),
                lastname: new forms_1.FormControl(this.user.lastname, forms_1.Validators.required),
                firstname: new forms_1.FormControl(this.user.firstname, forms_1.Validators.required),
                birthday_day: new forms_1.FormControl(this.userBirthdayArray[0], forms_1.Validators.required),
                birthday_month: new forms_1.FormControl(this.userBirthdayArray[1], forms_1.Validators.required),
                birthday_year: new forms_1.FormControl(this.userBirthdayArray[2], forms_1.Validators.required),
                addressBillingType: new forms_1.FormControl(this.user.others.type_adresse_facturation, forms_1.Validators.required),
                addressMailingType: new forms_1.FormControl(this.user.others.type_adresse_courrier, forms_1.Validators.required),
                privateAddress: new forms_1.FormControl(this.user.address, forms_1.Validators.required),
                privateNpa: new forms_1.FormControl(this.user.npa, forms_1.Validators.required),
                privateCity: new forms_1.FormControl(this.user.city, forms_1.Validators.required),
                privateCountry: new forms_1.FormControl(this.user.country, forms_1.Validators.required),
                privateMobile: new forms_1.FormControl(this.user.tel2, forms_1.Validators.required),
                privateFixe: new forms_1.FormControl(this.user.tel1),
                privateEmail: new forms_1.FormControl(this.user.email1, [forms_1.Validators.required, validation_1.ValidationService.emailValidator]),
                proCompany: new forms_1.FormControl(this.user.company.name, forms_1.Validators.required),
                proCompanyCode: new forms_1.FormControl(this.user.others.company_code, forms_1.Validators.required),
                codeProOther: new forms_1.FormControl(''),
                proAddress: new forms_1.FormControl(this.user.company.address, forms_1.Validators.required),
                proNpa: new forms_1.FormControl(this.user.company.npa, forms_1.Validators.required),
                proCity: new forms_1.FormControl(this.user.company.city, forms_1.Validators.required),
                proCountry: new forms_1.FormControl(this.user.company.country, forms_1.Validators.required),
                proTel: new forms_1.FormControl(this.user.company.tel, forms_1.Validators.required),
                proFax: new forms_1.FormControl(this.user.company.fax),
                proEmail: new forms_1.FormControl(this.user.company.email, [forms_1.Validators.required, validation_1.ValidationService.emailValidator]),
                passwords: new forms_1.FormGroup({
                    password: new forms_1.FormControl('', forms_1.Validators.required),
                    password2: new forms_1.FormControl('', forms_1.Validators.required)
                }, {}, validation_1.ValidationService.passwordConfirmationValidator)
            });
        }
        else {
            this.accountEditForm = new forms_1.FormGroup({
                type: new forms_1.FormControl('', forms_1.Validators.required),
                lastname: new forms_1.FormControl('', forms_1.Validators.required),
                firstname: new forms_1.FormControl('', forms_1.Validators.required),
                birthday_day: new forms_1.FormControl('', forms_1.Validators.required),
                birthday_month: new forms_1.FormControl('', forms_1.Validators.required),
                birthday_year: new forms_1.FormControl('', forms_1.Validators.required),
                addressBillingType: new forms_1.FormControl('', forms_1.Validators.required),
                addressMailingType: new forms_1.FormControl('', forms_1.Validators.required),
                privateAddress: new forms_1.FormControl('', forms_1.Validators.required),
                privateNpa: new forms_1.FormControl('', forms_1.Validators.required),
                privateCity: new forms_1.FormControl('', forms_1.Validators.required),
                privateCountry: new forms_1.FormControl('', forms_1.Validators.required),
                privateMobile: new forms_1.FormControl('', forms_1.Validators.required),
                privateFixe: new forms_1.FormControl(''),
                privateEmail: new forms_1.FormControl('', [forms_1.Validators.required, validation_1.ValidationService.emailValidator]),
                proCompany: new forms_1.FormControl('', forms_1.Validators.required),
                proCompanyCode: new forms_1.FormControl('', forms_1.Validators.required),
                codeProOther: new forms_1.FormControl(''),
                proAddress: new forms_1.FormControl('', forms_1.Validators.required),
                proNpa: new forms_1.FormControl('', forms_1.Validators.required),
                proCity: new forms_1.FormControl('', forms_1.Validators.required),
                proCountry: new forms_1.FormControl('', forms_1.Validators.required),
                proTel: new forms_1.FormControl('', forms_1.Validators.required),
                proFax: new forms_1.FormControl(''),
                proEmail: new forms_1.FormControl('', [forms_1.Validators.required, validation_1.ValidationService.emailValidator]),
                passwords: new forms_1.FormGroup({
                    password: new forms_1.FormControl(''),
                    password2: new forms_1.FormControl('')
                }, {}, validation_1.ValidationService.passwordConfirmationValidator)
            });
        }
        // sélectionne la suisse par défaut
        for (var i_1 = 0; i_1 < this.countries.length; i_1++) {
            if (this.countries[i_1].name.fr == 'Suisse') {
                this.proCountry.updateValue(this.countries[i_1].id);
            }
        }
    };
    // teste si un tableau contient une valeur donnée
    AccountEdit.prototype.arrayContains = function (array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    };
    AccountEdit.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Veuillez patienter..."
        });
        this.loading.present();
    };
    AccountEdit.prototype.onSubmit = function (value) {
        var _this = this;
        if (this.accountEditForm.valid) {
            this.mikiPerson.editAccount(this.user.id, value).then(function (data) {
                if (data.result == 1) {
                    _this.events.publish('account:updated');
                    var toast = _this.toastCtrl.create({
                        cssClass: 'toast-success',
                        message: data.msg,
                        showCloseButton: true,
                        closeButtonText: 'Ok'
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
    return AccountEdit;
}());
AccountEdit = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/account-edit/account-edit.html',
        providers: [miki_events_1.MikiEventsService, miki_person_1.MikiPersonService]
    }),
    __metadata("design:paramtypes", [miki_person_1.MikiPersonService, miki_events_1.MikiEventsService, miki_publicite_1.MikiPubliciteService, ionic_angular_1.Events, ionic_angular_1.LoadingController, ionic_angular_1.NavParams, ionic_angular_1.ToastController])
], AccountEdit);
exports.AccountEdit = AccountEdit;
