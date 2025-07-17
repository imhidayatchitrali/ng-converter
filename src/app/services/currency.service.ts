import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Currency, ConversionResult, ConversionHistory } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  // private apiUrl = 'http://localhost:3001/api/currency';
  private apiUrl = 'https://ng-converter-be-production-9a45.up.railway.app/api';
  // private apiUrl = 'http://localhost:3001/api';
  private historySubject = new BehaviorSubject<ConversionHistory[]>([]);
  public history$ = this.historySubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadHistory();
  }

  getCurrencies(): Observable<{ success: boolean; data: Currency[] }> {
    return this.http.get<{ success: boolean; data: Currency[] }>(`${this.apiUrl}/currencies`);
  }

  convertCurrency(from: string, to: string, amount: number): Observable<{ success: boolean; data: ConversionResult }> {
    return this.http.post<{ success: boolean; data: ConversionResult }>(`${this.apiUrl}/convert`, {
      from,
      to,
      amount
    });
  }

  addToHistory(conversion: ConversionResult): void {
    const history = this.getStoredHistory();
    const newEntry: ConversionHistory = {
      id: Date.now().toString(),
      ...conversion,
      timestamp: new Date().toISOString() // Add ISO format timestamp
    };

    history.unshift(newEntry);

    // Keep only last 50 conversions
    if (history.length > 50) {
      history.splice(50);
    }

    localStorage.setItem('currencyHistory', JSON.stringify(history));
    this.historySubject.next(history);
  }

  private loadHistory(): void {
    const history = this.getStoredHistory();
    this.historySubject.next(history);
  }

  private getStoredHistory(): ConversionHistory[] {
    const stored = localStorage.getItem('currencyHistory');
    return stored ? JSON.parse(stored) : [];
  }

  clearHistory(): void {
    localStorage.removeItem('currencyHistory');
    this.historySubject.next([]);
  }
}