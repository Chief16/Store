import { StoreService } from './../../services/store.service';
import { CartService } from './../../services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';

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
export class HomeComponent implements OnInit, OnDestroy {

  cols = 3;
  category: string | undefined;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Product[] | undefined;
  sort = "desc";
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(private _cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
  }

  getProducts(){
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products)
      },
      error: (err) => {

      }
    })
  }

  onColumnsChange(colsNum: number): void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
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

  onItemsCountChange(count: number){
    this.count = count.toString();
    this.getProducts()
  }

  onSortChange(newSort: string){
    this.sort = newSort;
    this.getProducts();
  }
}
