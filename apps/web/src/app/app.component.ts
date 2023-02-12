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

  changeColor() {
    //console.log('сработало'); TO DO
  }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.pizzaService.getOrders().subscribe((data) => {
      this.pizza = data;
    });
  }

  changeStatus(orderId: string, status: string) {
    //this.changeColor(orderId); TO DO

    if (status === 'confirm') {
      this.pizzaService.confirmOrder(orderId).subscribe(() => {
        this.loadOrders();
      });
    }

    if (status === 'cooking') {
      this.pizzaService.cookingOrder(orderId).subscribe(() => {
        this.loadOrders();
      });
    }

    if (status === 'delivering') {
      this.pizzaService.deliverOrder(orderId).subscribe(() => {
        this.loadOrders();
      });
    }

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
