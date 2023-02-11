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

  loadOrders() {
    this.pizzaService.getOrders().subscribe((data) => {
      this.pizza = data;
    });
  }
}
