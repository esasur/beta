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
var validation_1 = require("../../services/validation");
var miki_person_1 = require("../../services/miki-person");
var miki_publicite_1 = require("../../services/miki-publicite");
var AccountCreate = (function () {
    function AccountCreate(platform, mikiPerson, mikiPublicite, events, toastCtrl) {
        this.platform = platform;
        this.mikiPerson = mikiPerson;
        this.mikiPublicite = mikiPublicite;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.formSubmitedInvalid = false;
        this.createAccountForm = new forms_1.FormGroup({
            lastname: new forms_1.FormControl('', forms_1.Validators.required),
            firstname: new forms_1.FormControl('', forms_1.Validators.required),
            email: new forms_1.FormControl('', [forms_1.Validators.required, validation_1.ValidationService.emailValidator]),
            passwords: new forms_1.FormGroup({
                password: new forms_1.FormControl('', forms_1.Validators.required),
                password2: new forms_1.FormControl('', forms_1.Validators.required)
            }, {}, validation_1.ValidationService.passwordConfirmationValidator)
        });
    }
    AccountCreate.prototype.onSubmit = function (value) {
        var _this = this;
        console.log(this.createAccountForm);
        if (this.createAccountForm.valid) {
            // créé le compte utilisateur
            this.mikiPerson.createAccount(value).then(function (data) {
                if (data.result == 1) {
                    _this.events.publish('account:created');
                    var toast = _this.toastCtrl.create({
                        message: 'Création de compte réussie',
                        duration: 3000
                    });
                    toast.onDidDismiss(function () {
                        _this.events.publish('account:createdOk');
                    });
                    toast.present();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: 'Erreur lors de la création du compte : ' + data.error,
                        duration: 3000
                    });
                    toast.onDidDismiss(function () {
                        // this.events.publish('account:created');
                    });
                    toast.present();
                }
            });
        }
        else {
            this.formSubmitedInvalid = true;
        }
    };
    return AccountCreate;
}());
AccountCreate = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/account-create/account-create.html',
        providers: [miki_person_1.MikiPersonService]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, miki_person_1.MikiPersonService, miki_publicite_1.MikiPubliciteService, ionic_angular_1.Events, ionic_angular_1.ToastController])
], AccountCreate);
exports.AccountCreate = AccountCreate;
