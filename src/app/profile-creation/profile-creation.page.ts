import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FireStorageService} from '../fire-storage.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.page.html',
  styleUrls: ['./profile-creation.page.scss'],
})
export class ProfileCreationPage implements OnInit {

  public user;

  public validationsForm: FormGroup;

  constructor(private router: Router, private navCtrl: NavController, private formBuilder: FormBuilder,
              public fireStorageService: FireStorageService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const recievedUser = this.route.snapshot.paramMap.get('user');
    const userArr = recievedUser.split('&');
    this.user = {
      name: userArr[0],
      description: userArr[1],
      home: userArr[2],
      languages: userArr[3],
    }

    this.validationsForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required
      ])),
      home: new FormControl('', Validators.compose([
        Validators.required
      ])),
      languages: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  async onSubmit(value) {
    // Noodle code deadline Refactor depois
    let nameToSet = value.name;
    if (nameToSet === '') {
      nameToSet = this.user.name;
    }

    let descriptionToSet = value.description;
    if (descriptionToSet === '') {
      descriptionToSet = this.user.description;
    }

    let homeToSet = value.home;
    if (homeToSet === '') {
      homeToSet = this.user.home;
    }

    let languageToSet = value.languages;
    if (languageToSet === '') {
      languageToSet = this.user.languages;
    }

    const profile = {
      image: 'assets/mockprofile.jpg',
      // rating: this.user.rating,
      home: homeToSet,
      name: nameToSet,
      description: descriptionToSet,
      languages: languageToSet,
    };
    await this.fireStorageService.createProfile(profile).then(
        () => {
          this.router.navigate(['/tabs/profile']);
        }
    );

  }

  resetFields() {
    this.validationsForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      home: new FormControl('', Validators.required),
      languages: new FormControl('', Validators.required),
    });
  }

  goback() {
    this.navCtrl.pop();
  }

}
