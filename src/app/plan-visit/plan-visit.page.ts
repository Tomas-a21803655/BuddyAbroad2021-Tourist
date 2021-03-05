import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {FireStorageService} from '../fire-storage.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-plan-visit',
    templateUrl: './plan-visit.page.html',
    styleUrls: ['./plan-visit.page.scss'],
})
export class PlanVisitPage implements OnInit {

    public validationsForm: FormGroup;
    public targetTripId = this.route.snapshot.paramMap.get('id');


    constructor(private router: Router, private navCtrl: NavController,
                public fireStorageService: FireStorageService,
                private route: ActivatedRoute, public db: AngularFirestore, private formBuilder: FormBuilder,) {
    }

    ngOnInit() {
        const tripId: string = this.route.snapshot.paramMap.get('id');
        // form
        this.validationsForm = this.formBuilder.group({
            desiredDate: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            desiredTime: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            desiredParticipants: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            desiredLanguage: new FormControl('', Validators.compose([
                Validators.required,
            ])),
        });
    }

    async onSubmit(value) {
        console.log('submit');
        const desiredTrip = {
            tripId: this.targetTripId,
            desiredDate: value.desiredDate,
            desiredTime: value.desiredTime,
            desiredParticipants: value.desiredParticipants,
            desiredLanguage: value.desiredLanguage,

        };
        await this.fireStorageService.createDesiredTrip(desiredTrip).then(
            () => {
                this.router.navigate(['/buy-visit/',this.targetTripId]);
            }
        );
    }

    goback() {
        this.navCtrl.pop();
    }

}
