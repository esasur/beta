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
var miki_documents_1 = require("../../services/miki-documents");
var miki_person_1 = require("../../services/miki-person");
var DocumentsList = (function () {
    function DocumentsList(navParams, mikiPerson, mikiDocuments, platform) {
        this.mikiPerson = mikiPerson;
        this.mikiDocuments = mikiDocuments;
        this.platform = platform;
        this.user = false;
        this.categoryId = 60;
        // récupert l'utilisateur connecté (passé en paramètres)
        if (navParams.get("user")) {
            this.user = navParams.get("user");
        }
        else {
            this.user = false;
        }
        this.categoryId = JSON.parse(navParams.data).categoryId;
    }
    // pour l'ouverture d'un document
    DocumentsList.prototype.openDoc = function (url) {
        if (this.platform.is('ios')) {
            window.open('http://es-asur.ch/' + url, '_blank', 'EnableViewPortScale=yes');
        }
        else {
            window.open('http://es-asur.ch/' + url, '_system', 'location=yes');
        }
    };
    return DocumentsList;
}());
DocumentsList = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/documents/documents-list.html',
        providers: [miki_documents_1.MikiDocumentsService]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavParams, miki_person_1.MikiPersonService, miki_documents_1.MikiDocumentsService, ionic_angular_1.Platform])
], DocumentsList);
exports.DocumentsList = DocumentsList;
var Documents = (function () {
    function Documents(platform) {
        this.platform = platform;
        // définit les tabs
        this.tab1 = DocumentsList;
        this.tab2 = DocumentsList;
    }
    return Documents;
}());
Documents = __decorate([
    core_1.Component({
        templateUrl: 'build/pages/documents/documents.html'
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform])
], Documents);
exports.Documents = Documents;
