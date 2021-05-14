import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {FireStorageService} from '../fire-storage.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-booked-trip-details',
    templateUrl: './booked-trip-details.page.html',
    styleUrls: ['./booked-trip-details.page.scss'],
})
export class BookedTripDetailsPage implements OnInit {

    public trips: any;
    public trip: any;
    public userName;
    public userDescription;
    public userRating;
    public userImage;
    public userLanguage;
    public userId;

    constructor(private router: Router, private navCtrl: NavController,
                public fireStorageService: FireStorageService,
                private route: ActivatedRoute, public db: AngularFirestore) {
    }

    ngOnInit() {
        const tripId: string = this.route.snapshot.paramMap.get('id');

        this.db.collection('users').get()
            .subscribe(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.trips = this.fireStorageService.getBookedTripDetail(tripId, doc.id);
                    this.trips.forEach((element: any) => {
                        if (element?.id === tripId) {
                            this.trip = element;
                            this.userId = element?.buddyId;
                            this.fireStorageService.getBuddyDocInfo(element?.buddyId).subscribe((data) => {
                                this.userName = data.name;
                                this.userDescription = data.description;
                                this.userRating = data.rating;
                                this.userImage = data.image;
                                this.userLanguage = data.languages;
                            });
                        }
                    });
                });
            });
    }

    goback() {
        this.navCtrl.pop();
    }
}
