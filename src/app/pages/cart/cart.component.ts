import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'Sneaker',
        price: 1500,
        quantity: 1,
        id: 1,
      }
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private _cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this._cartService.cart.subscribe((cart: Cart) => {
      this.cart = cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: CartItem[]): number{
    return this._cartService.getTotal(items);
  }

  onClearCart(): void{
    this._cartService.clearCart();
  }

  removeCartItem(item: CartItem){
    this._cartService.removeCartItem(item);
  }

  onAddQuantity(item: CartItem){
    this._cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem){
    this._cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe({
      next: async (data: any) => {
        let stripe = await loadStripe("pk_test_51LyTBDSILt1YPv2QR8p4tTQbCJCqVXQmWJgdJlmsoulixUzrN7QGbXlm3s6Ajoy4wej5A4Ifg2I8wyOsi2jbAGpu00U6LPEVYC");
        stripe?.redirectToCheckout({
          sessionId: data.id
        })
      },
      error: (err) => {

      }
    })
  }
}
