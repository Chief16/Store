import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id: 1,
    title: "Sneaker",
    price: 1500,
    category: "Shoes",
    description: "Shoes with great comfort",
    image: "https://via.placeholder.com/150"
  }
  @Output() addToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addProductToCart(){
    this.addToCart.emit(this.product);
  }

}
