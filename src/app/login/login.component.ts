import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public authenticationFailed: Boolean = false;

  constructor(private userService: UserService,
    private router: Router) { }

  public credentials = {
    login: '',
    password: ''
  };

  ngOnInit() {
  }

  authenticate() {
    this.userService.authenticate(this.credentials)
        .subscribe(
        res => {
          this.authenticationFailed = false;
          this.router.navigate(['/']);
        },
        error => this.authenticationFailed = true,
      );
  }

}
