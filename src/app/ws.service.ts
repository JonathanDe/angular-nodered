import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private socket_: io.Socket;

  constructor() { }

  setSocketHost(host: string) {
    this.socket_ = io.connect(host);
  }

  get socket() {
    return this.socket_;
  }
}
