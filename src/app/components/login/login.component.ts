import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserStoreService } from 'src/app/services/user-store.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private notifyService: NotificationService,
    private userstore: UserStoreService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  };

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type ="text" : this.type = "password";
  };

  onLogin() {
    if (this.loginForm.valid) {
      // Send the obj to database
      this.auth.logIn(this.loginForm.value)
      .subscribe({
        next: (res)=>{
          // alert(res.message);
          this.notifyService.showSuccess(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodeToken();
          this.userstore.setFullNameForStore(tokenPayload.name);
          this.userstore.setRolesForStore(tokenPayload.role);
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          // alert(err?.error.message);
          if(err?.error.message == null){
            this.notifyService.showInfo('No response received from API!');
          }else{
            this.notifyService.showError(err?.error.message);
          }
        }
      })

    }else{

      // throw error
      ValidateForm.validateAllFormFields(this.loginForm);
      // alert("Your form is invalid");
      this.notifyService.showError("Your form is invalid!");
    }
  };

  // private validateAllFormFields(formGroup:FormGroup){
  //   Object.keys(formGroup.controls).forEach(field=>{
  //     const control = formGroup.get(field);
  //     if (control instanceof FormControl) {
  //       control.markAsDirty({onlySelf:true});
  //     }else if(control instanceof FormGroup){
  //       this.validateAllFormFields(control)
  //     }
  //   })
  // }
}
