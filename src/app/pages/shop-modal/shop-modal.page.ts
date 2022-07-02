import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ShopService } from 'src/app/shopService/shop.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.page.html',
  styleUrls: ['./shop-modal.page.scss'],
})
export class ShopModalPage implements OnInit {

  constructor(public sh: ShopService,private modalCtrl: ModalController,private alertCtrl: AlertController,  public st:Storage) { }
  products = [];
  idproduct:number = 0;
  username:string="";
  price:number = 0;
  quantity:number = 0;
  subtotal:number = 0;
  isiCart = [];
  count:number=0;

  async ngOnInit() {
    await this.st.create();
    this.products = this.sh.getCart();
    this.username =  await this.st.get('username');  
    this.subtotal = this.getTotal();
  }
   getProduct() {
    // console.log(this.products.length);
   
    // let added = false;
    // for (let p of this.products) {
    //   if (p.idproducts === product.idproducts) {
    //     // p.amount += 1;
    //     added = true;
    //     break;
    //   }
    // }
    // if (!added) {
      for(let i = 0; i < this.products.length; i++) {
        console.log(this.products[i]['amount']);
        this.sh.checkout(
          this.products[i]['idproducts'],
          this.username,
          this.products[i]['amount'],
          this.products[i]['price'], 
          this.subtotal
        )
        .subscribe((data)=>{
          if (data['result'] == 'OK') {
            alert(data['message']);
          } else {
            alert(data['message']);
          }
        });
      }
      // this.products.push(product);
    // }
  }
  decreaseCartItem(product) {
    this.sh.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.sh.addProduct(product);
  }
 
  removeCartItem(product) {
    this.sh.removeProduct(product);
  }
 
  getTotal() {
    return this.products.reduce((i, j) => i + j.price * j.amount, 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
  async checkout() {
    // Perfom PayPal or Stripe checkout process
 
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: [{
        text: 'OK',
        handler: () => {
          window.location.reload();
        }
      }]
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
