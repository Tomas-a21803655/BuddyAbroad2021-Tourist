import {Component, OnInit} from '@angular/core';
import {FireStorageService} from '../fire-storage.service';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  public user;

  constructor(
      public fireStorageService: FireStorageService,
      public router: Router, public db: AngularFirestore) {
  }

  ngOnInit() {
    this.user = {
      name: 'User',
      description: 'Description',
      home: 'Home',
      languanges: 'Languages',
      rating: '0',
      image: '/assets/addProfilePic.jpg',
    }
    this.fireStorageService.getUserDocInfo().subscribe((data) => {
      this.user = data;
    });
  }

}
