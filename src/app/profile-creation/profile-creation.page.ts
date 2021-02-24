import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FireStorageService} from '../fire-storage.service';

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.page.html',
  styleUrls: ['./profile-creation.page.scss'],
})
export class ProfileCreationPage implements OnInit {

  public validationsForm: FormGroup;

  constructor(private router: Router, private navCtrl: NavController, private formBuilder: FormBuilder,
              public fireStorageService: FireStorageService,) {
  }

  ngOnInit() {
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

    const profile = {
      image: 'assets/mockprofile.jpg',
      rating: 0,
      home: value.home,
      name: value.name,
      description: value.description,
      languages: value.languages,
    };
    await this.fireStorageService.createProfile(profile).then(
        () => {
          this.resetFields();
          this.router.navigate(['/tabs/profile']);
        }
    );

  }

  resetFields(){
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
