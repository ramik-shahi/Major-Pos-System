import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3001/api/';


  constructor(private http: HttpClient) {



  }

  test_Post(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}menu/upload`, data);
  }

  login(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}user/login`,data)
  }

  registration(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}user/registration`,data)

  }
  getUser(resId:any):Observable<any>{
    return this.http.get(`${this.apiUrl}user`)

  }

}
