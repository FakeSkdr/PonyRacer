import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registrationFailed: Boolean = false;

  public userForm: FormGroup;
  public passwordForm: FormGroup;

  public loginCtrl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public passwordCtrl = new FormControl('', Validators.required);
  public confirmPasswordCtrl = new FormControl('', Validators.required);
  public birthYearCtrl = new FormControl('', [
    Validators.required, RegisterComponent.validYear
  ]);

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return password === confirm ? null : { matchingError: true };
  }

  static validYear(control: FormControl) {
    const isValid = control.value >= 1900 && control.value <= new Date().getFullYear();
    return isValid ? null : { invalidYear: true };
  }

  constructor(private formBuilder: FormBuilder,
      private userService: UserService,
      private router: Router) {
    this.passwordForm = formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validator: RegisterComponent.passwordMatch
    });

    this.userForm = formBuilder.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.loginCtrl.value,
      this.passwordCtrl.value,
      this.birthYearCtrl.value)
        .subscribe(
          res => this.registrationFailed = false,
          error => this.registrationFailed = true,
          () => this.router.navigate(['/'])
    );
  }
}
