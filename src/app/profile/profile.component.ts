import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profileService/profile.service';
import { Storage } from '@ionic/storage-angular';
import { ShopService } from '../shopService/shop.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username:string = "";
  address:string = "";
  phone:string = "";
  // disabledz:boolean = true;
  users = [];
  constructor(public ps: ProfileService,  public st:Storage) { }
  

  async listUser() {
    this.username = await this.st.get('username');   

    await this.ps.userList(this.username).subscribe((data) => {
    this.users = data;
    this.address = data['address'];
    this.phone = data['phone'];
  });
  }

  async ngOnInit() {
    this.username = await this.st.get('username');   
    await this.listUser();
  }
}