import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FireStorageService} from '../fire-storage.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import firebase from 'firebase';

@Component({
    selector: 'app-buy-visit',
    templateUrl: './buy-visit.page.html',
    styleUrls: ['./buy-visit.page.scss'],
})
export class BuyVisitPage implements OnInit {

    public trips: Observable<HomeTripCardsModel>;
    public trip: HomeTripCardsModel;
    public desiredDate;
    public desiredTime;
    public desiredParticipants;
    public desiredLanguage;
    public orderTotal;
    public price;
    public participants;
    public savedTripId: string = this.route.snapshot.paramMap.get('id');

    constructor(private router: Router, private navCtrl: NavController,
                public fireStorageService: FireStorageService,
                private route: ActivatedRoute, public db: AngularFirestore) {
    }

    ngOnInit() {
        const tripId: string = this.route.snapshot.paramMap.get('id');

        this.db.collection('users').get()
            .subscribe(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.trips = this.fireStorageService.getTripDetail(tripId, doc.id);
                    this.trips.forEach((element: HomeTripCardsModel) => {
                        if (element?.id === tripId) {
                            this.trip = element;
                            this.price = element?.price;
                        }
                    });
                });
                const currentUser = firebase.auth().currentUser;
                this.db.collection('users').doc(currentUser.uid).collection('unverifiedTrip').doc('unverified').valueChanges()
                    .subscribe((data) => {
                        this.desiredDate = data.desiredDate.split('T', 1);
                        this.desiredTime = data.desiredTime.substring(11, 16);
                        this.desiredParticipants = data.desiredParticipants;
                        this.desiredLanguage = data.desiredLanguage;
                        this.participants = data.desiredParticipants;
                    });
            });
    }

    goback() {
        this.navCtrl.pop();
    }

    async onSubmit() {
        await this.fireStorageService.buyTrip(this.savedTripId).then(
            () => {
                this.router.navigate(['/trip-bought']);
            }
        );
    }

    public calculatePrice(): any {
        // console.log('order total_', this.orderTotal, 'price _', this.price, 'parti', this.participants);
        return this.orderTotal = this.price * this.participants;
    }
}
