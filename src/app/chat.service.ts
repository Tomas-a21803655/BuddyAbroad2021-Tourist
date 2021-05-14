import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';
import firebase from 'firebase';
import {HomeTripCardsModel} from './shared/homeTripCards.model';

export interface User {
    uid: string;
    email: string;
    name?: string;
    image?: string;
}

export interface Message {
    createdAt: firebase.firestore.FieldValue;
    id: string;
    from: string;
    msg: string;
    fromName: string;
    myMsg: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    currentUser: User = null;

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
        this.afAuth.onAuthStateChanged(user => {
           //  console.log('Changed: ', user);
            this.currentUser = user;
        });
    }

    addChatMessage(msg,targetUser) {
        this.afs.collection(this.currentUser.uid).doc(targetUser).set({userId: targetUser})
        this.afs.collection(targetUser).doc(this.currentUser.uid).set({userId: this.currentUser.uid})
        this.afs.collection(targetUser).doc(this.currentUser.uid).collection('messages').add({
            msg,
            from: this.currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return this.afs.collection(this.currentUser.uid).doc(targetUser).collection('messages').add({
            msg,
            from: this.currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    getChatMessages(targetId) {
        let users = [];
        return this.getUsers().pipe(
            switchMap(res => {
                users = res;
                // console.log('all users: ', users);
                return this.afs.collection(this.currentUser.uid).doc(targetId)
                    .collection('messages', ref => ref.orderBy('createdAt')).valueChanges({idField: 'id'}) as Observable<Message[]>
            }),
            map(messages => {
                for (let m of messages) {
                    m.fromName = this.getUserForMsg(m.from, users);
                    m.myMsg = this.currentUser.uid === m.from;
                }
                // console.log('all messages: ', messages);
                return messages;
            })
        )
    }

    getUsers() {
        return this.afs.collection('users').valueChanges({idField: 'uid'}) as Observable<User[]>;
    }

    getUserForMsg(msgFromId, users: User[]): string {
        for (let usr of users) {
            if (usr.uid == msgFromId) {
                return usr.name;
            }
        }
        return 'Deleted';
    }
}
