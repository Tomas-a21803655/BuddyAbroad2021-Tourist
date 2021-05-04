import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  messages: Observable<any[]>;

  constructor(private navCtrl: NavController,private chatService: ChatService) { }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages(
    );
  }

  goback() {
    this.navCtrl.pop();
  }

}
