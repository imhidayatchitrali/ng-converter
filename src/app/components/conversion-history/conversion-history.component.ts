import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CurrencyService } from '../../services/currency.service';
import { ConversionHistory } from '../../models/currency.model';

@Component({
  selector: 'app-conversion-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  template: `
    <div class="container-fluid px-3">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <mat-card class="history-card">
            <mat-card-header>
              <mat-card-title class="d-flex justify-content-between align-items-center w-100">
                <span>
                  Conversion History
                </span>

              </mat-card-title>
            </mat-card-header>
            
            <mat-card-content>
              <div *ngIf="history.length === 0" class="text-center py-4">
                <p class="text-muted">No conversions yet</p>
              </div>

              <mat-list *ngIf="history.length > 0" class="history-list">
                <mat-list-item *ngFor="let item of history; let i = index" class="history-item">
                  <div class="w-100">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="conversion-info">
                        <strong>{{item.amount}} {{item.from}}</strong>
                        <mat-icon class="mx-2 small-icon">arrow_forward</mat-icon>
                        <strong class="text-primary">{{item.convertedAmount}} {{item.to}}</strong>
                      </div>
                      <div class="rate-info text-end">
                        <small class="text-muted d-block">Rate: {{item.rate}}</small>
                      </div>
                    </div>
                    <div class="timestamp">
                      <small class="text-muted">{{formatDate(item.timestamp)}}</small>
                    </div>
                  </div>
                  <mat-divider *ngIf="i < history.length - 1"></mat-divider>
                </mat-list-item>
              </mat-list>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .history-card {
      margin-top: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .history-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .history-item {
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .history-item:last-child {
      border-bottom: none;
    }

    .conversion-info {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .small-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .large-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    .timestamp {
      margin-top: 4px;
    }

    .text-primary {
      color: #007bff !important;
    }

    @media (max-width: 576px) {
      .history-card {
        margin: 10px 0;
      }
      
      .conversion-info {
        font-size: 0.9rem;
      }
      
      .rate-info {
        font-size: 0.8rem;
      }
    }
  `]
})

export class ConversionHistoryComponent implements OnInit {
  history: ConversionHistory[] = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.history$.subscribe(history => {
      this.history = history;
    });
  }

  clearHistory(): void {
    this.currencyService.clearHistory();
  }

  // formatDate(timestamp: string): string {
  //   const date = new Date(timestamp);
  //   return date.toLocaleString();
  // }
  formatDate(timestamp: string): string {
    console.log('Timestamp:', timestamp);
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
}