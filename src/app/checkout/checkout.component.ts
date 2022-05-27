import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkoutService/checkout.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  constructor( public co: CheckoutService) { }
  products = [];
  listCheckout() {
    this.co.checkoutList().subscribe((data) => {
      this.products = data;
    });
  }
  ngOnInit() {}

}
