import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //atributo
  endpoint = environment.apiUrl + "/auth";

  //injeção de dependencia (inicialização)
  constructor(private httpClient: HttpClient) { }

  post(usuario: any) {

    const formData = new FormData();

    formData.append('email', usuario.email);
    formData.append('senha', usuario.senha);

    return this.httpClient.post(this.endpoint, formData)
  }
}
