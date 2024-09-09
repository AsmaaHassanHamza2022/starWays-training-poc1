import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ICategory } from '../../utilities/models/category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
  selectedCategory = input<string>('');
  categoriesList = input.required<ICategory[]>();
  searchOnProducts = output<Event>();
  filterByCategory = output<Event>();
  clearFilter = output<void>();

  ngAfterViewChecked() {
    console.log('ProductFiltersComponent View Checked');
  }

  onSearch(event: Event) {
    this.searchOnProducts.emit(event);
  }

  onFilterByCategory(event: Event) {
    this.filterByCategory.emit(event);
  }

  onClearFilter() {
    this.clearFilter.emit();
  }
}
