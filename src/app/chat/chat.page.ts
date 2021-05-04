import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {IonContent, NavController} from '@ionic/angular';
import {Message, ChatService} from '../chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: Observable<any[]>;
  newMsg = '';

  constructor(private chatService: ChatService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages(
    );
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  goback() {
    this.navCtrl.pop();
  }

}
