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
    public contactsId: any = [];


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
                    this.contactsId.push(doc.id)
                    this.fireStorageService.getTargetUserDocInfo(doc.id).subscribe((data) => {
                        this.contacts.push(data);
                    });
                });
            });
        this.backupContacts = this.contacts;
        return this.contacts;
    }

    goback() {
        this.navCtrl.pop();
    }


}
