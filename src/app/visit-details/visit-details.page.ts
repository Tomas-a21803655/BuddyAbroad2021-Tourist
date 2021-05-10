import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {FireStorageService} from '../fire-storage.service';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-visit-details',
    templateUrl: './visit-details.page.html',
    styleUrls: ['./visit-details.page.scss'],
})
export class VisitDetailsPage implements OnInit {

    public trips: Observable<HomeTripCardsModel>;
    public trip: HomeTripCardsModel;
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
                    this.trips = this.fireStorageService.getTripDetail(tripId, doc.id);
                    this.trips.forEach((element: HomeTripCardsModel) => {
                        if (element?.id === tripId) {
                            this.trip = element;
                            // after here
                            this.fireStorageService.getBuddyDocInfo(element?.createdBy).subscribe((data) => {
                                this.userName = data.name;
                                this.userDescription = data.description;
                                this.userRating = data.rating;
                                this.userImage = data.image;
                                this.userLanguage = data.languages;
                                this.userId = element?.createdBy;
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
