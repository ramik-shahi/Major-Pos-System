import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private newOrderSubject = new Subject<any>();

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    
    this.socket.on('newOrder', (order) => {
      console.log('Received newOrder event:', order);
      this.newOrderSubject.next(order);
    });
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
}

