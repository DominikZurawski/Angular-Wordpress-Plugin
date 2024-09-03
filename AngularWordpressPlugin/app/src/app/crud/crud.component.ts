import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { DataService } from '../crud.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'crud-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  items: any[] = [];
  newItem: any = { name: '', value: '' };

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef, // Wstrzyknięcie ChangeDetectorRef
    private ngZone: NgZone // Wstrzyknięcie NgZone
  ) {
    console.log('CrudComponent constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.getItems();
  }

  getItems(): void {
    this.dataService.getItems().subscribe({
      next: (data) => {
        console.log('Fetched items:', data);
        this.ngZone.run(() => {
          this.items = data;
        }); // Uruchamianie kodu w strefie Angulara
      },
      error: (error) => {
        console.error('Error fetching items:', error);
      }
    });
  }

  addItem(): void {
    console.log('Adding item:', this.newItem);
    this.dataService.addItem(this.newItem).subscribe({
      next: (data) => {
        console.log('Item added:', data);
        this.items.push(data);
        this.newItem = { name: '', value: '' };
        console.log('Items after adding:', this.items); // Sprawdzenie po dodaniu elementu
        this.cdr.markForCheck(); // Oznaczenie komponentu do sprawdzenia
        try {
          this.cdr.detectChanges(); // Ręczne wykrywanie zmian
          console.log('detectChanges called'); // Sprawdzenie wywołania detectChanges
        } catch (error) {
          console.error('Error in detectChanges:', error);
        }
      },
      error: (error) => {
        console.error('Error adding item:', error);
      }
    });
  }

  updateItem(item: any): void {
    console.log('Updating item:', item);
    this.dataService.updateItem(item.id, item).subscribe({
      next: () => {
        console.log('Item updated:', item);
        this.getItems();
        try {
          this.cdr.detectChanges(); // Ręczne wykrywanie zmian
          console.log('detectChanges called'); // Sprawdzenie wywołania detectChanges
        } catch (error) {
          console.error('Error in detectChanges:', error);
        }
      },
      error: (error) => {
        console.error('Error updating item:', error);
      }
    });
  }

  deleteItem(id: number): void {
    console.log('Deleting item with ID:', id);
    this.dataService.deleteItem(id).subscribe({
      next: () => {
        console.log('Item deleted:', id);
        this.items = this.items.filter(item => item.id !== id);
        console.log('Items after deletion:', this.items); // Sprawdzenie po usunięciu elementu
        try {
          this.cdr.detectChanges(); // Ręczne wykrywanie zmian
          console.log('detectChanges called'); // Sprawdzenie wywołania detectChanges
        } catch (error) {
          console.error('Error in detectChanges:', error);
        }
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      }
    });
  }
}
