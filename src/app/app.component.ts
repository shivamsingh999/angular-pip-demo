import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemperatureConverterComponent } from './temperature-converter/temperature-converter.component';
import { FinanceTrackerComponent } from './finance-tracker/finance-tracker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemperatureConverterComponent, FinanceTrackerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-practice';
}
