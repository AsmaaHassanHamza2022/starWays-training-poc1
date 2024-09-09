import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-picker',
  standalone: true,
  imports: [],
  templateUrl: './custom-picker.component.html',
  styleUrl: './custom-picker.component.scss'
})
export class CustomPickerComponent {
  @ViewChild('Picker') picker!:ElementRef;

  onSelectNewColor(event:Event){
    const input = event.target as HTMLInputElement;
    const color = input.value;
    document.documentElement.style.setProperty('--bs-primary', color);
  }

  onSelectNewPrimaryColor(){
    (this.picker.nativeElement as HTMLInputElement)?.click();
  }
}
