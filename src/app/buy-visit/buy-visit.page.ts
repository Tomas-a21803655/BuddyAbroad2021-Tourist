import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-buy-visit',
  templateUrl: './buy-visit.page.html',
  styleUrls: ['./buy-visit.page.scss'],
})
export class BuyVisitPage implements OnInit {

  constructor(private navCtrl:NavController,private route: ActivatedRoute,) { }

  ngOnInit() {
    const tripId: string = this.route.snapshot.paramMap.get('id');

  }

  goback() {
    this.navCtrl.pop();
  }
}
