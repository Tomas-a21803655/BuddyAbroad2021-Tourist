import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FireStorageService} from '../fire-storage.service';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  public homeTripCards;

  constructor(private router: Router, public db: AngularFirestore,public fireStorageService: FireStorageService,) {
  }

  ngOnInit() {
    this.homeTripCards = this.fireStorageService.getUserBookedTrips();
  }

  getAllhomeTripCards(): Observable<any> {
    return this.db.collection<any>('homeTripCards').valueChanges();
  }
}
