import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from './entry.model';

import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private apiPath = environment.baseUrl + "/lancamentos";

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  getAll(): Observable<Entry[]> {
    return this.http
      .get(this.apiPath + '?user_id=lara_correa')
      .pipe(catchError(this.handleError), map(this.jsonDataToEntries));
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}` + "?user_id=lara_correa";

    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToEntry));
  }

  create(entry: Entry): Observable<Entry> {
    entry.user_id = "lara_correa"
    entry.id = Math.ceil(Math.random()*100).toString()


    return this.categoryService.getById(Number(entry.categoryId)).pipe(
      flatMap((category) => {
        entry.category = category;
        return this.http
          .post(this.apiPath, entry)
          .pipe(catchError(this.handleError), map(this.jsonDataToEntry));
      })
    );
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}`

    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    )

    /*return this.categoryService.getById(Number(entry.categoryId)).pipe(
      flatMap((category) => {
        entry.category = category;

        return this.http.put(url, entry).pipe(
          catchError(this.handleError),
          map(() => entry)
        );
      })
    );*/
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}` + "?user_id=lara_correa&id=" + `${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // PRIVATE METHODS

  private jsonDataToEntries(jsonData: any): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach((element: any) => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }
}
