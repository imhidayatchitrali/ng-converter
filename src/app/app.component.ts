import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ConversionHistoryComponent } from './components/conversion-history/conversion-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    CurrencyConverterComponent,
    ConversionHistoryComponent
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">
       <span>Currency Converter</span>
    </mat-toolbar>

    <div class="main-content">
      <mat-tab-group mat-align-tabs="center" class="custom-tabs">
        <mat-tab label="Converter">
          <app-currency-converter></app-currency-converter>
        </mat-tab>
        <mat-tab label="History">
          <app-conversion-history></app-conversion-history>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .main-content {
      min-height: calc(100vh - 64px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px 0;
    }

    .custom-tabs {
      background: transparent;
    }

    .custom-tabs ::ng-deep .mat-tab-header {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      margin: 0 20px 20px 20px;
      backdrop-filter: blur(10px);
    }

    .custom-tabs ::ng-deep .mat-tab-label {
      color: white;
      font-weight: 500;
    }

    .custom-tabs ::ng-deep .mat-tab-label-active {
      color: #fff;
    }

    .custom-tabs ::ng-deep .mat-ink-bar {
      background-color: #fff;
    }

    @media (max-width: 576px) {
      .main-content {
        padding: 10px 0;
      }
      
      .custom-tabs ::ng-deep .mat-tab-header {
        margin: 0 10px 10px 10px;
      }
    }
  `]
})
export class AppComponent {
  title = 'Currency Converter';
}