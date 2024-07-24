import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  selectedTable!: string;

  onTableSelected(tableId: string) {
    this.selectedTable = tableId;
  }

}
