"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CountryService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var CountryService = /** @class */ (function () {
    function CountryService(http) {
        this.http = http;
    }
    CountryService.prototype.getCountries = function () {
        return this.http.get('https://restcountries.eu/rest/v2/all')
            .pipe(operators_1.map(function (res) {
            return res.map(function (country) { return ({ name: country.name }); });
        }));
    };
    CountryService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CountryService);
    return CountryService;
}());
exports.CountryService = CountryService;
