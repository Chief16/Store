import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

const ROWS_HEIGHT: { [id: number]: number } = {
  1 : 400,
  3 : 335,
  4 : 350
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cols = 3;
  category: string | undefined;
  rowHeight: number = ROWS_HEIGHT[this.cols];

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
  }

  onColumnsChange(colsNum: number): void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onAddToCart(product: Product): void{
    this._cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

}
