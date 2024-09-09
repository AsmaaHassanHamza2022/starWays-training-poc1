import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomPickerComponent } from './shared/components/custom-picker/custom-picker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CustomPickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'starWays-training-poc1';
 
}
