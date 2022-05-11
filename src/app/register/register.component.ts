import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  username = '';
  password = '';
  address = '';
  number = '';
  constructor(public us: UserService) { }

  ngOnInit() {}

  registerUser(){
    this.us.regisDB(this.username, this.password, this.number, this.address).subscribe((data) => {
      alert(data['message'])
    });
    // console.log(this.username);
    // console.log(this.password);
    // console.log(this.address);
    // console.log(this.number);
    this.username = '';
  this.password = '';
  this.address = '';
  this.number = '';
  }

}
