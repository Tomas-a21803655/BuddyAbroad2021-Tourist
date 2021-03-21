import {Component, OnInit} from '@angular/core';
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
    public allHomeTripCardsBackup: any = [];

    constructor(private router: Router, public db: AngularFirestore) {
    }

    async ngOnInit() {
        await this.initializeItems();
    }

    async initializeItems(): Promise<any> {
        await this.db.collection('users').get()
            .subscribe(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.getTargetUserTrips(doc.id);
                });
            });
        this.allHomeTripCardsBackup = this.allHomeTripCards;
        return this.allHomeTripCards;
    }

    async filterList(evt) {
        this.allHomeTripCards = this.allHomeTripCardsBackup;
        const searchTerm = evt.srcElement.value;

        if (!searchTerm) {
            return;
        }

        this.allHomeTripCards = this.allHomeTripCards.filter(currentTrip => {
            if (currentTrip.name && searchTerm) {
                return (currentTrip.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            }
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
