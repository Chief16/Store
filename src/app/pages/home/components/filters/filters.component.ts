import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() showCategory = new EventEmitter<string>();
  categories = ["shoes", "clothes"];

  constructor() { }

  ngOnInit(): void {
  }

  onShowCategory(categoryName: string): void{
    this.showCategory.emit(categoryName);
  }

}
