import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public allHomeTripCards: any = [];
  public labels: any =['Local Culture','Sightseeing Tours']

  constructor(private router: Router, public db: AngularFirestore) {
  }

  ngOnInit() {
    this.db.collection('users').get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.getTargetUserTrips(doc.id);
          });
        });
  }

  public getTargetUserTrips(targetUser): Subscription {
    return this.db.collection('users').doc(targetUser).collection<HomeTripCardsModel>('createdTrips').get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.allHomeTripCards.push(doc.data());
          });
        });
  }

}
