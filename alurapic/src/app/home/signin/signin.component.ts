import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{
    
    loginForm: FormGroup;

    @ViewChild('usernameInputDOM') usernameInput: ElementRef<HTMLInputElement>;
    
    constructor(
                    private formBuilder: FormBuilder, 
                    private authService: AuthService, 
                    private router: Router,
                    private platformDetectorService: PlatformDetectorService
                ){ }
    
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password:['', Validators.required]
        });

        this.platformDetectorService.isPlatformBrowser() && this.usernameInput.nativeElement.focus();
    }

    login(){

        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(username, password)
            .subscribe(() => {
                                console.log('AUTENTICADO')
                                //this.router.navigateByUrl(`user/${username}`)
                                this.router.navigate(['user', username])
                            }, 
                        err => {
                                    console.log(err);

                                    this.loginForm.reset();

                                    this.platformDetectorService.isPlatformBrowser() && this.usernameInput.nativeElement.focus();

                                    alert('Invalid user name or password');

                        }
                    );

    }
}