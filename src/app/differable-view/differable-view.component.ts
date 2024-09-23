
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-differable-view',
    templateUrl: './differable-view.component.html',
    imports: [CommonModule],

  styleUrl: './differable-view.component.css',
  standalone: true
})

export class DifferableViewComponent
  {
    items = [
      { name: 'Angular' },
      { name: 'React' },
      { name: 'Vue' },
      { name: 'Svelte' }
    ];
}
