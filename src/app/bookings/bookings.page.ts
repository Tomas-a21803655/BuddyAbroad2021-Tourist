import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {FireStorageService} from '../fire-storage.service';


@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
    public homeTripCards;
    type: string;

    constructor(private router: Router, public db: AngularFirestore, public fireStorageService: FireStorageService,) {
    }

    ngOnInit() {
        this.type = 'booked';
        this.homeTripCards = this.fireStorageService.getUserBookedTrips();
    }
}
