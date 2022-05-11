import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private storage: Storage, public us: UserService) {}
  userid = '';
  login_user = '';
  login_password = ''; // sesuaikan dengan ngModel yg ada di app.component.html
  login_error = '';
  users = [];

  // using database
  loginUser() {
    this.us.loginDB(this.login_user, this.login_password).subscribe((data) => {
      this.users = data;
      this.userid = this.users[0]['id'];
      console.log(this.users[0]['userid']);
      this.storage.set('id', this.userid);
    });
  }
  async ngOnInit() {
    await this.storage.create();
    this.userid = await this.storage.get('id')
  }

}
