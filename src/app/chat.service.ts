/* import * as io from 'socket.io-client';

export class ChatService {
  private socketURL = 'ws://localhost:8000/api/socket';
  private socket;

  constructor() {
    this.socket = io(this.socketURL);

    this.socket.on('connect', () => {
      console.log('ddddddddd');
    });
  }

  sendMessage(message: any) {
    this.socket.emit('message', message);
    console.log(this.socket);
  }

  get socketc() {
    return this.socket;
  }
}
 */
