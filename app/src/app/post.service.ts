import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl!: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.apiUrl = `${window.location.origin}/wp-json/wp/v2/posts`;
    }
  }

  getPosts(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Fetching posts from:', this.apiUrl);
      return this.http.get<any[]>(this.apiUrl).pipe(
        catchError(this.handleError<any[]>('getPosts', []))
      );
    } else {
      return of([]);
    }
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}