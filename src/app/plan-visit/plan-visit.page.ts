import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {FireStorageService} from '../fire-storage.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-plan-visit',
    templateUrl: './plan-visit.page.html',
    styleUrls: ['./plan-visit.page.scss'],
})
export class PlanVisitPage implements OnInit {

    constructor(private router: Router, private navCtrl: NavController,
                public fireStorageService: FireStorageService,
                private route: ActivatedRoute, public db: AngularFirestore) {
    }

    ngOnInit() {
        // const tripId: string = this.route.snapshot.paramMap.get('id');

    }

    goback() {
        this.navCtrl.pop();
    }

    public openBuyVisitPage(): void {
        this.router.navigate(['/buy-visit']);
    }

}
