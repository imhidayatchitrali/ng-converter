import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyService } from '../../services/currency.service';
import { Currency, ConversionResult } from '../../models/currency.model';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  template: `
    <div class="container-fluid px-3">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <mat-card class="converter-card">
            <mat-card-header>
              <mat-card-title class="text-center w-100">
                Currency Converter
              </mat-card-title>
            </mat-card-header>
            
            <mat-card-content>
              <div class="row g-3">
                <!-- Amount Input -->
                <div class="col-12">
                  <mat-form-field class="w-100" appearance="outline">
                    <mat-label>Amount</mat-label>
                    <input matInput 
                           type="number" 
                           [(ngModel)]="amount" 
                           placeholder="Enter amount"
                           min="0"
                           step="0.01">
                  </mat-form-field>
                </div>

                <!-- From Currency -->
                <div class="col-12 col-sm-6">
                  <mat-form-field class="w-100" appearance="outline">
                    <mat-label>From</mat-label>
                    <mat-select [(ngModel)]="fromCurrency">
                      <mat-option *ngFor="let currency of currencies" [value]="currency.code">
                        {{currency.code}} - {{currency.name}}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <!-- To Currency -->
                <div class="col-12 col-sm-6">
                  <mat-form-field class="w-100" appearance="outline">
                    <mat-label>To</mat-label>
                    <mat-select [(ngModel)]="toCurrency">
                      <mat-option *ngFor="let currency of currencies" [value]="currency.code">
                        {{currency.code}} - {{currency.name}}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <!-- Convert Button -->
                <div class="col-12">
                  <button mat-raised-button 
                          color="primary" 
                          class="w-100"
                          (click)="convert()"
                          [disabled]="!canConvert() || isConverting">

                    {{isConverting ? 'Converting...' : 'Convert'}}
                  </button>
                </div>

                <!-- Result -->
                <div class="col-12" *ngIf="conversionResult">
                  <div class="result-card p-3 border rounded">
                    <div class="row align-items-center">
                      <div class="col-12 col-sm-6 text-center text-sm-start">
                        <h5 class="mb-1">{{conversionResult.amount}} {{conversionResult.from}}</h5>
                        <small class="text-muted">equals</small>
                      </div>
                      <div class="col-12 col-sm-6 text-center text-sm-end">
                        <h4 class="mb-1 text-primary">{{conversionResult.convertedAmount}} {{conversionResult.to}}</h4>
                        <small class="text-muted">Rate: {{conversionResult.rate}}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .converter-card {
      margin-top: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .result-card {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border: 1px solid #e0e6ed;
    }

    mat-card-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
    }

    mat-form-field {
      margin-bottom: 10px;
    }

    .text-primary {
      color: #007bff !important;
    }

    @media (max-width: 576px) {
      .converter-card {
        margin: 10px 0;
      }
      
      mat-card-title {
        font-size: 1.3rem;
      }
    }
  `]
})
export class CurrencyConverterComponent implements OnInit {
  currencies: Currency[] = [];
  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number = 1;
  conversionResult: ConversionResult | null = null;
  isConverting = false;
  isLoadingCurrencies = false;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.isLoadingCurrencies = true;
    this.currencyService.getCurrencies().subscribe({
      next: (response) => {
        if (response.success) {
          this.currencies = response.data;
          // Set default currencies
          this.fromCurrency = 'USD';
          this.toCurrency = 'EUR';
        }
        this.isLoadingCurrencies = false;
      },
      error: (error) => {
        console.error('Error loading currencies:', error);
        this.isLoadingCurrencies = false;
      }
    });
  }

  convert(): void {
    if (!this.canConvert()) return;

    this.isConverting = true;
    this.currencyService.convertCurrency(this.fromCurrency, this.toCurrency, this.amount).subscribe({
      next: (response) => {
        if (response.success) {
          this.conversionResult = response.data;
          this.currencyService.addToHistory(response.data);
        }
        this.isConverting = false;
      },
      error: (error) => {
        console.error('Error converting currency:', error);
        this.isConverting = false;
      }
    });
  }

  canConvert(): boolean {
    return !!(this.fromCurrency && this.toCurrency && this.amount > 0);
  }
}