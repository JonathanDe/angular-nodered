import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './api.service';
import { WsService } from './ws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  info = '';
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private ws: WsService
    ) {
      this.ws.setSocketHost('http://localhost:8000/');

      this.form = new FormGroup({
        message: new FormControl(''),
      });
  }

  ngOnInit() {
    this.ws.socket.on('d8b3ca7a.aa4948', (data) => {
      console.log('Hola data', data.msg.payload);
      this.info = data.msg.payload;
    });

    this.apiService.getData().subscribe((data) => {
      console.log('Recibido ', data);
    });
  }

  send() {
    const inputMessage = this.form.controls['message'].value;

    const newData = {
      message: inputMessage
    };

    if (inputMessage !== '') {
      this.apiService.sendData(newData).subscribe((data: any) => {
        this.info = data.message;
        console.log('Mensaje recibido: ', data);
      });
    }
  }
}
