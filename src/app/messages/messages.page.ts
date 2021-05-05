import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';
import {ChatService, User} from '../chat.service';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';
import {FireStorageService} from '../fire-storage.service';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';


@Component({
    selector: 'app-messages',
    templateUrl: './messages.page.html',
    styleUrls: ['./messages.page.scss'],
})


export class MessagesPage implements OnInit {

    currentUser = firebase.auth().currentUser;
    public contacts: any = []
    public backupContacts: any = [];
    public userList: any = [];


    constructor(private navCtrl: NavController, public fireStorageService: FireStorageService,
                private router: Router, public db: AngularFirestore) {
    }

    async ngOnInit() {
        await this.initializeItems();
    }

    async initializeItems(): Promise<any> {
        await this.db.collection(this.currentUser.uid).get()
            .subscribe(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.fireStorageService.getUserDocInfo().subscribe((data) => {
                        this.contacts.push(data);
                        console.log(this.contacts)
                    });
                });
            });
        this.backupContacts = this.contacts;
        return this.contacts;
    }

    //  return this.db.collection(this.currentUser.uid).doc('HUbWdhlA5ofpPGCu2wF3DrxVuo62').collection('messages').get()

    goback() {
        this.navCtrl.pop();
    }


}
