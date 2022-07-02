import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/categoryService/category.service';
import { ShopService } from 'src/app/shopService/shop.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-cat-modal',
  templateUrl: './cat-modal.page.html',
  styleUrls: ['./cat-modal.page.scss'],
})
export class CatModalPage implements OnInit {

  products = [];
  idproduct:number = 0;
  username:string="";
  price:number = 0;
  quantity:number = 0;
  subtotal:number = 0;
  count:number=0;

  constructor(public cs: CategoryService,private modalCtrl: ModalController,private alertCtrl: AlertController,public st:Storage,private navCtrl: NavController) { }
  
  // listCategory() {
  //   this.cs.categoryList(this.idcategories).subscribe((data) => {
  //     this.products = data;
  //     console.log(data);
  //   });
  // }

  async ngOnInit() {
    await this.st.create();
    this.products = this.cs.getCart();
    this.username =  await this.st.get('username');  
    this.subtotal = this.getTotal();
  }
  getProduct() {
    for(let i = 0; i < this.products.length; i++) {
      console.log(this.products[i]['amount']);
      this.cs.checkout(
        this.products[i]['idproducts'],
        this.username,
        this.products[i]['amount'],
        this.products[i]['price'], 
        this.subtotal
      )
      .subscribe(async (data)=>{
        if (data['result'] == 'OK') {
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
        } else {
          alert(data['message']);
        }
      });
    }
    // this.products.push(product);
  // }
}
decreaseCartItem(product) {
  this.cs.decreaseProduct(product);
}

increaseCartItem(product) {
  this.cs.addProduct(product);
}

removeCartItem(product) {
  this.cs.removeProduct(product);
}

getTotal() {
  return this.products.reduce((i, j) => i + j.price * j.amount, 0);
}

close() {
  this.modalCtrl.dismiss();
}
}
