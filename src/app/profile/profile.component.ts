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
    })
  }
  async ngOnInit() {
    this.username = await this.st.get('username');
    // s.phone = await this.st.get('phone');
    console.log(this.username);
    console.log(this.address);
    console.log(this.phone);
  }
}