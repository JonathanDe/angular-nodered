import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // endpoint = 'http://localhost:8000/api';
  endpoint = 'http://localhost:9000/api';

  constructor(public httpClient: HttpClient) {
  }

  sendData(data: any) {
    return this.httpClient.post(this.endpoint, data);
  }

  getData() {
    return this.httpClient.get(this.endpoint);
  }
}
