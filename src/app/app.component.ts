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
  infoHttp = '';
  infoSocket = '';
  infoArr = [];
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private ws: WsService
    ) {
      this.ws.setSocketHost('http://localhost:9000');

      this.form = new FormGroup({
        message: new FormControl(''),
      });
  }

  ngOnInit() {
    this.ws.socket.on('1dd4992e.2a47e7', (data) => {
      console.log('Hola data', data.msg.payload);
      this.infoSocket = data.msg.payload;
    });

    this.apiService.getData().subscribe((data: any) => {
      this.infoHttp = data.data + ' [GET]';
      console.log('Recibido [GET]', data);
    });
  }

  send() {
    const inputMessage = this.form.controls['message'].value;

    const newData = {
      message: inputMessage
    };

    if (inputMessage !== '') {
      this.apiService.sendData(newData).subscribe((data: any) => {
        this.infoArr.push(data);
        this.form.controls['message'].reset();
        console.log('Mensaje recibido: ', data);
      });
    }
  }
}
