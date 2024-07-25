import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private newOrderSubject = new Subject<any>();
  private newStatusSubject = new Subject<any>();
  private deleteOrder = new Subject<any>();

  constructor() {
    this.socket = io('http://localhost:3002');
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    
    this.socket.on('newOrder', (order) => {
      console.log('Received newOrder event:', order);
      this.newOrderSubject.next(order);
    });

    this.socket.on('newStatus', (status) => {
      console.log('Received newOrder event:', status);
      this.newStatusSubject.next(status);
    });

    this.socket.on('orderDeleted',(status)=>{
      console.log('delete order', status);
      this.deleteOrder.next(status)

    })



  }

 

  joinRoom(roomId: string) {
    this.socket.emit('joinRoom', roomId);
  }

  leaveRoom(roomId: string) {
    this.socket.emit('leaveRoom', roomId);
  }

  onNewOrder(): Observable<any> {
    return this.newOrderSubject.asObservable();
  }
  onNewStatus(): Observable<any> {
    return this.newStatusSubject.asObservable();
  }
  onDeleteOrder(): Observable<any>{
    return this.deleteOrder.asObservable();
  }
}

