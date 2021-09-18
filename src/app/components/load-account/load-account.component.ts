/*
    TODO:
      load a user or contractor's account
      present form data in non-fixed fields and allow for update if
        user.id == this.user.id || this.user.type == admin
      Allow for loading contractor accounts in future iterations
        or this one if we have the time
*/

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-account',
  templateUrl: './load-account.component.html',
  styleUrls: ['./load-account.component.css']
})
export class LoadAccountComponent implements OnInit {
  errorMsg?: string;
  isLoggedIn: boolean = localStorage.getItem("session") ? true : false;
  user = this.isLoggedIn ? JSON.parse(localStorage.session) : '';
  

  constructor(private userService: UserService, private router: Router) { 
  
  }

  ngOnInit() { }

  ngOnChanges() {}

  async login(username : string, password : string) {
    this.userService.login(username, password)
      .subscribe( data => {
        this.userService.data = data; 
        localStorage.setItem("session", JSON.stringify(data));
        
        this.router.navigateByUrl('/')},

        err => {console.log(err, "Invalid login"); 
        this.errorMsg = "Invalid login"});

  }

  //clears session and sets isLoggedIn to false; -AI
  logout() {
    localStorage.removeItem("session")
    this.isLoggedIn = false;
  }

}
