import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private notifyService: NotificationService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required],
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type ="text" : this.type = "password";
    
  }

  onSignup() {
    if (this.signupForm.valid) {
      // Send the obj to database
      this.auth.signUp(this.signupForm.value)
      .subscribe({
        next: (res)=>{
          // alert(res.message);
          this.notifyService.showSuccess(res.message);
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          // alert(err?.error.message);
          if(err?.error.message == null){
            this.notifyService.showInfo('No response received from API!');
          }else{
            this.notifyService.showWarning(err?.error.message);
          }
        }
      })

    }else{

      // throw error
      ValidateForm.validateAllFormFields(this.signupForm);
      // alert("Your form is invalid")
      this.notifyService.showError("Your form is invalid");
    }
  }

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
