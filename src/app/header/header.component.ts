import { Component } from '@angular/core';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private data: DataStorageService){}

  onSave(){
    this.data.kitchenWarehouse();
  }

  onFetch(){
    this.data.deliverToDiner().subscribe();
  }
}
