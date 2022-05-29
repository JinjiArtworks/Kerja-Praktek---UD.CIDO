import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from '../user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private storage: Storage, public us: UserService, public navCtrl: NavController) { }
  userid = '';
  login_user: string = '';
  login_password: string = '';
  login_error = '';
  address: string = '';
  phone: string = '';
  users = [];

  // using database
  loginUser() {
    this.us.loginDB(this.login_user, this.login_password).subscribe((data) => {
      if (data.result == "OK") {
        this.userid = this.login_user;
        this.storage.set('username', this.login_user);
      } else {
        this.login_error = "username or password is Wrong!!";
      }
    });
    this.navCtrl.navigateRoot('/homepage');
  }
  async ngOnInit() {
    await this.storage.create();
    this.userid = await this.storage.get('username');

  }

}
