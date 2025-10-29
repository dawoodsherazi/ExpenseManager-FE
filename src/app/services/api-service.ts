import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(
    private http: HttpClient
  ) { }

  getBooks() {
    return this.http.get<any[]>(`${environment.apiUrl}Books`);
  }

  createBook(bookData: any) {
    return this.http.post(`${environment.apiUrl}Books`, bookData);
  }

  updateBook(id: number, bookData: any) {
    return this.http.put(`${environment.apiUrl}Books/${id}`, bookData);
  }

  deleteBook(id: number) {
    return this.http.delete(`${environment.apiUrl}Books/${id}`);
  }

  // transactions

  getTransactions() {
    return this.http.get(`${environment.apiUrl}Transactions`);
  }

  getTransactionByBookId(id:number){
    return this.http.get(`${environment.apiUrl}Transactions/by-bookId/${id}`);
  }

  createTransaction(transactionData: any) {
    return this.http.post(`${environment.apiUrl}Transactions`, transactionData);
  }

  updateTransaction(id: number, transactionData: any) {
    return this.http.put(`${environment.apiUrl}Transactions/${id}`, transactionData);
  }

  deleteTransaction(id: number) {
    return this.http.delete(`${environment.apiUrl}Transactions/${id}`);
  }

  // categories
  getCategories() {
    return this.http.get(`${environment.apiUrl}Categories`);
  }

  addCategory(categoryData: any) {
    return this.http.post(`${environment.apiUrl}Categories`, categoryData);
  }

  editCategory(id: number, categoryData: any) {
    return this.http.put(`${environment.apiUrl}Categories/${id}`, categoryData);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.apiUrl}Categories/${id}`);
  }
}
