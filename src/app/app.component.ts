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
  socketUrl = 'https://localhost:8000/api/socket';

  constructor(
    private apiService: ApiService,
    private wsService: WsService) {
      //this.wsService.setSocketHost(this.socketUrl);
    }

  form = new FormGroup({
    message: new FormControl(''),
  });

  ngOnInit() {
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
