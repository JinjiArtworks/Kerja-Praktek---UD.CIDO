import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profileService/profile.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username:string = "";
  address:string = "";
  phone:string = "";
  disabledz:boolean = true;
  
  constructor(public ps: ProfileService,  public st:Storage) { }
  users = [];

  listUser() {
    this.ps.userList(this.username).subscribe((data) => {
      this.users = data;
      this.address = data["data"][0].address;
      console.log(this.users);
    });
  }
  async ngOnInit() {
    this.username = await this.st.get('username');
    this.address = await this.st.get('address');
    // this.listUser();
  }

}
