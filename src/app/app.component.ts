import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  cart: Cart = { items : [] }

  constructor(private _CartService: CartService){}

  ngOnInit(): void {
    this._CartService.cart.subscribe((_cart)=> {
      this.cart = _cart;
    })
  }
}
