import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
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
  isRegister = false;
  constructor(public us: UserService, public navCtrl: NavController) { }

  ngOnInit() {}

  registerUser(){
    this.us.regisDB(this.username, this.password, this.number, this.address).subscribe((data) => {
      if  (data.result == "OK"){
        alert("Welcome... Enjoy your Shopping In CIDO :) \nPlease Re-Login");
        this.navCtrl.navigateRoot('/login');
        this.isRegister = false;
      } else {
        alert(data['message']);
      }
    });
  }

}
