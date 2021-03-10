import {Injectable} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {HomeTripCardsModel} from './shared/homeTripCards.model';
import {element} from 'protractor';

@Injectable({
    providedIn: 'root'
})
export class FireStorageService {


    private static USERS_KEY = 'users';
    private static TRIPS_KEY = 'createdTrips';

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(public af: AngularFirestore, public angularAuth: AngularFireAuth) {
    }

    public unsubscribeOnLogout(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }


    getTripDetail(tripId: string, userId): Observable<HomeTripCardsModel> {
        return this.af.collection(FireStorageService.USERS_KEY).doc(userId)
            .collection<HomeTripCardsModel>(FireStorageService.TRIPS_KEY).doc<HomeTripCardsModel>(tripId).valueChanges();
    }

    public async assignAccInfo(): Promise<void> {
        const currentUser = firebase.auth().currentUser;
        return await this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid).set({
            image: 'assets/mockprofile.jpg',
            rating: 0,
            home: 'Where do you live?',
            name: 'First and Last Name',
            description: 'Tell the world about yourself!',
            languages: 'What languages do you speak?',
            earnings: 0,
        });
    }

    public getUserDocInfo(): Observable<any> {
        const currentUser = firebase.auth().currentUser;
        return this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid).valueChanges();
    }

    public getBuddyDocInfo(uid): Observable<any> {
        const currentUser = firebase.auth().currentUser;
        return this.af.collection(FireStorageService.USERS_KEY).doc(uid).valueChanges();
    }

    public async createProfile(profile): Promise<void> {
        const currentUser = firebase.auth().currentUser;
        return await this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid).update(profile);
    }

    public async createDesiredTrip(desiredTrip): Promise<void> {
        const currentUser = firebase.auth().currentUser;
        return await this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid).collection('unverifiedTrip')
            .doc('unverified').update(desiredTrip);
    }

    public async buyTrip(tripId): Promise<void> {
        const currentUser = firebase.auth().currentUser;
        const orderTripId = this.af.createId()
        let trip: HomeTripCardsModel;
        let trips: Observable<HomeTripCardsModel>;
        let desiredTrip


        this.af.collection('users').get()
            .subscribe(querySnapshot => {
                querySnapshot.forEach(doc => {
                    trips = this.getTripDetail(tripId, doc.id);
                    trips.forEach((element: HomeTripCardsModel) => {
                        if (element?.id === tripId) {
                            trip = element;
                            // here
                            this.af.collection('users').doc(currentUser.uid).collection('unverifiedTrip').doc('unverified').valueChanges()
                                .subscribe(async (data) => {
                                    desiredTrip = data;
                                    // here
                                    const tripToSetBuddy = {
                                        orderedTripId: tripId,
                                        image: trip.image,
                                        name: trip.name,
                                        description: trip.description,
                                        duration: trip.time,
                                        date: desiredTrip.desiredDate.substring(0, 10),
                                        time: desiredTrip.desiredTime.substring(11, 16),
                                        participants: desiredTrip.desiredParticipants,
                                        language: desiredTrip.desiredLanguage,
                                        orderedBy: currentUser.uid,
                                        status: 'Booked'
                                    };
                                    const tripToSetTourist = {
                                        orderedTripId: tripId,
                                        image: trip.image,
                                        name: trip.name,
                                        description: trip.description,
                                        duration: trip.time,
                                        date: desiredTrip.desiredDate.substring(0, 10),
                                        time: desiredTrip.desiredTime.substring(11, 16),
                                        participants: desiredTrip.desiredParticipants,
                                        language: desiredTrip.desiredLanguage,
                                        buddyId: trip.createdBy,
                                        status: 'Booked'
                                    };
                                    // here
                                    // await add active ao user tbm
                                    await this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid)
                                        .collection('touristScheduledTrips').doc(orderTripId).set(tripToSetTourist);
                                    // abaixo add ao buddy
                                    return await this.af.collection(FireStorageService.USERS_KEY).doc(trip.createdBy)
                                        .collection('buddyScheduledTrips').doc(orderTripId).set(tripToSetBuddy);
                                });

                        }
                    });
                });
            });
    }
}

// this.db.collection('users').get()
//             .subscribe(querySnapshot => {
//                 querySnapshot.forEach(doc => {
//                     this.trips = this.fireStorageService.getTripDetail(tripId, doc.id);
//                     this.trips.forEach((element: HomeTripCardsModel) => {
//                         if (element?.id === tripId) {
//                             this.trip = element;
//                             // after here
//                             this.fireStorageService.getBuddyDocInfo(element?.createdBy).subscribe((data) => {
//                                 this.userName = data.name;
//                                 this.userDescription = data.description;
//                                 this.userRating = data.rating;
//                                 this.userImage = data.image;
//                                 this.userLanguage = data.languages;
//                             });
//                         }
//                     });
//                 });
//             });
