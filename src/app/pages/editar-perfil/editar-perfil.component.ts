import { Component, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  listRols = [
    'Frontend',
    'Backend',
    'DevOps',
    'Video Games Developers',
    'UI/UX',
    'Database Developer',
    'Cloud Computing'
  ];
  inputRol: string = "";
  loading = false;
  file: File;
  nameFile: string;
  imagePath: string | ArrayBuffer;
  listCountries = [];
  subscription: Subscription;
  isDirty$: Observable<boolean>;

  formEdit = new FormGroup({
    nick: new FormControl('', [Validators.required]),
    email: new FormControl({ value: '', disabled: true }, []),
    gender: new FormControl('', [Validators.pattern('(Otro|otro|m|M|f|F)$')]),
    knowledgeArea: new FormControl('', []),
    birthday: new FormControl('', []),
    country: new FormControl('', []),
    biography: new FormControl('', [Validators.maxLength(140)]),
    facebook: new FormControl('', []),
    github: new FormControl('', []),
    linkedin: new FormControl('', []),
    twitter: new FormControl('', []),
  });

  formChangePassword = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  wordFilterCountry: string = '';
  wordFilterStatus = false;
  listFilterCountry = [];
  constructor(
    private countries: CountryService,
    private userService: UserService,
    private toastr: ToastrService,
    private validador: ValidatorsService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.initForm();
    this.validarMaxString();
    this.knowledgeAreaInputControler();

    this.renderer.listen(<HTMLElement>document.getElementById('iconShow'), "click", () => {
      var cambio = <HTMLInputElement>document.getElementById("passwordInput");
      var containerIconShow = <HTMLInputElement>document.getElementById('iconShow');

      if (cambio.type == "password") {
        cambio.type = "text";
        containerIconShow.removeAttribute('class');
        containerIconShow.setAttribute('class', 'fa fa-eye')
      } else {
        cambio.type = "password";
        containerIconShow.removeAttribute('class');
        containerIconShow.setAttribute('class', 'fa fa-eye-slash');
      }
    });

    this.renderer.listen(<HTMLElement>document.getElementById('iconShowRepeat'), "click", () => {
      var cambio = <HTMLInputElement>document.getElementById("confirmNewPassword");
      var containerIconShow = <HTMLInputElement>document.getElementById('iconShowRepeat');

      if (cambio.type == "password") {
        cambio.type = "text";
        containerIconShow.removeAttribute('class');
        containerIconShow.setAttribute('class', 'fa fa-eye')
      } else {
        cambio.type = "password";
        containerIconShow.removeAttribute('class');
        containerIconShow.setAttribute('class', 'fa fa-eye-slash');
      }
    });
  }

  selectRol(selectRol: string) {
    this.formEdit.patchValue({
      knowledgeArea: selectRol
    });
    (<HTMLElement>document.getElementById('customizeSelectUl')).removeAttribute;
    (<HTMLElement>document.getElementById('customizeSelectUl')).setAttribute("style", "display:none !important");
    this.formEdit.markAsDirty();
  }

  validarMaxString() {
    const containebiografiaInput = (<HTMLInputElement>document.getElementById('biografiaInput'));
    this.renderer.listen((<HTMLInputElement>document.getElementById('biografiaInput')), 'input', () => {
      if (containebiografiaInput.value.length >= 140)
        containebiografiaInput.value = containebiografiaInput.value.slice(0, 140);
    });
  }

  knowledgeAreaInputControler() {
    this.renderer.listen(<HTMLInputElement>document.getElementById("knowledgeAreaInput"), "input", () => {
      (<HTMLInputElement>document.getElementById('knowledgeAreaInput')).value = "";
    });

    (<HTMLElement>document.getElementById('customizeSelectUl')).setAttribute("style", "display:none !important");

    this.renderer.listen(<HTMLInputElement>document.getElementById("knowledgeAreaInput"), "click", () => {
      (<HTMLElement>document.getElementById('customizeSelectUl')).removeAttribute;
      (<HTMLElement>document.getElementById('customizeSelectUl')).setAttribute("style", "display:block !important");
    });
  }

  changeListener($event): void {
    this.formEdit.markAsDirty();
    this.file = $event.target.files[0];
    this.nameFile = this.file['name'];
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.imagePath = myReader.result;
    };

    myReader.readAsDataURL(file);
  }

  async getCountries() {
    const res: any = await this.countries.getCountries().toPromise();
    this.listCountries = res.countries;
    this.listCountries.forEach(
      (word) => {
        this.listFilterCountry.push(this.normalizeWord(word.name_es));
      }
    );
    this.listCountries = [...this.listFilterCountry];
  }

  filterCountry(event: string) {
    this.wordFilterCountry = event;
    this.listFilterCountry = this.listCountries.filter((e) => {
      if (e.normal.indexOf(event?.toLocaleLowerCase()) !== -1) {
        return true;
      }
      return false
    });
  }

  selectCountry(country_name) {
    this.formEdit.get('country').setValue(country_name);
    this.wordFilterCountry = '';
  }

  normalizeWord(word: string) {
    const letters = [{
      search: 'áäàãâ',
      replace: 'a'
    }, {
      search: 'éëèê',
      replace: 'e'
    }, {
      search: 'íïìî',
      replace: 'i'
    }, {
      search: 'óöòõô',
      replace: 'o'
    }, {
      search: 'úüùû',
      replace: 'u'
    }, {
      search: 'ñ',
      replace: 'n'
    }, {
      search: 'ç',
      replace: 'c'
    }];
    let normal;

    // Convertimos la palabra a minusculas
    word = word.toLowerCase();
    normal = word;

    // Por cada "letra"
    letters.forEach(letter => {
      const re = new RegExp('[' + letter.search + ']', 'g');
      // Reemplazamos el caracter acentuado
      normal = normal.replace(re, letter.replace);
    });

    // Devolvemos un objeto con la palabra original y la normalizada
    return {
      original: word,
      normal: normal
    };
  }

  async initForm() {
    this.setFormData(await this.getUserData());
  }

  private setFormData(user) {
    this.imagePath = user.img;

    this.formEdit.get('nick').setValue(user.nick || '');
    this.formEdit.get('email').setValue(user.email || '');
    this.formEdit.get('gender').setValue(user.gender || '');
    this.formEdit.get('birthday').setValue(user.birthday || '');
    this.formEdit.get('country').setValue(user.country || '');
    this.formEdit.get('biography').setValue(user.biography || '');
    this.formEdit.get('knowledgeArea').setValue(user.knowledgeArea || '');

    user.socialNetwork.forEach((net: any) => {
      if (net !== null) {
        switch (net.substr(0, 2)) {
          case 'fa':
            this.formEdit.get('facebook').setValue(net.substr(13));
            break;
          case 'li':
            this.formEdit.get('linkedin').setValue(net.substr(16));
            break;
          case 'tw':
            this.formEdit.get('twitter').setValue(net.substr(12));
            break;
          case 'gi':
            this.formEdit.get('github').setValue(net.substr(11));
            break;
        }
      }
    });
  }

  async getUserData() {
    const res: any = await this.userService.getUser().toPromise();
    return res.userFound;
  }

  private prepareData() {
    const {
      facebook,
      github,
      linkedin,
      twitter,
      ...formData
    } = this.formEdit.value;

    const temp = [];

    if (facebook != null) {
      temp.push(`facebook.com/${facebook}`)
    }
    if (github != null) {
      temp.push(`github.com/${github}`)
    }
    if (linkedin != null) {
      temp.push(`linkedin.com/in/${linkedin}`)
    }
    if (twitter != null) {
      temp.push(`twitter.com/${twitter}`)
    }

    const socialNetwork = [];

    temp.forEach(element => {
      if (element.substr(element.length - 1) !== '/') {
        socialNetwork.push(element);
      }
    });

    const data = { ...formData, socialNetwork, img: this.file }

    return data;
  }

  async sendData() {
    this.loading = true;

    if (this.formEdit.invalid) {
      this.formEdit.markAllAsTouched();
      this.loading = false;
      return;
    }

    const data = this.prepareData();

    const res: any = await this.userService.putUser(data).toPromise();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(res.userSaved));
      this.userService.setUserSubect(res.userSaved);
      this.formEdit.reset();
      this.initForm();
      this.loading = false;
      this.toastr.success('Cambios guardados');
    } else {
      this.loading = false;
      this.toastr.error('Error al guardar cambios');
    }
  }

  async changeNewPassword() {
    this.loading = true;
    const formData = this.formChangePassword.value;
    const res: any = await this.userService.editPassword(formData.newPassword).toPromise()

    if (res.ok) {
      this.loading = false;
      this.toastr.success('Contraseña actualizada con éxito');
    } else {
      this.loading = false;
      this.toastr.error('Error al actualizar la contraseña');
    }

    this.formChangePassword.reset();
  }

  checkValid(field: string) {
    return this.formEdit.get(field).invalid && this.formEdit.get(field).touched;
  }

  checkValidLenght(field: string) {
    return this.formEdit.get(field).errors && this.formEdit.get(field).touched;
  }

  checkValidPassword(field: string) {
    return this.formChangePassword.get(field).invalid && this.formChangePassword.get(field).touched;
  }

  samePassword() {
    const password1 = this.formChangePassword.get('newPassword').value;
    const password2 = this.formChangePassword.get('confirmNewPassword').value;
    return (password1 === password2) ? false : true;
  }

  @HostListener('window:beforeunload', ['$event'])
  public onPageUnload($event: BeforeUnloadEvent) {
    if (this.hasUnsavedChanges()) {
      $event.returnValue = true;
    }
  }

  private hasUnsavedChanges() {
    return this.formEdit.dirty || this.formChangePassword.dirty;
  }
}
