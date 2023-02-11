import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { SavedOrder } from 'types/data';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<SavedOrder[]>('http://127.0.0.1:8080/api/orders');
  }
}
