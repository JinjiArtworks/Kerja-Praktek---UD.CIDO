import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepagesComponent } from './homepages/homepages.component';
import { ShopComponent } from './shop/shop.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryComponent } from './category/category.component';
import { ShopModalPageModule } from './pages/shop-modal/shop-modal.module';
import { CatModalPageModule } from './pages2/cat-modal/cat-modal.module';
import { OrderlistComponent } from './orderlist/orderlist.component';

// service dimasukan ke provider , gunanya service ?

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepage', component: HomepagesComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:idcategories', component: CategoryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'orderlist', component: OrderlistComponent },

]; // konstanta untuk menyimpan semua path yang ada didalam web ini
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepagesComponent,
    ShopComponent,
    ProfileComponent,
    CategoryComponent,
    RegisterComponent,
    OrderlistComponent
  ],
  entryComponents: [],
  imports: [
    IonicStorageModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ShopModalPageModule,
    CatModalPageModule,
    RouterModule.forRoot(appRoutes),
  ], //librari routes ditambah disini

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
