import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]',
  standalone: true
})
export class CurrencyFormatDirective {
  @Input() currencySymbol: string = '$';
  @Input() decimalPlaces: number = 2;

  constructor(private el: ElementRef) {}

  @HostListener('blur', ['$event'])
  onBlur(event: any): void {
    this.formatCurrency(event.target.value);
  }

  @HostListener('focus', ['$event'])
  onFocus(event: any): void {
    // Remove formatting on focus for easier editing
    const value = event.target.value.replace(/[^\d.-]/g, '');
    event.target.value = value;
  }

  private formatCurrency(value: string): void {
    if (!value) return;
    
    const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
    if (isNaN(numericValue)) return;
    
    const formatted = this.currencySymbol + numericValue.toFixed(this.decimalPlaces);
    this.el.nativeElement.value = formatted;
  }
}