import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '../environments/environment';  // Adjust if needed

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiUrl = 'http://localhost:3000/transactions';  // URL for local JSON server

  constructor(private http: HttpClient) {}

  // Method to get all transactions
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  // Method to add a new transaction
  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  // Method to update an existing transaction
  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${transaction.id}`, transaction);
  }

  // Method to delete a transaction
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
