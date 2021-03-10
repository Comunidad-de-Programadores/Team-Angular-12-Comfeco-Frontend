import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  loading = false;
  file: File;
  nameFile: string;
  imagePath: string | ArrayBuffer;
  listCountries = [];
  subscription: Subscription;

  formEdit = new FormGroup({
    nick: new FormControl('', [Validators.required]),
    email: new FormControl({value: '', disabled: true}, [
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]),
    gender: new FormControl('', [Validators.pattern('(Otro|otro|m|M|f|F)$')]),
    birthday: new FormControl('', []),
    country: new FormControl('', []),
    biography: new FormControl('', []),
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
    private validador: ValidatorsService
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.initForm();
  }

  changeListener($event): void {
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
    if (user.socialNetwork) {
      this.formEdit.get('facebook').setValue(user.socialNetwork[0] ? user.socialNetwork[0].substr(13) : '');
      this.formEdit.get('github').setValue(user.socialNetwork[1] ? user.socialNetwork[1].substr(11) : '');
      this.formEdit.get('linkedin').setValue(user.socialNetwork[2] ? user.socialNetwork[2].substr(16) : '');
      this.formEdit.get('twitter').setValue(user.socialNetwork[3] ? user.socialNetwork[3].substr(12) : '');
    }

  }

  async getUserData() {
    const res: any = await this.userService.getUser().toPromise();
    return res.userFound;
  }

  private prepareData(){
    const {
      facebook,
      github,
      linkedin,
      twitter,
      ...formData
    } = this.formEdit.value;

    
    const socialNetwork = [];
    const temp = [
      `facebook.com/${facebook}`,
      `github.com/${github}`,
      `linkedin.com/in/${linkedin}`,
      `twitter.com/${twitter}`
    ];

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

    const data = this.prepareData();

    const res: any = await this.userService.putUser(data).toPromise();

    if(res.ok){
      localStorage.setItem('user', JSON.stringify(res.userSaved));
      this.userService.setUserSubect(res.userSaved);
      this.formEdit.reset();
      this.initForm();
      this.loading = false;
      this.toastr.success('Cambios guardados');
    } else{
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

  checkValidPassword(field: string) {
    return this.formChangePassword.get(field).invalid && this.formChangePassword.get(field).touched;
  }

  samePassword() {
    const password1 = this.formChangePassword.get('newPassword').value;
    const password2 = this.formChangePassword.get('confirmNewPassword').value;
    return (password1 === password2) ? false : true;
  }
}
