import {Injectable} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {HomeTripCardsModel} from './shared/homeTripCards.model';

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


    getTripDetail(tripId: string,userId): Observable<HomeTripCardsModel> {
        return this.af.collection(FireStorageService.USERS_KEY).doc(userId)
            .collection<HomeTripCardsModel>(FireStorageService.TRIPS_KEY).doc<HomeTripCardsModel>(tripId).valueChanges();
    }

    public async assignNewAccBalance(): Promise<void> {
        const currentUser = firebase.auth().currentUser;
        return await this.af.collection(FireStorageService.USERS_KEY).doc(currentUser.uid).set({earnings: 0});
    }

}
