import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FireStorageService} from '../fire-storage.service';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  public userName;
  public userDescription;
  public userHome;
  public userLanguages;
  public userRating;
  public userImage;

  constructor(
      public fireStorageService: FireStorageService,
      public router: Router,
  ) { }

  ngOnInit() {
    this.fireStorageService.getUserDocInfo().subscribe((data) => {
      this.userName = data.name;
      this.userDescription = data.description;
      this.userHome = data.home;
      this.userLanguages = data.languages;
      this.userRating = data.rating;
      this.userImage = data.image;
    });

  }

}
