import { Component, ElementRef, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { CartService } from '../cartService/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { ShopService } from '../shopService/shop.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  idproducts:number = 0;
  username: string = '';
  products = [];
  price=0;
  quantity:number = 0;
  idkategori:number = 0;


  cartProducts: Product[] = [];


  totalQuantity: number;
  totalPrice: number;
  productRemoved = new EventEmitter();


  calcTotal() {
    return this.products.reduce((acc, prod) => acc+= prod.num ,0)
  }
  removeProduct(product) {
    this.productRemoved.emit(product)
  }
  total() {
    return this.products.reduce((sum, prod) => sum += prod.num ,0)
  }
  constructor(private cs: CartService,private route:ActivatedRoute, public st: Storage, public ps:ShopService) {}
  // listCart() {
  //   this.cs.cartList(this.username).subscribe((data) => {
  //     this.products = data;
  //   });
  // }


  deleteProduct(id) {
    let index = this.cartProducts.findIndex(item => item.idproduct === id);
    this.cartProducts.splice(index, 1);
    this.sum();
  }
  sum(): void {
    this.totalQuantity = 0;
    this.price = 0;
    this.totalPrice = 0;
    if (this.cartProducts) {
      this.cartProducts.map(product => {
        this.totalQuantity += product.quantity;
        this.price += product.price;
        this.totalPrice += product.price * product.quantity;
      });
    }
  }
  async ngOnInit() {
    
    // await this.st.create();
    this.username = await this.st.get('username');
    this.idkategori = await this.st.get('idkategori');
    this.price = await this.st.get('price');
    this.idproducts = await this.st.get('idproduct');
    
    console.log(this.idproducts);
    // this.listCart();



  //   this.ps.event.subscribe(product => {
  //     alert("cart-list-ngOnInit");
  //     let index = -1;
  //     index = this.cartProducts.findIndex(
  //       p => p.idproduct === product.idproduct
  //     );
  //     if (index != -1) {
  //       this.cartProducts[index].quantity += 1;
  //     } else if (index === -1) {
  //       this.cartProducts.push(product);
  //     }
  //     this.sum();
  //   });
  }
}

