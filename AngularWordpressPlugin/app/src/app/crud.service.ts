import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = `${window.location.origin}/wp-json/wp/v2/custom_table`;

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    console.log('CRUD Fetching items from API:', this.apiUrl);
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addItem(item: any): Observable<any> {
    console.log('CRUD Adding item to API:', item);
    return this.http.post(this.apiUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  updateItem(id: number, item: any): Observable<any> {
    console.log(`CRUD Updating item with ID ${id} in API:`, item);
    return this.http.put(`${this.apiUrl}/${id}`, item).pipe(
      catchError(this.handleError)
    );
  }

  deleteItem(id: number): Observable<any> {
    console.log(`CRUD Deleting item with ID ${id} from API`);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('CRUD An error occurred:', error.error);
    console.log('CRUD Full error object:', error);
    if (error.status === 0) {
      console.error('CRUD An error occurred:', error.error);
    } else {
      console.error(`CRUD Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('CRUD Something bad happened; please try again later.'));
  }
}
