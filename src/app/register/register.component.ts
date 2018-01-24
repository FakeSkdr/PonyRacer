import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;

  private loginCtrl = new FormControl('', Validators.required);
  private passwordCtrl = new FormControl('', Validators.required);
  private birthYearCtrl = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      login: this.loginCtrl,
      password: this.passwordCtrl,
      birthYear: this.birthYearCtrl
    });
  }

  ngOnInit() {
  }

  register() {

  }
}
