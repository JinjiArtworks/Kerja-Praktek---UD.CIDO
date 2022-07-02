import { Component, OnInit } from '@angular/core';
import { OrderlistService } from '../orderlistService/orderlist.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent implements OnInit {

  orders =[];
  username:string="";
  constructor(public ol: OrderlistService, public st:Storage) { }

  listOfOrder() {
    this.ol.orderList(this.username).subscribe((data) => {
      this.orders = data;
    });
  }
  async ngOnInit() {
    this.st.create();
    this.username = await this.st.get('username');
    this.listOfOrder();
    // console.log(this.orders);
  }

}
