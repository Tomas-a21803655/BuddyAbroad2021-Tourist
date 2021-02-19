import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {HomeTripCardsModel} from '../shared/homeTripCards.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public homeTripCards: Observable<Array<HomeTripCardsModel>>;

  constructor(private router: Router, public db: AngularFirestore) {
  }

  ngOnInit() {
    this.getAllhomeTripCards().subscribe((data) => {
      this.homeTripCards = data;
      console.log(data);
    });
  }

  getAllhomeTripCards(): Observable<any> {
    return this.db.collection<HomeTripCardsModel>('homeTripCards').valueChanges();
  }
}
