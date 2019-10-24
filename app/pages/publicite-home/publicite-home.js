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
var PubliciteHome = (function () {
    function PubliciteHome(platform, mikiPublicite, events, navParams) {
        this.platform = platform;
        this.mikiPublicite = mikiPublicite;
        this.events = events;
        this.navParams = navParams;
        this.pubType = '';
        this.printButton = false;
        this.canPrintButton = false;
        // récupert le type de publicité à afficher (fc_home/ps_home pour "formation continue/premiers secours")
        if (navParams.data.pubType) {
            this.pubType = navParams.data.pubType;
            // si c'est la publicité de démarrage, affiche le bouton pour quitter la pub seulement après 3 secondes
            if (this.pubType == 'start') {
                this.printButton = false;
                var el = this;
                setTimeout(function () {
                    el.printButton = true;
                }, 4000);
            }
            else {
                this.printButton = true;
            }
        }
    }
    PubliciteHome.prototype.close = function () {
        this.events.publish('homePublicite:closed', this.pubType);
    };
    return PubliciteHome;
}());
PubliciteHome = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/publicite-home/publicite-home.html',
        providers: [miki_publicite_1.MikiPubliciteService]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, miki_publicite_1.MikiPubliciteService, ionic_angular_1.Events, ionic_angular_1.NavParams])
], PubliciteHome);
exports.PubliciteHome = PubliciteHome;
