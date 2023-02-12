import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { SavedOrder } from 'types/data';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private baseURL = 'http://127.0.0.1:8080/api';

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<SavedOrder[]>(`${this.baseURL}/orders`);
  }

  confirmOrder(orderId: string) {
    return this.http.post<void>(
      `${this.baseURL}/orders/${orderId}/confirm`,
      null
    );
  }

  cookingOrder(orderId: string) {
    return this.http.post<void>(
      `${this.baseURL}/orders/${orderId}/cooking`,
      null
    );
  }

  deliverOrder(orderId: string) {
    return this.http.post<void>(
      `${this.baseURL}/orders/${orderId}/delivering`,
      null
    );
  }

  doneOrder(orderId: string) {
    return this.http.post<void>(`${this.baseURL}/orders/${orderId}/done`, null);
  }

  cancelOrder(orderId: string) {
    return this.http.post<void>(
      `${this.baseURL}/orders/${orderId}/cancel`,
      null
    );
  }
}
