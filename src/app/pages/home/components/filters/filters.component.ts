import { Subscription } from 'rxjs';
import { StoreService } from './../../../../services/store.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

  @Output() showCategory = new EventEmitter<string>();
  categories: string[] | undefined;
  categorySubscription: Subscription | undefined;

  constructor(private _storeService: StoreService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }


  getCategories(){
    this._storeService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {

      }
    })
  }

  onShowCategory(categoryName: string): void{
    this.showCategory.emit(categoryName);
  }

}
