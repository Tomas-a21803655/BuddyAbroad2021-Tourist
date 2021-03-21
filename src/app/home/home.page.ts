import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FireStorageService} from '../fire-storage.service';
import firebase from 'firebase';
import functions = firebase.functions;
import {map, switchMap, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public allHomeTripCards: any = [];

    constructor(public fireStorageService: FireStorageService, private router: Router, public db: AngularFirestore) {
    }

    async ngOnInit() {
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
                    this.allHomeTripCards.sort((a, b) => a.rating - b.rating); // Ascending sort
                    this.allHomeTripCards.reverse()
                });
            });
    }
}
