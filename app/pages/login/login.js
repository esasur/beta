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
// import {, AbstractControl} from '@angular/common';
var forms_1 = require("@angular/forms");
var validation_1 = require("../../services/validation");
var miki_person_1 = require("../../services/miki-person");
var miki_publicite_1 = require("../../services/miki-publicite");
var Login = (function () {
    function Login(platform, toastCtrl, mikiPerson, mikiPublicite) {
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.mikiPerson = mikiPerson;
        this.mikiPublicite = mikiPublicite;
        this.authForm = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required, validation_1.ValidationService.emailValidator]),
            password: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    Login.prototype.onSubmit = function (value) {
        var _this = this;
        if (this.authForm.valid) {
            this.mikiPerson.testConnection(value.email, value.password).then(function (data) {
                // si erreur
                if (data == false) {
                    var toast = _this.toastCtrl.create({
                        message: "Échec lors de l'authentification.\n\rVeuillez contrôller votre nom d'utilisateur et votre mot de passe.",
                        duration: 3000
                    });
                    toast.present();
                }
            });
        }
    };
    return Login;
}());
Login = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/login/login.html',
        providers: [miki_person_1.MikiPersonService]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, ionic_angular_1.ToastController, miki_person_1.MikiPersonService, miki_publicite_1.MikiPubliciteService])
], Login);
exports.Login = Login;
