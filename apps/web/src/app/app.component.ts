import { Component } from '@angular/core';
import { PizzaService } from './pizza.service';
import type { SavedOrder } from 'types/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PizzaService],
})
export class AppComponent {
  constructor(private pizzaService: PizzaService) {}

  pizza: SavedOrder[] = [];

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.pizzaService.getOrders().subscribe((data) => {
      this.pizza = data;
    });
  }

  changeStatus(orderId: string, status: string) {
    if (status === 'done') {
      this.pizzaService.doneOrder(orderId).subscribe(() => {
        this.loadOrders();
      });
    }

    if (status === 'cancel') {
      this.pizzaService.cancelOrder(orderId).subscribe(() => {
        this.loadOrders();
      });
    }
  }
}
