import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http'
import { Product } from './product.model'
import { EMPTY, Observable, catchError, map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3001/products'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessege(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.baseUrl, product)
      .pipe(catchError((e) => this.errorHandler(e)))
  }

  read(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseUrl)
      .pipe(catchError((e) => this.errorHandler(e)))
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http
      .get<Product>(url)
      .pipe(catchError((e) => this.errorHandler(e)))
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http
      .put<Product>(url, product)
      .pipe(catchError((e) => this.errorHandler(e)))
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http
      .delete<Product>(url)
      .pipe(catchError((e) => this.errorHandler(e)))
  }

  errorHandler(e: any): Observable<any> {
    this.showMessege('Ocorreu um erro!', true)
    return EMPTY
  }
}
