import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
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

  addemployee(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}user/add-employee`,data)
  }

  getUser(restaurant_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}user/${restaurant_id}`)

  }
  getUserById(restaurant_id:any,user_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}user/${restaurant_id}/${user_id}`)

  }


  getMenu(restaurant_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}menu/${restaurant_id}`)

  }


  getMenuOne(restaurant_id:any,menu_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}menu/${restaurant_id}/${menu_id}`)

  }

  getMenupic(restaurantId: string, menuId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}menu/${restaurantId}/${menuId}`, {});
  }  

  postOrder(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}order/upload`,data)

  }
  getOrder(restaurant_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}order/${restaurant_id}`)

  }

  getOrderoftables(restaurant_id:any,table_name:any):Observable<any>{
   
    return this.http.get(`${this.apiUrl}order/${restaurant_id}/${table_name}`)

  }
  UpdateOrder(data:any):Observable<any>{
    console.log('Data being sent to UpdateOrder:', data);
    return this.http.post(`${this.apiUrl}order/statusupdate`,data)

  }
  deleteOrder(restaurant_id:any,id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}order/delete/${restaurant_id}/${id}`)
  }

  getCategory(restaurant_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}category/${restaurant_id}`)
  }

  getMenuByCat(restaurant_id:any,cat_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}menu/menubycat/${restaurant_id}/${cat_id}`)
  }

  getTable(restaurant_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}table/${restaurant_id}`)
  }
  addtable(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}table/upload`,data)
  }

  deletetable(restaurant_id:any, table_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}table/delete/${restaurant_id}/${table_id}`)
  }

  postCat(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}category/upload`,data)

  }

  addMenu(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}menu/upload`,data)
  }

  updateUser(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}user/update`,data)
  }

  deluser(restaurant_id:any, user_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}user/delete/${restaurant_id}/${user_id}`)
  }


  updatemenu(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}menu/update`,data);
  }

  getInven(restaurant_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}inventory/${restaurant_id}`)
  }
  UpdateInv(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}inventory/update`,data)
  }

  createRes(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}restaurant/upload`,data)
  }

  billGeneration(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}bill/upload`,data)
  }

  Client(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}payment`,data)
  }
  
  getBill(restaurant_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}bill/get/${restaurant_id}`)
  }
  
  
  getpdf(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}bill/pdf`, data);
  }

}
