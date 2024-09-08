import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-control-validator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-validator.component.html',
  styleUrl: './control-validator.component.scss'
})
export class ControlValidatorComponent {
  @Input() control: AbstractControl | null = null;  // Pass the form control

  get errorMessages(): string[] {
    const errors: string[] = [];
    if (this.control && this.control.errors) {
      for (const key in this.control.errors) {
        if (this.control.errors.hasOwnProperty(key)) {
          errors.push(this.getErrorMessage(key, this.control.errors[key]));
        }
      }
    }
    return errors;
  }

  private getErrorMessage(errorKey: string, errorValue: any): string {
    const defaultMessages: { [key: string]: string } = {
      required: 'This field is required.',
      minlength: `Minimum length is ${errorValue.requiredLength}.`,
      maxlength: `Maximum length is ${errorValue.requiredLength}.`,
      
    };
    return defaultMessages[errorKey] || 'Invalid field';
  }
}
