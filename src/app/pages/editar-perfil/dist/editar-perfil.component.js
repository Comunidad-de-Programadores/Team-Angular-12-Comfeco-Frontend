"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.EditarPerfilComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
//Podemoms usar jQuery, ahora
// declare var jQuery:any;
// declare var $:any;
var EditarPerfilComponent = /** @class */ (function () {
    function EditarPerfilComponent(countries) {
        this.countries = countries;
        this.listCountries = [];
        this.formEdit = new forms_1.FormGroup({
            nick: new forms_1.FormControl('', [forms_1.Validators.required]),
            email: new forms_1.FormControl('', [forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
            gender: new forms_1.FormControl('', [forms_1.Validators.required]),
            birthday: new forms_1.FormControl('', [forms_1.Validators.required]),
            country: new forms_1.FormControl('', [forms_1.Validators.required]),
            biography: new forms_1.FormControl('', [forms_1.Validators.required]),
            facebook: new forms_1.FormControl('', [forms_1.Validators.required]),
            github: new forms_1.FormControl('', [forms_1.Validators.required]),
            linkedin: new forms_1.FormControl('', [forms_1.Validators.required]),
            twitter: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    }
    EditarPerfilComponent.prototype.ngOnInit = function () {
        this.getCountries();
        this.initForm();
        //   document.getElementById("file").onchange = function (e:Event) {
        //   // Creamos el objeto de la clase FileReader
        //   let reader = new FileReader();
        //   const target = e.target as HTMLInputElement;
        //   // Leemos el archivo subido y se lo pasamos a nuestro fileReader
        //   reader.readAsDataURL(target.files[0]);
        //   // Le decimos que cuando este listo ejecute el código interno
        //   reader.onload = function () {
        //     let preview = document.getElementById('preview');
        //     let img = <HTMLImageElement> document.createElement('img');
        //     img.setAttribute("src", reader.result as string);
        //     img.setAttribute("style", "border-radius:50%;width:8em;height:8em;margin-top:-125px;");
        //     //preview.innerHTML = '';
        //     preview.append(img);
        //   };
        // }
    };
    EditarPerfilComponent.prototype.changeListener = function ($event) {
        this.file = $event.target.files[0];
        console.log(this.file);
        this.nameFile = this.file['name'];
        this.readThis($event.target);
    };
    EditarPerfilComponent.prototype.readThis = function (inputValue) {
        var _this = this;
        var file = inputValue.files[0];
        var myReader = new FileReader();
        myReader.onloadend = function (e) {
            _this.imagePath = myReader.result;
        };
        myReader.readAsDataURL(file);
    };
    EditarPerfilComponent.prototype.getCountries = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.countries.getCountries().toPromise()];
                    case 1:
                        res = _a.sent();
                        this.listCountries = res;
                        console.log(this.listCountries);
                        return [2 /*return*/];
                }
            });
        });
    };
    EditarPerfilComponent.prototype.initForm = function () {
        this.formEdit.get('nick').setValue('123');
    };
    EditarPerfilComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-perfil',
            templateUrl: './editar-perfil.component.html',
            styleUrls: ['./editar-perfil.component.css']
        })
    ], EditarPerfilComponent);
    return EditarPerfilComponent;
}());
exports.EditarPerfilComponent = EditarPerfilComponent;
