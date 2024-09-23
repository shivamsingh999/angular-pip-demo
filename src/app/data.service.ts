import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Simulate an API call to fetch blog posts
  fetchBlogPosts(): Observable<string[]> {
    const blogs = ['Angular Basics', 'Advanced Angular', 'Why Use NgFor?', 'Deferable Views in Angular'];
    return of(blogs).pipe(delay(3000)); // Simulate a delay of 3 seconds
  }
}