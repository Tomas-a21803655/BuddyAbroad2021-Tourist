import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FireStorageService} from '../fire-storage.service';
import firebase from 'firebase';
import functions = firebase.functions;
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public homeTripCards: Observable<Array<HomeTripCardsModel>>;
    public userList: any;
    public allHomeTripCards: any = [];

    constructor(public fireStorageService: FireStorageService, private router: Router, public db: AngularFirestore) {
    }

    async ngOnInit() {
        this.db.collection('users').get()
            .subscribe(querySnapshot => {
                querySnapshot.forEach(doc => {
                    // this.homeTripCards = this.fireStorageService.getUserTrips(doc.id);
                    this.homeTripCards = this.fireStorageService.getUserTrips(doc.id);
                    console.log(doc.id, ' => ', 'teste');
                });
            });
        // this.homeTripCards = await this.fireStorageService.getAllTrips();
    }
}
