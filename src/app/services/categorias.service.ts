import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  //atributo
  endpoint = environment.apiUrl + "/categorias";

  //inicialiação por injeção de dependência
  constructor(private httpClient: HttpClient) { }

  //método para consultar as categorias
  get() {
    return this.httpClient.get(this.endpoint);
  }
}

