import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FireAuthService} from '../fire-auth.service';
import {FireStorageService} from '../fire-storage.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    public validationsForm: FormGroup;
    public errorMessage = '';
    public successMessage = '';
    public validationMessages = {
        email: [
            {type: 'required', message: 'Email is required.'},
            {type: 'pattern', message: 'Enter a valid email.'}
        ],
        password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: ''}
        ]
    };

    constructor(
        private authService: FireAuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        public fireStorageService: FireStorageService
    ) {
    }

    public ngOnInit(): void {
        this.validationsForm = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(2),
                Validators.required
            ])),
        });
    }

    public tryRegister(value: { email: string, password: string }): void {
        this.authService.doRegister(value)
            .then(async res => {
                console.log(res);
                this.errorMessage = '';
                this.successMessage = 'Your account has been created. Please log in.';
                await this.fireStorageService.assignAccInfo().then(r =>
                    this.router.navigate(['/login'])
                );
            }, err => {
                console.log(err);
                this.errorMessage = err.message;
                this.successMessage = '';
            });
    }

    public goLoginPage(): void {
        this.router.navigate(['/login']);
    }

}
