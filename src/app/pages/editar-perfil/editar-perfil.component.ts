import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit, OnDestroy {
  file: File;
  nameFile: string;
  imagePath: string | ArrayBuffer;
  listCountries = [];
  subscription: Subscription;

  formEdit = new FormGroup({
    nick: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]),
    gender: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    biography: new FormControl('', [Validators.required]),
    facebook: new FormControl('', [Validators.required]),
    github: new FormControl('', [Validators.required]),
    linkedin: new FormControl('', [Validators.required]),
    twitter: new FormControl('', [Validators.required]),
  });
  formChangePassword = new FormGroup({
    newPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
    confirmNewPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
  });

  wordFilterCountry: string = '';
  wordFilterStatus = false;
  listFilterCountry = [];
  constructor(
    private countries: CountryService,
    private userService: UserService,
    private validador: ValidatorsService
  ) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getCountries();
    this.initForm();
    this.subscription = this.userService.getUserSubject().subscribe(
      (res) => {
        this.setFormData(res)
      }
    )
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
    this.listCountries = [...this.listFilterCountry]
    console.log(this.listCountries);

  }
  filterCountry(event: string) {
    console.log(event);
    this.wordFilterCountry = event;
    console.log(this.wordFilterCountry.length);

    this.listFilterCountry = this.listCountries.filter((e) => {
      if (e.normal.indexOf(event.toLocaleLowerCase()) !== -1) {
        // console.log(e.name_es);
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

  setFormData(user) {
    this.imagePath = user.img;

    this.formEdit.get('nick').setValue(user.nick || '');
    this.formEdit.get('email').setValue(user.email || '');
    this.formEdit.get('gender').setValue(user.gender || '');
    this.formEdit.get('birthday').setValue(user.birthday || '');
    this.formEdit.get('country').setValue(user.country || '');
    this.formEdit.get('biography').setValue(user.biography || '');

    this.formEdit.get('facebook').setValue(user.socialNetwork[0] ? user.socialNetwork[0].substr(13) : '');
    this.formEdit.get('github').setValue(user.socialNetwork[1] ? user.socialNetwork[1].substr(11) : '');
    this.formEdit.get('linkedin').setValue(user.socialNetwork[2] ? user.socialNetwork[2].substr(16) : '');
    this.formEdit.get('twitter').setValue(user.socialNetwork[3] ? user.socialNetwork[3].substr(12) : '');
  }

  getUserData() {
    const user = this.userService
      .getUser()
      .toPromise()
      .then((res: any) => res.userFound);
    return user;
  }

  async sendData() {
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

    await this.userService.putUser(data).toPromise()
      .then((res: any) => {
        localStorage.setItem('user', JSON.stringify(res.userSaved));
        this.userService.setUserSubect(res.userSaved);

      }).catch(err => console.log(err));
  }

  changeNewPassword() {

  }

  checkValid(campo: string) {
    return this.formEdit.get(campo).invalid && this.formEdit.get(campo).touched;
  }



  checkValidPassword(campo: string) {
    return this.formChangePassword.get(campo).invalid && this.formChangePassword.get(campo).touched;
  }

  samePassword() {
    const password1 = this.formChangePassword.get('newPassword').value;
    const password2 = this.formChangePassword.get('confirmNewPassword').value;

    return (password1 === password2) ? false : true;
  } 
}
