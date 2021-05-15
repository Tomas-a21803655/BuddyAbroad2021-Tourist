import {Injectable} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {HomeTripCardsModel} from './shared/homeTripCards.model';
import {element} from 'protractor';
import FieldValue = firebase.firestore.FieldValue;

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

    getBookedTripDetail(tripId: string, userId): Observable<any> {
        return this.af.collection(FireStorageService.USERS_KEY).doc(userId)
            .collection('touristScheduledTrips').doc(tripId).valueChanges();
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

    public getTargetUserDocInfo(target): Observable<any> {
        return this.af.collection(FireStorageService.USERS_KEY).doc(target).valueChanges();
    }

    public getUserDocInfoForMessage(SearchId): Observable<any> {
        const currentUser = firebase.auth().currentUser;
        return this.af.collection(FireStorageService.USERS_KEY).doc(SearchId).valueChanges();
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
            .doc('unverified').set(desiredTrip);
    }

    public getUserBookedTrips(): Observable<any> {
        return this.angularAuth.user
            .pipe(takeUntil(this.unsubscribe),
                switchMap(user => {
                    return this.af.collection(FireStorageService.USERS_KEY).doc(user.uid)
                        .collection('touristScheduledTrips').valueChanges();
                }));
    }

    public async updateTripStatus(statusCode, tripId, buddyId) {
        const currentUser = firebase.auth().currentUser;
        const field = {
            status: statusCode,
        };
        // buddy
        await this.af.collection(FireStorageService.USERS_KEY).doc(buddyId)
            .collection('buddyScheduledTrips').doc(tripId).update(field);
        // user
        await this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid)
            .collection('touristScheduledTrips').doc(tripId).update(field);
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
                    // tslint:disable-next-line:no-shadowed-variable
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
                                        status: 'Pending',
                                        id: orderTripId,
                                        location: trip.location,
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
                                        status: 'Pending',
                                        id: orderTripId,
                                        location: trip.location,

                                    };
                                    // await add active ao user
                                    await this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid)
                                        .collection('touristScheduledTrips').doc(orderTripId).set(tripToSetTourist);
                                    // abaixo add ao buddy
                                    // add balance
                                    const funds : any = trip.price * desiredTrip.desiredParticipants;
                                    await this.af.collection(FireStorageService.USERS_KEY).doc(trip.createdBy)
                                        .update({
                                            earnings: firebase.firestore.FieldValue.increment(funds)
                                        });
                                    // assign trip
                                    return await this.af.collection(FireStorageService.USERS_KEY).doc(trip.createdBy)
                                        .collection('buddyScheduledTrips').doc(orderTripId).set(tripToSetBuddy);
                                });

                        }
                    });
                });
            });
    }
}
