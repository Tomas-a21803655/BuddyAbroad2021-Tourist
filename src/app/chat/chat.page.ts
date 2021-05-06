import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {IonContent, NavController} from '@ionic/angular';
import {Message, ChatService} from '../chat.service';
import {FireStorageService} from '../fire-storage.service';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
    @ViewChild(IonContent) content: IonContent;

    messages: Observable<any[]>;
    target: any;
    newMsg = '';

    constructor(private route: ActivatedRoute, private chatService: ChatService, private router: Router,
                private navCtrl: NavController, public fireStorageService: FireStorageService) {
    }

    async ngOnInit() {
        const contactId: string = this.route.snapshot.paramMap.get('id');
        await this.initializeItems(contactId);
        this.messages = this.chatService.getChatMessages(this.route.snapshot.paramMap.get('id'));
    }

    async initializeItems(contactId): Promise<any> {
        this.fireStorageService.getTargetUserDocInfo(contactId).subscribe((data) => {
            return this.target = data;
        });
    }

    sendMessage() {
        this.chatService.addChatMessage(this.newMsg, this.route.snapshot.paramMap.get('id')).then(() => {
            this.newMsg = '';
            this.content.scrollToBottom();
        });
    }

    goback() {
        this.navCtrl.pop();
    }

}
