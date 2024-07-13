import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/menu/upload';

  constructor(private http: HttpClient) {



  }

  test_Post(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

}
