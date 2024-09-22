import { Component, WritableSignal, signal, computed } from '@angular/core';

@Component({
  selector: 'app-temperature-converter',
  templateUrl: './temperature-converter.component.html',
  styleUrls: ['./temperature-converter.component.css'],
  standalone: true
})
export class TemperatureConverterComponent {
  // Signals to store temperature values
  celsius: WritableSignal<number | null> = signal(null);
  fahrenheit: WritableSignal<number | null> = signal(null);

  // Computed signals to calculate the other temperature
  fahrenheitFromCelsius = computed(() => {
    const celsiusValue = this.celsius();
    return celsiusValue !== null ? (celsiusValue * 9 / 5) + 32 : null;
  });

  celsiusFromFahrenheit = computed(() => {
    const fahrenheitValue = this.fahrenheit();
    return fahrenheitValue !== null ? (fahrenheitValue - 32) * 5 / 9 : null;
  });

  // Update methods
  updateCelsius(event: Event) {
    const target = event.target as HTMLInputElement;
    const temp = parseFloat(target.value);
    this.celsius.set(!isNaN(temp) ? temp : null);
    // Update Fahrenheit based on the computed signal
    this.fahrenheit.set(this.fahrenheitFromCelsius());
  }

  updateFahrenheit(event: Event) {
    const target = event.target as HTMLInputElement;
    const temp = parseFloat(target.value);
    this.fahrenheit.set(!isNaN(temp) ? temp : null);
    // Update Celsius based on the computed signal
    this.celsius.set(this.celsiusFromFahrenheit());
  }
}
