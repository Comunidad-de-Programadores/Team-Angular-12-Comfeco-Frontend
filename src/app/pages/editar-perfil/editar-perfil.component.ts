import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(
    private countries: CountryService,
    private userService: UserService
  ) {}


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getCountries();
    this.initForm();
    this.subscription = this.userService.getUserSubject().subscribe(
      (res)=>{
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

    this.formEdit.get('facebook').setValue(user.socialNetwork[0].substr(13) || '');
    this.formEdit.get('github').setValue(user.socialNetwork[1].substr(11) || '');
    this.formEdit.get('linkedin').setValue(user.socialNetwork[2].substr(16) || '');
    this.formEdit.get('twitter').setValue(user.socialNetwork[3].substr(12) || '');
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

    temp.forEach( element => {
      if(element.substr(element.length - 1) !== '/'){
        socialNetwork.push(element);
      }
    });
   
    
    const data = {...formData, socialNetwork , img: this.file}
   
    await this.userService.putUser(data).toPromise()
        .then( (res: any) => {
          localStorage.setItem('user', JSON.stringify(res.userSaved));
          this.userService.setUserSubect(res.userSaved);
          
        }).catch( err => console.log(err));
  }
}
